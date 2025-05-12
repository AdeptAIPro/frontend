import { MatchingModel, MatchingOptions } from "@/components/talent-matching/types";
import { processJobDescription } from "./services/JobProcessingService";
import { generateCandidateResults } from "./services/CandidateMatchingService";
import { getAvailableMatchingModelsFromDatabase, getDefaultMatchingModels } from "./models/MatchingModelsService";

// Local network API URL
const API_URL = "http://192.168.29.49:5000";

export async function matchCandidatesWithJobDescription(
  jobDescription: string,
  matchingOptions: MatchingOptions
) {
  // Process the job description
  const jobDetails = await processJobDescription(jobDescription);
  
  // Generate matching results
  return generateCandidateResults(jobDetails, matchingOptions);
}

export async function getAvailableMatchingModels(): Promise<MatchingModel[]> {
  try {
    // First try to fetch from database
    const dbModels = await getAvailableMatchingModelsFromDatabase();
    
    if (dbModels && dbModels.length > 0) {
      return dbModels;
    }
    
    // If no models in database, return default models
    return getDefaultMatchingModels();
  } catch (error) {
    console.error("Error fetching matching models:", error);
    return [];
  }
}

// --- Added for RAG and Semantic Matching ---
export async function callRagFunction(jobDescription: string) {
  // Call the local backend for RAG results
  const response = await fetch(`${API_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: jobDescription }),
  });
  if (!response.ok) throw new Error("Failed to fetch RAG result");
  return await response.json();
}

export async function callSemanticFunction(jobDescription: string) {
  // Call the local backend for Semantic Matching results
  const response = await fetch(`${API_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: jobDescription }),
  });
  if (!response.ok) throw new Error("Failed to fetch Semantic result");
  return await response.json();
}
