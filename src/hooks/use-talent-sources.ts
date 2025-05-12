import { useState, useEffect } from "react";

const MOCK_TALENT_SOURCES = [
  {
    id: 1,
    name: "LinkedIn",
    status: "active",
    lastSync: "2024-03-15T10:30:00Z",
    stats: {
      totalProfiles: 1500,
      newProfiles: 45,
      matches: 120
    }
  },
  {
    id: 2,
    name: "GitHub",
    status: "active",
    lastSync: "2024-03-15T09:15:00Z",
    stats: {
      totalProfiles: 800,
      newProfiles: 30,
      matches: 75
    }
  },
  {
    id: 3,
    name: "Stack Overflow",
    status: "inactive",
    lastSync: "2024-03-14T16:45:00Z",
    stats: {
      totalProfiles: 600,
      newProfiles: 20,
      matches: 50
    }
  }
];

const useTalentSources = () => {
  const [sources, setSources] = useState(MOCK_TALENT_SOURCES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const refreshSources = () => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setSources(MOCK_TALENT_SOURCES);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  };

  return { sources, isLoading, error, refreshSources };
};

export default useTalentSources; 