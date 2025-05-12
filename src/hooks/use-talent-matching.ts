import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import useMatchingProcess from "@/hooks/use-matching-process";
import { MatchingOptions } from "@/components/talent-matching/types";
import { callRagFunction, callSemanticFunction } from "@/services/talent-matching/MatchingService";

// Cache for search results with TTL
interface CacheEntry {
  data: any;
  timestamp: number;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
const searchCache = new Map<string, CacheEntry>();
const RESULTS_PER_PAGE = 10;

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string;
  grade: string;
  score: number;
}

interface SearchResponse {
  results: Candidate[];
  summary: string;
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

const API_BASE_URL = 'http://127.0.0.1:5055';

// Test backend connection
const testBackendConnection = async () => {
  try {
    console.log('Testing backend connection to:', `${API_BASE_URL}/test`);
    const response = await fetch(`${API_BASE_URL}/test`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Backend connection test response:', data);
    return data.status === 'ok';
  } catch (error) {
    console.error('Backend connection test failed:', error);
    return false;
  }
};

const fetchResults = async (query: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching results:', error);
    throw error;
  }
};

export const useTalentMatching = () => {
  console.log("Initializing useTalentMatching hook");
  const { user } = useAuth();
  const [jobDescription, setJobDescription] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState("");
  const [minMatchScore, setMinMatchScore] = useState(75);
  const [useComplianceVerification, setUseComplianceVerification] = useState(false);
  const [prioritizeCulturalFit, setPrioritizeCulturalFit] = useState(false);
  const [useSemanticMatching, setUseSemanticMatching] = useState(false);
  const [useRAG, setUseRAG] = useState(false);
  const [useSkillBasedFiltering, setUseSkillBasedFiltering] = useState(true);
  const [useCrossSourceIntelligence, setUseCrossSourceIntelligence] = useState(false);
  const [tab, setTab] = useState<string>("paste");
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTargetSources, setSelectedTargetSources] = useState<string[]>([]);
  const [showPremiumFeaturePrompt, setShowPremiumFeaturePrompt] = useState(false);
  const [userPlan, setUserPlan] = useState<"free" | "basic" | "pro" | "enterprise">("free");
  const [ragResult, setRagResult] = useState<any>(null);
  const [semanticResult, setSemanticResult] = useState<any>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(true);

  const [matchingOptions, setMatchingOptions] = useState<MatchingOptions>({
    useSemanticMatching: true,
    useRAG: true,
    useSkillBasedFiltering: true,
    weightSkills: 0.4,
    weightExperience: 0.3,
    minMatchScore: 50,
    topN: 10
  });

  // Check user plan on load
  useEffect(() => {
    if (user) {
      // In a real implementation, this would check the user's subscription status
      // For now, we'll default to "free" for demonstration
      setUserPlan("free");
    }
  }, [user]);

  // Add default target source if none selected
  useEffect(() => {
    if (selectedTargetSources.length === 0) {
      setSelectedTargetSources(["Internal Database"]);
    }
  }, [selectedTargetSources]);

  // Reset pagination when job description changes
  useEffect(() => {
    setCurrentPage(1);
    setHasMoreResults(true);
  }, [jobDescription]);

  // Determine if the Start AI Matchmaking button should be enabled
  const isReadyToStart = jobDescription.length > 50 && selectedTargetSources.length > 0;

  // Determine which features should be marked as premium based on user plan
  const premiumFeatures = {
    crossSourceIntelligence: userPlan === "free" || userPlan === "basic",
    advancedFiltering: userPlan === "free",
    semanticMatching: userPlan === "free" || userPlan === "basic",
    complianceVerification: userPlan === "free" || userPlan === "basic",
    culturalFitAnalysis: userPlan === "free" || userPlan === "basic",
    bulkUpload: userPlan === "free" || userPlan === "basic",
    unlimitedSources: userPlan === "free" || userPlan === "basic",
    advancedInsights: userPlan === "free" || userPlan === "basic"
  };

  // Memoize matching options
  const matchingOptionsMemo = useMemo(() => ({
    matchingModel: selectedModelId,
    weightSkills: 0.5,
    weightExperience: 0.3,
    weightEducation: 0.2,
    threshold: 60,
    includePartialMatches: true,
    minMatchScore,
    useComplianceVerification,
    prioritizeCulturalFit,
    useSemanticMatching,
    useRAG,
    useSkillBasedFiltering,
    targetSources: selectedTargetSources,
    model: "basic",
    page: currentPage,
    pageSize: RESULTS_PER_PAGE
  }), [
    selectedModelId,
    minMatchScore,
    useComplianceVerification,
    prioritizeCulturalFit,
    useSemanticMatching,
    useRAG,
    useSkillBasedFiltering,
    selectedTargetSources,
    currentPage
  ]);

  // Memoized search function with caching and pagination
  const [searchResult, setSearchResult] = useState(null);

