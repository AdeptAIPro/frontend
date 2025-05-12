import { useState, useEffect } from "react";
import { getTalentSources } from "@/services/talent/TalentSourcesService";
import { DEFAULT_SOURCES, HEALTHCARE_SOURCES, IT_SOURCES } from "./sourcesData";

interface TalentSource {
  id: string;
  name: string;
  type: string;
  description: string;
}

export const useSourceSelection = (
  initialSelectedSources: string[] = []
) => {
  const [sources, setSources] = useState<TalentSource[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>(initialSelectedSources);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("general");

  // Load sources based on selected tab
  useEffect(() => {
    switch(activeTab) {
      case "healthcare":
        setSources(HEALTHCARE_SOURCES.map(name => ({
          id: name.toLowerCase().replace(/\s+/g, '-'),
          name,
          type: 'healthcare',
          description: `${name} healthcare talent source`
        })));
        setIsLoading(false);
        break;
      case "it":
        setSources(IT_SOURCES.map(name => ({
          id: name.toLowerCase().replace(/\s+/g, '-'),
          name,
          type: 'it',
          description: `${name} IT talent source`
        })));
        setIsLoading(false);
        break;
      default:
        loadGeneralSources();
        break;
    }
  }, [activeTab]);

  // Ensure at least one source is selected by default
  useEffect(() => {
    if (sources.length > 0 && selectedSources.length === 0) {
      setSelectedSources([sources[0].id]);
    }
  }, [sources, selectedSources]);

  const loadGeneralSources = async () => {
    setIsLoading(true);
    try {
      const fetchedSources = await getTalentSources();
      if (fetchedSources && fetchedSources.length > 0) {
        setSources(fetchedSources);
      } else {
        setSources(DEFAULT_SOURCES.map(name => ({
          id: name.toLowerCase().replace(/\s+/g, '-'),
          name,
          type: 'general',
          description: `${name} talent source`
        })));
      }
    } catch (error) {
      console.error("Error loading talent sources:", error);
      setSources(DEFAULT_SOURCES.map(name => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        type: 'general',
        description: `${name} talent source`
      })));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSourceChange = (sourceId: string, checked: boolean) => {
    if (checked) {
      setSelectedSources([...selectedSources, sourceId]);
    } else {
      // Don't allow deselecting the last source
      if (selectedSources.length > 1) {
        setSelectedSources(selectedSources.filter(s => s !== sourceId));
      }
    }
  };

  return {
    sources,
    selectedSources,
    isLoading,
    activeTab,
    setActiveTab,
    handleSourceChange
  };
};
