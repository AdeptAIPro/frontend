const express = require('express');
const router = express.Router();
const { dynamoDB, s3 } = require('../index');
const { PutItemCommand, GetItemCommand, UpdateItemCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const { PDFDocument } = require('pdf-lib');

// Run payroll cycle
router.post('/run', async (req, res) => {
  try {
    const { orgId, startDate, endDate } = req.body;
    const payrollId = Date.now().toString();

    // Get all active employees for the organization
    const employeeParams = {
      TableName: 'Employees',
      FilterExpression: 'orgId = :orgId AND #status = :status',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: marshall({
        ':orgId': orgId,
        ':status': 'active'
      })
    };

    const employeesResult = await dynamoDB.send(new ScanCommand(employeeParams));
    const employees = employeesResult.Items.map(item => unmarshall(item));

    // Calculate payroll for each employee
    const payrollItems = await Promise.all(employees.map(async (employee) => {
      // Calculate gross pay, deductions, and net pay
      const grossPay = calculateGrossPay(employee, startDate, endDate);
      const deductions = calculateDeductions(employee, grossPay);
      const netPay = grossPay - deductions.total;

      // Generate payslip
      const payslipUrl = await generatePayslip(employee, {
        payrollId,
        startDate,
        endDate,
        grossPay,
        deductions,
        netPay
      });

      return {
        employeeId: employee.employeeId,
        grossPay,
        deductions,
        netPay,
        payslipUrl
      };
    }));

    // Create payroll record
    const payrollParams = {
      TableName: 'Payroll',
      Item: marshall({
        payrollId,
        orgId,
        startDate,
        endDate,
        status: 'completed',
        items: payrollItems,
        totalGrossPay: payrollItems.reduce((sum, item) => sum + item.grossPay, 0),
        totalDeductions: payrollItems.reduce((sum, item) => sum + item.deductions.total, 0),
        totalNetPay: payrollItems.reduce((sum, item) => sum + item.netPay, 0),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    };

    await dynamoDB.send(new PutItemCommand(payrollParams));
    res.status(201).json({ message: 'Payroll processed successfully', payrollId });
  } catch (error) {
    console.error('Error processing payroll:', error);
    res.status(500).json({ error: 'Failed to process payroll' });
  }
});

// Get payroll by ID
router.get('/:payrollId', async (req, res) => {
  try {
    const params = {
      TableName: 'Payroll',
      Key: marshall({ payrollId: req.params.payrollId })
    };

    const result = await dynamoDB.send(new GetItemCommand(params));
    if (!result.Item) {
      return res.status(404).json({ error: 'Payroll not found' });
    }

    res.json(unmarshall(result.Item));
  } catch (error) {
    console.error('Error fetching payroll:', error);
    res.status(500).json({ error: 'Failed to fetch payroll' });
  }
});

// List payroll cycles by organization
router.get('/org/:orgId', async (req, res) => {
  try {
    const params = {
      TableName: 'Payroll',
      FilterExpression: 'orgId = :orgId',
      ExpressionAttributeValues: marshall({
        ':orgId': req.params.orgId
      })
    };

    const result = await dynamoDB.send(new ScanCommand(params));
    const payrolls = result.Items.map(item => unmarshall(item));
    res.json(payrolls);
  } catch (error) {
    console.error('Error listing payrolls:', error);
    res.status(500).json({ error: 'Failed to list payrolls' });
  }
});

// Helper functions
function calculateGrossPay(employee, startDate, endDate) {
  // This is a simplified calculation. In a real system, you would:
  // 1. Get timesheet data for the period
  // 2. Calculate regular hours, overtime, etc.
  // 3. Apply any bonuses or adjustments
  return employee.salary / 26; // Assuming bi-weekly pay
}

function calculateDeductions(employee, grossPay) {
  // This is a simplified calculation. In a real system, you would:
  // 1. Calculate federal, state, and local taxes
  // 2. Calculate social security and medicare
  // 3. Apply any benefits deductions
  const federalTax = grossPay * 0.22; // Example rate
  const stateTax = grossPay * 0.05; // Example rate
  const socialSecurity = grossPay * 0.062;
  const medicare = grossPay * 0.0145;
  const benefits = employee.benefits?.total || 0;

  return {
    federalTax,
    stateTax,
    socialSecurity,
    medicare,
    benefits,
    total: federalTax + stateTax + socialSecurity + medicare + benefits
  };
}

async function generatePayslip(employee, payrollData) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  // Add content to the payslip
  const { width, height } = page.getSize();
  const fontSize = 12;
  const lineHeight = 20;
  let y = height - 50;

  // Add company and employee information
  page.drawText(`Payroll Period: ${payrollData.startDate} to ${payrollData.endDate}`, {
    x: 50,
    y,
    size: fontSize
  });
  y -= lineHeight;

  page.drawText(`Employee: ${employee.firstName} ${employee.lastName}`, {
    x: 50,
    y,
    size: fontSize
  });
  y -= lineHeight;

  // Add earnings and deductions
  page.drawText(`Gross Pay: $${payrollData.grossPay.toFixed(2)}`, {
    x: 50,
    y,
    size: fontSize
  });
  y -= lineHeight;

  page.drawText(`Deductions:`, {
    x: 50,
    y,
    size: fontSize
  });
  y -= lineHeight;

  Object.entries(payrollData.deductions).forEach(([key, value]) => {
    if (key !== 'total') {
      page.drawText(`${key}: $${value.toFixed(2)}`, {
        x: 70,
        y,
        size: fontSize
      });
      y -= lineHeight;
    }
  });

  page.drawText(`Net Pay: $${payrollData.netPay.toFixed(2)}`, {
    x: 50,
    y,
    size: fontSize
  });

  // Save the PDF to S3
  const pdfBytes = await pdfDoc.save();
  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `payslips/${employee.employeeId}/${payrollData.payrollId}.pdf`,
    Body: pdfBytes,
    ContentType: 'application/pdf'
  };

  await s3.send(new PutObjectCommand(s3Params));
  return s3Params.Key;
}

module.exports = router; 