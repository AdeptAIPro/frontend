import React, { useState } from 'react';
import JobDescriptionInput from './talent/JobDescriptionInput';
import ResumeUpload from './talent/ResumeUpload';
import CandidateResults from './talent/CandidateResults';
import FeatureHighlights from './talent/FeatureHighlights';

const TalentMatchmakingPreview: React.FC = () => {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [showLimited, setShowLimited] = useState<boolean>(false);

  const handleAnalyzeClick = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const response = await fetch("http://127.0.0.1:5055/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          query: jobDescription,
          page: 1,
          pageSize: 10
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch candidates");
      }

      const data = await response.json();
      setCandidates(data.results);
      setShowLimited(true);
    } catch (error) {
      console.error("Error analyzing job description:", error);
      alert("Failed to analyze job description. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="talent-matching" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered <span className="gradient-text">Talent Matchmaking</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the power of our AI talent matching engine. Paste a job description to find matching candidates or upload your resume to be discovered by employers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Job Description Input Section */}
          <div className="md:col-span-2">
            <JobDescriptionInput 
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              isAnalyzing={isAnalyzing}
              onAnalyze={handleAnalyzeClick}
            />
          </div>
          
          {/* Resume Upload Section */}
          <div>
            <ResumeUpload />
          </div>
        </div>
        
        {/* Results Section */}
        <CandidateResults 
          candidates={candidates}
          showLimited={showLimited}
          isLoading={isAnalyzing}
          jobDescription={jobDescription}
        />
        
        {/* Features/Benefits Section */}
        <FeatureHighlights />
      </div>
    </section>
  );
};

export default TalentMatchmakingPreview;
