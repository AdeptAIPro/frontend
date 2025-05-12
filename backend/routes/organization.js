const express = require('express');
const router = express.Router();
const { dynamoDB } = require('../index');
const { PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

// Create organization
router.post('/', async (req, res) => {
  try {
    const { name, address, taxId, contactInfo } = req.body;
    const orgId = Date.now().toString(); // Simple ID generation
    
    const params = {
      TableName: 'Organizations',
      Item: marshall({
        orgId,
        name,
        address,
        taxId,
        contactInfo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    };

    await dynamoDB.send(new PutItemCommand(params));
    res.status(201).json({ message: 'Organization created successfully', orgId });
  } catch (error) {
    console.error('Error creating organization:', error);
    res.status(500).json({ error: 'Failed to create organization' });
  }
});

// Get organization by ID
router.get('/:orgId', async (req, res) => {
  try {
    const params = {
      TableName: 'Organizations',
      Key: marshall({ orgId: req.params.orgId })
    };

    const result = await dynamoDB.send(new GetItemCommand(params));
    if (!result.Item) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.json(unmarshall(result.Item));
  } catch (error) {
    console.error('Error fetching organization:', error);
    res.status(500).json({ error: 'Failed to fetch organization' });
  }
});

// Update organization
router.put('/:orgId', async (req, res) => {
  try {
    const { name, address, taxId, contactInfo } = req.body;
    
    const params = {
      TableName: 'Organizations',
      Key: marshall({ orgId: req.params.orgId }),
      UpdateExpression: 'SET #name = :name, address = :address, taxId = :taxId, contactInfo = :contactInfo, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ExpressionAttributeValues: marshall({
        ':name': name,
        ':address': address,
        ':taxId': taxId,
        ':contactInfo': contactInfo,
        ':updatedAt': new Date().toISOString()
      })
    };

    await dynamoDB.send(new UpdateItemCommand(params));
    res.json({ message: 'Organization updated successfully' });
  } catch (error) {
    console.error('Error updating organization:', error);
    res.status(500).json({ error: 'Failed to update organization' });
  }
});

// Delete organization
router.delete('/:orgId', async (req, res) => {
  try {
    const params = {
      TableName: 'Organizations',
      Key: marshall({ orgId: req.params.orgId })
    };

    await dynamoDB.send(new DeleteItemCommand(params));
    res.json({ message: 'Organization deleted successfully' });
  } catch (error) {
    console.error('Error deleting organization:', error);
    res.status(500).json({ error: 'Failed to delete organization' });
  }
});

// List all organizations
router.get('/', async (req, res) => {
  try {
    const params = {
      TableName: 'Organizations'
    };

    const result = await dynamoDB.send(new ScanCommand(params));
    const organizations = result.Items.map(item => unmarshall(item));
    res.json(organizations);
  } catch (error) {
    console.error('Error listing organizations:', error);
    res.status(500).json({ error: 'Failed to list organizations' });
  }
});

module.exports = router; 