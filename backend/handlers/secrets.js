// backend/handlers/secrets.js
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const secretsClient = new SecretsManagerClient();

/**
 * Retrieves a secret from AWS Secrets Manager by name.
 * @param {string} secretName - The name of the secret in Secrets Manager.
 * @returns {Promise<object>} - The parsed secret value.
 */
async function getSecret(secretName) {
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await secretsClient.send(command);
  return JSON.parse(response.SecretString);
}

module.exports = { getSecret }; 