  const performSearch = useCallback(async (jobDescription: string, page: number = 1) => {
    const cacheKey = `${jobDescription}-${page}`;
    const now = Date.now();

    // Check cache
    if (searchCache.has(cacheKey)) {
      const entry = searchCache.get(cacheKey)!;
      if (now - entry.timestamp < CACHE_TTL) {
        console.log('Returning cached results');
        return entry.data;
      }
      searchCache.delete(cacheKey);
    }

    try {
      console.log('Sending search request to:', `${API_BASE_URL}/search`);
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          query: jobDescription,
          page,
          pageSize: RESULTS_PER_PAGE
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Search failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Search response:', data);

      // Map results to candidates for MatchingResultsContainer compatibility
      setSearchResult({
        ...data,
        candidates: data.results
      });

      // Update cache
      searchCache.set(cacheKey, {
        data,
        timestamp: now
      });

      return data;
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    }
  }, []);

  const {
    isLoading,
    matchingProgress,
    matchResult,
    startMatching,
    saveCandidate,
    contactCandidate
  } = useMatchingProcess(
    user,
    jobDescription,
    matchingOptions,
    toast,
    useCrossSourceIntelligence
  );

  console.log("Current matching state:", { 
    isLoading, 
    matchingProgress, 
    showResults, 
    matchResult,
    isReadyToStart,
    selectedTargetSources
  });

  // Combined effect for RAG and Semantic results with pagination
  useEffect(() => {
    const fetchResults = async () => {
      if (!jobDescription) return;
      
      try {
        const data = await performSearch(jobDescription, currentPage);
        
        if (useRAG) {
          setRagResult(data);
        }
        if (useSemanticMatching) {
          setSemanticResult(data);
        }
        
        // Update pagination state
        setTotalResults(data.total || 0);
        setHasMoreResults(data.results?.length === RESULTS_PER_PAGE);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch results");
      }
    };

    fetchResults();
  }, [jobDescription, useRAG, useSemanticMatching, performSearch, currentPage]);

  // Load more results
  const loadMoreResults = useCallback(async () => {
    if (isLoadingMore || !hasMoreResults) return;
    
    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const data = await performSearch(jobDescription, nextPage);
      
      // Append new results to existing ones
      if (useRAG) {
        setRagResult(prev => ({
          ...prev,
          results: [...(prev?.results || []), ...(data.results || [])]
        }));
      }
      if (useSemanticMatching) {
        setSemanticResult(prev => ({
          ...prev,
          results: [...(prev?.results || []), ...(data.results || [])]
        }));
      }
      
      setCurrentPage(nextPage);
      setHasMoreResults(data.results?.length === RESULTS_PER_PAGE);
    } catch (err) {
      console.error("Error loading more results:", err);
      toast.error("Failed to load more results");
    } finally {
      setIsLoadingMore(false);
    }
  }, [currentPage, hasMoreResults, isLoadingMore, jobDescription, performSearch, useRAG, useSemanticMatching]);

  const handleStartMatching = () => {
    console.log("Starting matching process...");
    
    // Check if trying to use a premium feature
    if ((useCrossSourceIntelligence && premiumFeatures.crossSourceIntelligence) || 
        (useSemanticMatching && premiumFeatures.semanticMatching) ||
        (selectedTargetSources.length > 3 && premiumFeatures.unlimitedSources)) {
      setShowPremiumFeaturePrompt(true);
      return;
    }
    
    if (!jobDescription) {
      toast("Missing Job Description", {
        description: "Please enter a job description to start matching"
      });
      return;
    }
    
    if (selectedTargetSources.length === 0) {
      toast("No Target Sources Selected", {
        description: "Please select at least one candidate source"
      });
      return;
    }
    
    setError(null);
    setCurrentPage(1);
    startMatching(jobDescription);
    setShowResults(true);
  };

  const handleStartNewMatch = () => {
    setJobDescription("");
    setShowResults(false);
    setRagResult(null);
    setSemanticResult(null);
    setCurrentPage(1);
    setHasMoreResults(true);
    setError(null);
  };

  const dismissPremiumFeaturePrompt = () => {
    setShowPremiumFeaturePrompt(false);
  };

  // Test backend connection on component mount
  useEffect(() => {
    testBackendConnection();
  }, []);

  const handleMatchingOptionsChange = useCallback((newOptions: MatchingOptions) => {
    setMatchingOptions(newOptions);
  }, []);

  return {
    // State
    jobDescription,
    setJobDescription,
    showResults,
    showAdvancedOptions,
    setShowAdvancedOptions,
    tab,
    setTab,
    fileUploaded,
    setFileUploaded,
    error,
    setError,
    isLoading,
    isLoadingMore,
    matchingProgress,
    matchResult,
    selectedTargetSources,
    setSelectedTargetSources,
    matchingOptions,
    useCrossSourceIntelligence,
    setUseCrossSourceIntelligence,
    isReadyToStart,
    showPremiumFeaturePrompt,
    setShowPremiumFeaturePrompt,
    dismissPremiumFeaturePrompt,
    premiumFeatures,
    userPlan,
    ragResult,
    semanticResult,
    currentPage,
    totalResults,
    hasMoreResults,
    
    // Actions
    handleStartMatching,
    handleStartNewMatch,
    loadMoreResults,
    saveCandidate,
    contactCandidate,
    handleMatchingOptionsChange,
  };
};
