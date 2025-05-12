import { v4 as uuidv4 } from 'uuid';
import { Agent } from '../types/AgenticTypes';
import { DynamoDBClient, ScanCommand, PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { executeDbOperation } from '../utils/db-utils';
import { getEnvVar } from '@/utils/env-utils';
import { createMockAgents } from '../db/mockAgentsData';

const AGENTS_TABLE = getEnvVar('AGENTS_TABLE', 'agent_definitions');
const API_BASE = 'http://localhost:4000/api/agents';

export const fetchAgents = async (): Promise<Agent[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch agents');
  return res.json();
};

export const getAllAgents = fetchAgents;

export const getAgentById = async (id: string): Promise<Agent | undefined> => {
  const res = await fetch(`${API_BASE}/${id}`);
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error('Failed to fetch agent');
  return res.json();
};

export const createAgent = async (agentData: Omit<Agent, 'id' | 'createdAt'>): Promise<Agent> => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(agentData),
  });
  if (!res.ok) throw new Error('Failed to create agent');
  return res.json();
};

export const updateAgent = async (id: string, updates: Partial<Agent>): Promise<Agent | undefined> => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error('Failed to update agent');
  return res.json();
};

export const deleteAgent = async (id: string): Promise<boolean> => {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete agent');
  return (await res.json()).success;
};
