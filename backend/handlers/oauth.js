// backend/handlers/oauth.js
const { getSecret } = require('./secrets');
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const fetch = require('node-fetch');
const dynamo = new DynamoDBClient();

/**
 * Lambda handler for OAuth 2.0 token exchange and storage.
 * Exchanges an authorization code for tokens and stores them in DynamoDB (encrypted).
 * @param {object} event - Lambda event object (API Gateway proxy event)
 * @returns {object} { status: 'success' }
 */
module.exports.exchangeAndStoreToken = async (event) => {
  // Parse code and tenantId from request body
  const { code, tenantId, provider } = JSON.parse(event.body);
  // Retrieve OAuth client credentials from Secrets Manager
  const secretName = process.env[`${provider.toUpperCase()}_OAUTH_SECRET_NAME`];
  const { clientId, clientSecret, tokenUrl, redirectUri } = await getSecret(secretName);

  // Exchange code for tokens
  const tokenRes = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri
    })
  });
  const tokenData = await tokenRes.json();

  // Store tokens in DynamoDB (encrypted at rest)
  await dynamo.send(new PutItemCommand({
    TableName: process.env.OAUTH_TOKENS_TABLE,
    Item: {
      tenantId: { S: tenantId },
      provider: { S: provider },
      accessToken: { S: tokenData.access_token },
      refreshToken: { S: tokenData.refresh_token || '' },
      expiresAt: { N: String(Date.now() + (tokenData.expires_in * 1000)) }
    }
  }));

  return { statusCode: 200, body: JSON.stringify({ status: 'success' }) };
}; 