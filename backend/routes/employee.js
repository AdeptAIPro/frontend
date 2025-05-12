const express = require('express');
const router = express.Router();
const { dynamoDB, s3 } = require('../index');
const { PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
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

// Create employee
router.post('/', async (req, res) => {
  try {
    const { 
      orgId,
      firstName,
      lastName,
      email,
      employeeType,
      department,
      position,
      hireDate,
      salary,
      taxInfo,
      benefits
    } = req.body;

    const employeeId = Date.now().toString();
    
    const params = {
      TableName: 'Employees',
      Item: marshall({
        employeeId,
        orgId,
        firstName,
        lastName,
        email,
        employeeType,
        department,
        position,
        hireDate,
        salary,
        taxInfo,
        benefits,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    };

    await dynamoDB.send(new PutItemCommand(params));
    res.status(201).json({ message: 'Employee created successfully', employeeId });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
});

// Get employee by ID
router.get('/:employeeId', async (req, res) => {
  try {
    const params = {
      TableName: 'Employees',
      Key: marshall({ employeeId: req.params.employeeId })
    };

    const result = await dynamoDB.send(new GetItemCommand(params));
    if (!result.Item) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(unmarshall(result.Item));
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
});

// Update employee
router.put('/:employeeId', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      employeeType,
      department,
      position,
      salary,
      taxInfo,
      benefits,
      status
    } = req.body;
    
    const params = {
      TableName: 'Employees',
      Key: marshall({ employeeId: req.params.employeeId }),
      UpdateExpression: 'SET firstName = :firstName, lastName = :lastName, email = :email, employeeType = :employeeType, department = :department, position = :position, salary = :salary, taxInfo = :taxInfo, benefits = :benefits, status = :status, updatedAt = :updatedAt',
      ExpressionAttributeValues: marshall({
        ':firstName': firstName,
        ':lastName': lastName,
        ':email': email,
        ':employeeType': employeeType,
        ':department': department,
        ':position': position,
        ':salary': salary,
        ':taxInfo': taxInfo,
        ':benefits': benefits,
        ':status': status,
        ':updatedAt': new Date().toISOString()
      })
    };

    await dynamoDB.send(new UpdateItemCommand(params));
    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

// Upload employee form (W-4, I-9, etc.)
router.post('/:employeeId/forms', upload.single('form'), async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { formType } = req.body;
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

    // Update employee record with form reference
    const params = {
      TableName: 'Employees',
      Key: marshall({ employeeId }),
      UpdateExpression: 'SET forms.#formType = :formUrl, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#formType': formType
      },
      ExpressionAttributeValues: marshall({
        ':formUrl': s3Params.Key,
        ':updatedAt': new Date().toISOString()
      })
    };

    await dynamoDB.send(new UpdateItemCommand(params));
    res.json({ message: 'Form uploaded successfully' });
  } catch (error) {
    console.error('Error uploading form:', error);
    res.status(500).json({ error: 'Failed to upload form' });
  }
});

// List employees by organization
router.get('/org/:orgId', async (req, res) => {
  try {
    const params = {
      TableName: 'Employees',
      FilterExpression: 'orgId = :orgId',
      ExpressionAttributeValues: marshall({
        ':orgId': req.params.orgId
      })
    };

    const result = await dynamoDB.send(new ScanCommand(params));
    const employees = result.Items.map(item => unmarshall(item));
    res.json(employees);
  } catch (error) {
    console.error('Error listing employees:', error);
    res.status(500).json({ error: 'Failed to list employees' });
  }
});

module.exports = router; 