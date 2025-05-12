import { DEFAULT_SOURCES } from "@/components/talent-matching/candidate-sources/sourcesData";

interface TalentSource {
  id: string;
  name: string;
  type: string;
  description: string;
}

export const getTalentSources = async (): Promise<TalentSource[]> => {
  // Always return local sources as TalentSource objects
  return DEFAULT_SOURCES.map(name => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    type: 'general',
    description: `${name} talent source`
  }));
};

// Default sources to use if API is not available or returns no data
const getDefaultSources = (): TalentSource[] => {
  return [
    {
      id: 'internal',
      name: 'Internal Database',
      type: 'database',
      description: 'Company\'s internal talent database'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      type: 'social',
      description: 'Professional networking platform'
    },
    {
      id: 'github',
      name: 'GitHub',
      type: 'technical',
      description: 'Developer platform and community'
    },
    {
      id: 'indeed',
      name: 'Indeed',
      type: 'job_board',
      description: 'Job search and recruitment platform'
    },
    {
      id: 'glassdoor',
      name: 'Glassdoor',
      type: 'job_board',
      description: 'Job search and company review platform'
    }
  ];
};
