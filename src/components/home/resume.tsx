import { useState } from "react";
import { motion } from "framer-motion";
import { MockResumeMatch, FormValues } from "./types.tsx";
import JobDescriptionForm from "./JobDescriptionForm";
import MatchingResults from "./MatchingResults.tsx";
import ResumeUpload from "./ResumeUpload";
import { MOCK_MATCHES } from "./mockData";

const JobMatchingSection = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [matches, setMatches] = useState<MockResumeMatch[] | null>(null);
  
  const handleSearch = (data: FormValues) => {
    setIsSearching(true);
    
    // Simulating API call to AWS services
    setTimeout(() => {
      setMatches(MOCK_MATCHES);
      setIsSearching(false);
    }, 1500);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight text-center">
            AI-Powered Talent Matching
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            Find the perfect candidates for your positions or submit your resume to be matched with future opportunities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Job Description Section */}
            <JobDescriptionForm 
              onSearch={handleSearch}
              isSearching={isSearching}
            />
            
            {/* Results Section */}
            <MatchingResults 
              matches={matches} 
              isSearching={isSearching} 
            />
            
            {/* Resume Upload Section */}
            <ResumeUpload />
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground text-center">
            <p>Our AI analyzes job descriptions and resumes to provide the best possible matches.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JobMatchingSection;