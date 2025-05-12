import { lambdaApi } from '@/services/backend-api/LambdaApiClient';
import { TALENT_MATCH_LAMBDA } from '@/services/aws/config';
import { TalentSearchParams, TalentSearchResponse, Talent } from './types';
import { reportApiError } from '@/services/error-reporting';
import { isAwsConfigured } from '@/utils/aws-migration-utils';

/**
 * Search for talents using AWS Lambda backend
 * This replaces the direct Supabase database queries with secure API calls
 */
export const searchTalents = async (
  params: TalentSearchParams
): Promise<TalentSearchResponse> => {
  try {
    // Check if AWS is configured, otherwise fall back to Supabase
    if (!isAwsConfigured()) {
      console.warn('AWS not configured, falling back to Supabase for talent search');
      return awsCandidateSearch(params);
    }
    
    // Call Lambda function through API Gateway
    const result = await lambdaApi.invoke<
      TalentSearchParams,
      TalentSearchResponse
    >(
      TALENT_MATCH_LAMBDA,
      'searchCandidates',
      params
    );
    
    return result;
  } catch (error) {
    reportApiError('searchTalents', error, { params });
    
    // Return empty results as fallback
    return {
      candidates: [],
      total: 0,
      page: params.page || 1,
      totalPages: 0
    };
  }
};

/**
 * Get detailed information about a candidate
 */
export const getCandidateById = async (id: string): Promise<Talent | null> => {
  try {
    // Check if AWS is configured, otherwise fall back to Supabase
    if (!isAwsConfigured()) {
      console.warn('AWS not configured, falling back to Supabase for candidate details');
      
      const { data, error } = await fetch('/api/talents')
        .then(response => response.json())
        .then(data => ({ data, error: null }))
        .catch(error => ({ data: null, error }));
      
      if (error || !data) return null;
      
      // Map to our Talent interface
      return {
        id: data.id,
        name: data.name,
        title: data.title || 'Unknown Position',
        location: data.location || 'Remote',
        skills: data.skills || [],
        experience: data.experience || 0,
        education: data.education || 'Not specified',
        source: data.source || 'Internal Database',
        avatar: data.avatar_url,
        email: data.email,
        phone: data.phone,
      };
    }
    
    // Call Lambda function through API Gateway
    const result = await lambdaApi.invoke<
      { id: string },
      { candidate: Talent | null }
    >(
      TALENT_MATCH_LAMBDA,
      'getCandidateById',
      { id }
    );
    
    return result.candidate;
  } catch (error) {
    reportApiError('getCandidateById', error, { id });
    return null;
  }
};

// Replace fallback logic with a fetch to the backend API
export const awsCandidateSearch = async (params) => {
  // Example fetch to backend
  const response = await fetch('/api/talents');
  const data = await response.json();
  // TODO: Filter/sort data as needed based on params
  return data;
};
