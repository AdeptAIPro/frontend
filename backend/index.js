require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { S3Client } = require('@aws-sdk/client-s3');
const { CognitoIdentityProviderClient } = require('@aws-sdk/client-cognito-identity-provider');
const { TextractClient } = require('@aws-sdk/client-textract');
const { BedrockClient } = require('@aws-sdk/client-bedrock');

// Initialize AWS clients
const dynamoDB = new DynamoDBClient({ region: process.env.AWS_REGION });
const s3 = new S3Client({ region: process.env.AWS_REGION });
const cognito = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });
const textract = new TextractClient({ region: process.env.AWS_REGION });
const bedrock = new BedrockClient({ region: process.env.AWS_REGION });

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const organizationRoutes = require('./routes/organization');
const employeeRoutes = require('./routes/employee');
const payrollRoutes = require('./routes/payroll');
const taxRoutes = require('./routes/tax');
const formRoutes = require('./routes/forms');
const reportRoutes = require('./routes/reports');
const aiRoutes = require('./routes/ai');

// Mount routes
app.use('/api/orgs', organizationRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/tax', taxRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/ai', aiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Payroll backend server running on port ${port}`);
});

module.exports = {
  dynamoDB,
  s3,
  cognito,
  textract,
  bedrock
}; 