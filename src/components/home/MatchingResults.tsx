import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { MockResumeMatch } from "./types.tsx";

interface MatchingResultsProps {
  matches: MockResumeMatch[] | null;
  isSearching: boolean;
}

const MatchingResults = ({ matches, isSearching }: MatchingResultsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <h3 className="text-xl font-medium mb-4">Matching Results</h3>
      
      {!matches && !isSearching ? (
        <div className="h-[250px] flex items-center justify-center border-2 border-dashed rounded-lg p-4">
          <p className="text-center text-muted-foreground">
            Enter a job description to see matching candidates
          </p>
        </div>
      ) : isSearching ? (
        <div className="h-[250px] flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin h-8 w-8 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-primary font-medium">Finding the best matches...</p>
          </div>
        </div>
      ) : (
        <div className="overflow-auto max-h-[350px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Match</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches && matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell className="font-medium">{match.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${match.matchScore}%` }}
                        ></div>
                      </div>
                      <span className="whitespace-nowrap">{match.matchScore}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <p className="text-sm text-muted-foreground mt-4">
            {matches && `Showing top ${matches.length} candidates`}
          </p>
        </div>
      )}
    </div>
  );
};

export default MatchingResults;