import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Command } from "@aws-sdk/smithy-client";
import { getEnvVar } from "@/utils/env-utils";

// Initialize the DynamoDB client
let dynamoClient: DynamoDBClient | null = null;

/**
 * Get the DynamoDB client instance, creating it if necessary
 */
export const getDynamoDBClient = (): DynamoDBClient => {
  if (!dynamoClient) {
    // Get region from environment or use a default
    const region = getEnvVar('AWS_REGION', 'us-east-1');
    const accessKeyId = getEnvVar('AWS_ACCESS_KEY_ID', '');
    const secretAccessKey = getEnvVar('AWS_SECRET_ACCESS_KEY', '');
    
    dynamoClient = new DynamoDBClient({ 
      region,
      // Add credentials if available
      credentials: accessKeyId && secretAccessKey
        ? {
            accessKeyId,
            secretAccessKey,
          }
        : undefined
    });
  }
  return dynamoClient;
};

/**
 * Execute a DynamoDB operation with error handling
 */
export const executeDbOperation = async (command: Command<any, any, any, any, any>): Promise<any> => {
  try {
    const client = getDynamoDBClient();
    return await client.send(command);
  } catch (error) {
    console.error(`DynamoDB operation failed: ${error}`);
    throw error;
  }
};

/**
 * Mock implementation for development environments
 * This will return mock data when no actual DynamoDB is available
 */
export const executeMockDbOperation = async <T>(mockData: T): Promise<T> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockData;
};
