import { faker } from '@faker-js/faker';
import { Candidate, MatchingResult, MatchingInsightsData } from '@/components/talent-matching/types';

// Generate fallback insights data
// export const generateFallbackInsights = (useCrossSource = false): MatchingInsightsData => {
//   return {
//     ... // dummy insight generation removed
//   };
// };

// Generate a fallback matching result
// export const generateFallbackMatchingResult = (
//   jobTitle: string, 
//   extractedSkills: string[],
//   useCrossSource = false
// ): MatchingResult => {
//   return {
//     jobTitle,
//     extractedSkills,
//     candidates: [],
//     suggestedExperience: 0,
//     totalCandidatesScanned: 0,
//     matchTime: 0,
//     matchingModelUsed: '',
//     keyResponsibilities: [],
//     insights: undefined,
//     crossSourceValidation: undefined
//   };
// };
