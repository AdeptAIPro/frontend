import { TalentSearchParams, TalentSearchResponse, Talent } from './types';
import { searchTalentsFromExternalSource } from './ExternalTalentService';
import { getCacheKey, getFromCache, addToCache } from './cache/TalentSearchCache';

// Standard talent search implementation
export const searchTalents = async (
  params: TalentSearchParams
): Promise<TalentSearchResponse> => {
  try {
    // Check cache first
    const cacheKey = getCacheKey(params);
    const cachedResult = getFromCache(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }
    
    // First, get results from Supabase
    const supabaseResults = await fetch('/api/talents');
    const data = await supabaseResults.json();
    
    // If specific external sources are requested, fetch from there too
    let externalResults: Talent[] = [];
    
    // Handle single source parameter
    if (params.source && params.source !== 'internal') {
      externalResults = await searchTalentsFromExternalSource(params.source, params);
    } 
    // Handle multiple sources parameter
    else if (params.sources && params.sources.length > 0) {
      // Filter out internal database which is handled by Supabase
      const externalSources = params.sources.filter(s => s !== 'internal' && s !== 'Internal Database');
      
      // Process external sources in parallel for better performance
      const sourcePromises = externalSources.map(source => 
        searchTalentsFromExternalSource(source, params)
      );
      
      const sourceResults = await Promise.all(sourcePromises);
      externalResults = sourceResults.flat();
    }
    
    // Combine results
    let response: TalentSearchResponse;
    
    if (externalResults.length > 0) {
      response = {
        ...data,
        candidates: [...data.candidates, ...externalResults],
        total: data.total + externalResults.length,
        totalPages: Math.ceil((data.total + externalResults.length) / (params.limit || 10)),
        timestamp: Date.now()
      };
    } else {
      response = {
        ...data,
        timestamp: Date.now()
      };
    }
    
    // Cache the results
    addToCache(cacheKey, response);
    
    return response;
  } catch (error) {
    console.error('Error in searchTalents:', error);
    return {
      candidates: [],
      total: 0,
      page: params.page || 1,
      totalPages: 0,
      timestamp: Date.now()
    };
  }
};

// Replace all supabaseResults logic with a fetch to the backend API
export const basicTalentSearch = async (params) => {
  // Example fetch to backend
  const response = await fetch('/api/talents');
  const data = await response.json();
  // TODO: Filter/sort data as needed based on params
  return data;
};
