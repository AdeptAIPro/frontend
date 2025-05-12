import React, { useState } from "react";
import { TalentMatchingHero } from "@/components/talent-matching";
import MatchingSidebar from "../sidebar/MatchingSidebar";
import MatchingInputForm from "../input/MatchingInputForm";
import MatchingResultsContainer from "../results/MatchingResultsContainer";

const MatchingTab = ({
  jobDescription,
  setJobDescription,
  tab,
  setTab,
  fileUploaded,
  setFileUploaded,
  selectedTargetSources,
  setSelectedTargetSources,
  showAdvancedOptions,
  setShowAdvancedOptions,
  matchingOptions,
  setMatchingOptions,
  isReadyToStart,
  matchingProgress,
  saveCandidate,
  contactCandidate,
  showPremiumFeaturePrompt,
  dismissPremiumFeaturePrompt,
  premiumFeatures,
  useCrossSourceIntelligence,
  setUseCrossSourceIntelligence,
  ragResult,
  semanticResult,
  useRAG,
  useSemanticMatching
}) => {
  const [showResults, setShowResults] = useState(false);
  const [matchResult, setMatchResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartMatching = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5055/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: jobDescription, page: 1, pageSize: 10 }),
      });
      if (!response.ok) throw new Error("Failed to fetch results");
      const data = await response.json();
      setMatchResult(data);
      setShowResults(true);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewMatch = () => {
    setShowResults(false);
    setMatchResult(null);
    setError(null);
    setJobDescription("");
  };

  return (
    <>
      {!showResults && (
        <>
          <TalentMatchingHero />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MatchingInputForm 
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                tab={tab}
                setTab={setTab}
                fileUploaded={fileUploaded}
                setFileUploaded={setFileUploaded}
                showAdvancedOptions={showAdvancedOptions}
                setShowAdvancedOptions={setShowAdvancedOptions}
                matchingOptions={matchingOptions}
                setMatchingOptions={setMatchingOptions}
                selectedTargetSources={selectedTargetSources}
                setSelectedTargetSources={setSelectedTargetSources}
                useCrossSourceIntelligence={useCrossSourceIntelligence}
                setUseCrossSourceIntelligence={setUseCrossSourceIntelligence}
                isLoading={loading}
                matchingProgress={matchingProgress}
                onStartMatching={handleStartMatching}
                isReadyToStart={isReadyToStart}
              />
            </div>
            <div className="lg:col-span-1">
              <MatchingSidebar 
                showPremiumFeaturePrompt={showPremiumFeaturePrompt}
                dismissPremiumFeaturePrompt={dismissPremiumFeaturePrompt}
              />
            </div>
          </div>
        </>
      )}

      {showResults && (
        <MatchingResultsContainer
          isLoading={loading}
          matchResult={matchResult}
          error={error}
          onStartNewMatch={handleStartNewMatch}
          saveCandidate={saveCandidate}
          contactCandidate={contactCandidate}
          ragResult={ragResult}
          semanticResult={semanticResult}
          useRAG={useRAG}
          useSemanticMatching={useSemanticMatching}
        />
      )}
    </>
  );
};

export default MatchingTab;
