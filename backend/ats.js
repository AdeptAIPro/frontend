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
const ATS_LAMBDA = process.env.ATS_SUBMIT_LAMBDA;

router.post('/submit-candidate', async (req, res) => {
  try {
    const command = new InvokeCommand({
      FunctionName: ATS_LAMBDA,
      Payload: Buffer.from(JSON.stringify(req.body)),
    });
    const response = await lambda.send(command);
    const payload = response.Payload ? JSON.parse(Buffer.from(response.Payload).toString()) : {};
    res.json(payload);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 