import { v4 as uuidv4 } from 'uuid';
import { AgentTask } from '../types/AgenticTypes';
import { DynamoDBClient, ScanCommand, PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { executeDbOperation } from '../utils/db-utils';
import { getEnvVar } from '@/utils/env-utils';
import { processTask } from './task-processor';

const TASKS_TABLE = getEnvVar('TASKS_TABLE', 'agent_tasks');

export const fetchTasks = async (): Promise<AgentTask[]> => {
  try {
    return await getAllTasks();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const getAllTasks = async (): Promise<AgentTask[]> => {
  const params = {
    TableName: TASKS_TABLE,
  };

  const command = new ScanCommand(params);
  const response = await executeDbOperation(command);

  return response.Items ? response.Items.map(item => unmarshall(item) as AgentTask) : [];
};

export const getTaskById = async (id: string): Promise<AgentTask | undefined> => {
  const params = {
    TableName: TASKS_TABLE,
    Key: marshall({ id: id }),
  };

  const command = new GetItemCommand(params);
  const response = await executeDbOperation(command);

  return response.Item ? unmarshall(response.Item) as AgentTask : undefined;
};

export const createTask = async (taskData: Omit<AgentTask, 'id' | 'createdAt'>): Promise<AgentTask> => {
  const taskId = uuidv4();
  const createdAt = new Date().toISOString();
  
  // Ensure the task has required fields like title and description
  const description = taskData.description || taskData.goal || 'No description provided';
  const title = taskData.title || `${taskData.taskType.charAt(0).toUpperCase() + taskData.taskType.slice(1).replace(/-/g, " ")} Task`;
  
  const newTask: AgentTask = {
    id: taskId,
    createdAt,
    updatedAt: createdAt,
    title,
    description,
    ...taskData,
    taskType: taskData.taskType || 'default',
    goal: taskData.goal || description
  };

  const params = {
    TableName: TASKS_TABLE,
    Item: marshall(newTask),
  };

  const command = new PutItemCommand(params);
  await executeDbOperation(command);

  return newTask;
};

export const updateTask = async (id: string, updates: Partial<AgentTask>): Promise<AgentTask | undefined> => {
  const existingTask = await getTaskById(id);
  if (!existingTask) {
    return undefined;
  }

  let updateExpression = 'SET ';
  const expressionAttributeValues: Record<string, any> = {};
  let expressionAttributeNames: Record<string, string> = {};
  let attributeCount = 0;

  for (const key in updates) {
    if (key !== 'id' && key !== 'createdAt') {
      const attributeName = `#attr${attributeCount}`;
      const attributeValue = `:val${attributeCount}`;
      updateExpression += `${attributeName} = ${attributeValue}, `;
      expressionAttributeValues[attributeValue] = updates[key as keyof AgentTask];
      expressionAttributeNames[attributeName] = key;
      attributeCount++;
    }
  }

  updateExpression = updateExpression.slice(0, -2);

  // Cast to appropriate ReturnValue type
  const returnValues: "ALL_NEW" = "ALL_NEW";
  const params = {
    TableName: TASKS_TABLE,
    Key: marshall({ id: id }),
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: marshall(expressionAttributeValues),
    ExpressionAttributeNames: expressionAttributeNames,
    ReturnValues: returnValues
  };

  const command = new UpdateItemCommand(params);
  const response = await executeDbOperation(command);

  return response.Attributes ? unmarshall(response.Attributes) as AgentTask : undefined;
};

export const deleteTask = async (id: string): Promise<boolean> => {
  const params = {
    TableName: TASKS_TABLE,
    Key: marshall({ id: id }),
  };

  const command = new DeleteItemCommand(params);
  await executeDbOperation(command);

  return true;
};
