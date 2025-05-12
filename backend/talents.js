const express = require('express');
const { DynamoDBClient, ScanCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const router = express.Router();

const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});
const TABLE_NAME = process.env.TALENTS_TABLE;

router.get('/', async (req, res) => {
  try {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const result = await dynamo.send(command);
    const talents = result.Items ? result.Items.map(unmarshall) : [];
    res.json(talents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const command = new GetItemCommand({
      TableName: TABLE_NAME,
      Key: { id: { S: req.params.id } }
    });
    const result = await dynamo.send(command);
    if (!result.Item) return res.status(404).json({ error: 'Talent not found' });
    res.json(unmarshall(result.Item));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 