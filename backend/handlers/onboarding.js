const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const dynamo = new DynamoDBClient();
const s3 = new S3Client();

/**
 * Lambda handler for onboarding a new tenant (organization).
 * Creates a new tenant record in DynamoDB, creates an S3 prefix, and returns the tenantId.
 * @param {object} event - Lambda event object (API Gateway proxy event)
 * @returns {object} { tenantId }
 */
module.exports.onboardTenant = async (event) => {
  // Parse organization name and admin email from request body
  const { orgName, adminEmail } = JSON.parse(event.body);
  // Generate a unique tenantId
  const tenantId = `tenant-${Date.now()}`;
  // Create tenant record in DynamoDB
  await dynamo.send(new PutItemCommand({
    TableName: process.env.TENANTS_TABLE, // <-- Uses env variable
    Item: {
      tenantId: { S: tenantId },
      orgName: { S: orgName },
      createdAt: { S: new Date().toISOString() },
      adminEmail: { S: adminEmail }
    }
  }));
  // Create S3 prefix for the tenant (creates an empty object as a folder marker)
  await s3.send(new PutObjectCommand({
    Bucket: process.env.RESUME_BUCKET, // <-- Uses env variable
    Key: `${tenantId}/`, // S3 prefix for the tenant
    Body: ''
  }));
  // Optionally, send welcome email, provision default roles, etc.
  return { statusCode: 201, body: JSON.stringify({ tenantId }) };
}; 