const express = require('express');
const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');
const router = express.Router();

const lambda = new LambdaClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});
const RESUME_LAMBDA = process.env.RESUME_PARSER_LAMBDA;

router.post('/parse', async (req, res) => {
  const { text } = req.body;
  try {
    const command = new InvokeCommand({
      FunctionName: RESUME_LAMBDA,
      Payload: Buffer.from(JSON.stringify({ text })),
    });
    const response = await lambda.send(command);
    const payload = response.Payload ? JSON.parse(Buffer.from(response.Payload).toString()) : {};
    res.json(payload);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 