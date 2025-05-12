import { TalentSearchParams, Talent } from './types';

// Function to fetch talent data from external job boards via API
export const searchTalentsFromExternalSource = async (
  source: string,
  params: TalentSearchParams
): Promise<Talent[]> => {
  // Remove all mock candidate generation
  return [];
};
