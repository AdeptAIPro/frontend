// backend/handlers/secure-external-api.js
const { getSecret } = require('./secrets');
const { logAuditEvent } = require('./audit');
const fetch = require('node-fetch');
const { DynamoDBClient, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const dynamo = new DynamoDBClient();

/**
 * Lambda handler for secure external API calls with audit logging and request throttling.
 * @param {object} event - Lambda event object (API Gateway proxy event)
 * @returns {object} { data }
 */
module.exports.callExternalApi = async (event) => {
  const { tenantId, userId, apiName, apiUrl, method, body } = JSON.parse(event.body);
  // Throttle: increment request count in DynamoDB (per tenant, per day)
  const today = new Date().toISOString().slice(0, 10);
  const throttleKey = `${tenantId}#${apiName}#${today}`;
  const throttleTable = process.env.THROTTLE_TABLE;
  // Increment request count atomically
  const throttleRes = await dynamo.send(new UpdateItemCommand({
    TableName: throttleTable,
    Key: { throttleKey: { S: throttleKey } },
    UpdateExpression: 'ADD requestCount :inc',
    ExpressionAttributeValues: { ':inc': { N: '1' } },
    ReturnValues: 'UPDATED_NEW'
  }));
  const requestCount = parseInt(throttleRes.Attributes.requestCount.N, 10);
  const maxRequests = parseInt(process.env.MAX_REQUESTS_PER_DAY || '1000', 10);
  if (requestCount > maxRequests) {
    logAuditEvent({ event: 'throttleExceeded', tenantId, userId, apiName });
    return { statusCode: 429, body: JSON.stringify({ error: 'Rate limit exceeded' }) };
  }

  // Retrieve API key/secret from Secrets Manager
  const { apiKey } = await getSecret(process.env[`${apiName.toUpperCase()}_API_SECRET_NAME`]);

  // Make the external API call (HTTPS enforced by fetch)
  const apiRes = await fetch(apiUrl, {
    method: method || 'GET',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await apiRes.json();

  // Audit log
  logAuditEvent({ event: 'externalApiCall', tenantId, userId, apiName, status: 'success' });

  return { statusCode: 200, body: JSON.stringify({ data }) };
}; 