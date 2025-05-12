import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  Score: number;
  Grade: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const navigate = useNavigate();
  const limitedResults = results.slice(0, 5);

  const handleViewMore = () => {
    navigate('/pricing');
  };

  return (
    <Card className="w-full shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle className="text-lg">Search Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {limitedResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium">X</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Candidate {index + 1}</div>
                  <div className="text-xs text-muted-foreground">Details hidden</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">{result.Score}% Match</div>
                <div className="text-xs px-2 py-1 bg-primary/10 rounded-full">{result.Grade}</div>
              </div>
            </div>
          ))}
          
          {results.length > 5 && (
            <div className="mt-4">
              <Button 
                onClick={handleViewMore}
                className="w-full group"
                variant="outline"
              >
                <Lock className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                View Full Results
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Upgrade to view complete candidate details
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResults; 