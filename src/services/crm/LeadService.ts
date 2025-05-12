import { Lead, LeadFilter } from './types';
import { sendToHubSpot } from './HubspotApiService';
import { calculateLeadScore } from './LeadScoringService';

/**
 * Service for managing leads
 */

// Save lead to local database
export const saveLead = async (lead: Lead): Promise<boolean> => {
  // Just log and return true for dummy
  console.log('Dummy saveLead called:', lead);
  return true;
};

// Get all leads
export const fetchLeads = async (filter?: LeadFilter): Promise<Lead[]> => {
  // TODO: Implement real fetch from backend CRM API
  const leads: Lead[] = [];
  return filterLeads(leads, filter);
};

// Filter leads based on criteria that can't be directly queried
const filterLeads = (leads: Lead[], filter?: LeadFilter): Lead[] => {
  if (!filter) return leads;
  
  return leads.filter(lead => {
    // Filter by minimum score if specified
    if (filter.minScore !== undefined && 
        (lead.score === undefined || lead.score < filter.minScore)) {
      return false;
    }
    
    return true;
  });
};

// Update lead status
export const updateLeadStatus = async (id: string, status: string): Promise<boolean> => {
  // Dummy implementation: just log and return true
  console.log(`Dummy updateLeadStatus called for id=${id}, status=${status}`);
  return true;
};
