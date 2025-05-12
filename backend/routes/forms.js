const express = require('express');
const router = express.Router();
const { dynamoDB, s3, textract, bedrock } = require('../index');
const { PutItemCommand, GetItemCommand, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Upload and process form
router.post('/upload', upload.single('form'), async (req, res) => {
  try {
    const { employeeId, formType } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to S3
    const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `forms/${employeeId}/${formType}-${Date.now()}.pdf`,
      Body: file.buffer,
      ContentType: 'application/pdf'
    };

    await s3.send(new PutObjectCommand(s3Params));

    // Process form with Textract
    const textractParams = {
      DocumentLocation: {
        S3Object: {
          Bucket: s3Params.Bucket,
          Name: s3Params.Key
        }
      }
    };

    const textractResult = await textract.send(new AnalyzeDocumentCommand(textractParams));

    // Use Bedrock to extract structured data
    const bedrockPrompt = `Extract the following information from this ${formType} form:
    ${JSON.stringify(textractResult)}
    
    Return the data in JSON format with the following structure:
    {
      "formType": "${formType}",
      "employeeId": "${employeeId}",
      "extractedFields": {
        // Form-specific fields
      }
    }`;

    const bedrockResult = await bedrock.send(new InvokeModelCommand({
      modelId: 'anthropic.claude-v2',
      body: JSON.stringify({
        prompt: bedrockPrompt,
        max_tokens_to_sample: 1000
      })
    }));

    const extractedData = JSON.parse(bedrockResult.body);

    // Store extracted data
    const formParams = {
      TableName: 'Forms',
      Item: marshall({
        formId: Date.now().toString(),
        employeeId,
        formType,
        s3Key: s3Params.Key,
        extractedData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    };

    await dynamoDB.send(new PutItemCommand(formParams));

    res.json({
      message: 'Form processed successfully',
      formId: formParams.Item.formId,
      extractedData
    });
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({ error: 'Failed to process form' });
  }
});

// Get form by ID
router.get('/:formId', async (req, res) => {
  try {
    const params = {
      TableName: 'Forms',
      Key: marshall({ formId: req.params.formId })
    };

    const result = await dynamoDB.send(new GetItemCommand(params));
    if (!result.Item) {
      return res.status(404).json({ error: 'Form not found' });
    }

    const form = unmarshall(result.Item);

    // Get form content from S3
    const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: form.s3Key
    };

    const s3Result = await s3.send(new GetObjectCommand(s3Params));
    const formContent = await s3Result.Body.transformToString('base64');

    res.json({
      ...form,
      content: formContent
    });
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ error: 'Failed to fetch form' });
  }
});

// List forms for an employee
router.get('/employee/:employeeId', async (req, res) => {
  try {
    const { formType } = req.query;
    
    const params = {
      TableName: 'Forms',
      FilterExpression: 'employeeId = :employeeId' + (formType ? ' AND formType = :formType' : ''),
      ExpressionAttributeValues: marshall({
        ':employeeId': req.params.employeeId,
        ...(formType && { ':formType': formType })
      })
    };

    const result = await dynamoDB.send(new ScanCommand(params));
    const forms = result.Items.map(item => unmarshall(item));
    res.json(forms);
  } catch (error) {
    console.error('Error listing forms:', error);
    res.status(500).json({ error: 'Failed to list forms' });
  }
});

// Generate form template
router.get('/template/:formType', async (req, res) => {
  try {
    const { formType } = req.params;
    
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Add form content based on type
    const { width, height } = page.getSize();
    const fontSize = 12;
    const lineHeight = 20;
    let y = height - 50;

    // Add form header
    page.drawText(`${formType.toUpperCase()} Form`, {
      x: 50,
      y,
      size: fontSize + 4
    });
    y -= lineHeight * 2;

    // Add form fields based on type
    switch (formType.toLowerCase()) {
      case 'w4':
        addW4Fields(page, y, fontSize, lineHeight);
        break;
      case 'i9':
        addI9Fields(page, y, fontSize, lineHeight);
        break;
      case 'w2':
        addW2Fields(page, y, fontSize, lineHeight);
        break;
      case '1099':
        add1099Fields(page, y, fontSize, lineHeight);
        break;
      default:
        throw new Error('Unsupported form type');
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${formType}-template.pdf`);
    
    // Send the PDF
    res.send(pdfBytes);
  } catch (error) {
    console.error('Error generating form template:', error);
    res.status(500).json({ error: 'Failed to generate form template' });
  }
});

// Helper functions for form templates
function addW4Fields(page, y, fontSize, lineHeight) {
  const fields = [
    'Employee Information:',
    'Name: ________________________',
    'Address: ________________________',
    'Social Security Number: ________________________',
    '',
    'Filing Status:',
    '☐ Single',
    '☐ Married filing jointly',
    '☐ Married filing separately',
    '☐ Head of household',
    '',
    'Allowances:',
    'Total number of allowances: ________________________'
  ];

  fields.forEach(field => {
    page.drawText(field, {
      x: 50,
      y,
      size: fontSize
    });
    y -= lineHeight;
  });
}

function addI9Fields(page, y, fontSize, lineHeight) {
  const fields = [
    'Employee Information:',
    'Last Name: ________________________',
    'First Name: ________________________',
    'Middle Initial: ________________________',
    'Address: ________________________',
    'Date of Birth: ________________________',
    'Social Security Number: ________________________',
    '',
    'Citizenship/Immigration Status:',
    '☐ U.S. Citizen',
    '☐ Noncitizen National',
    '☐ Lawful Permanent Resident',
    '☐ Alien Authorized to Work'
  ];

  fields.forEach(field => {
    page.drawText(field, {
      x: 50,
      y,
      size: fontSize
    });
    y -= lineHeight;
  });
}

function addW2Fields(page, y, fontSize, lineHeight) {
  const fields = [
    'Employer Information:',
    'Name: ________________________',
    'Address: ________________________',
    'EIN: ________________________',
    '',
    'Employee Information:',
    'Name: ________________________',
    'Address: ________________________',
    'Social Security Number: ________________________',
    '',
    'Wages, Tips, Other Compensation: ________________________',
    'Federal Income Tax Withheld: ________________________',
    'Social Security Wages: ________________________',
    'Social Security Tax Withheld: ________________________',
    'Medicare Wages and Tips: ________________________',
    'Medicare Tax Withheld: ________________________'
  ];

  fields.forEach(field => {
    page.drawText(field, {
      x: 50,
      y,
      size: fontSize
    });
    y -= lineHeight;
  });
}

function add1099Fields(page, y, fontSize, lineHeight) {
  const fields = [
    'Payer Information:',
    'Name: ________________________',
    'Address: ________________________',
    'EIN: ________________________',
    '',
    'Recipient Information:',
    'Name: ________________________',
    'Address: ________________________',
    'Social Security Number: ________________________',
    '',
    'Nonemployee Compensation: ________________________',
    'Federal Income Tax Withheld: ________________________'
  ];

  fields.forEach(field => {
    page.drawText(field, {
      x: 50,
      y,
      size: fontSize
    });
    y -= lineHeight;
  });
}

module.exports = router; 