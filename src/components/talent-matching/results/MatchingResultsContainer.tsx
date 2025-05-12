import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MatchingResult } from "../types";
import { AppError } from "@/utils/error-handler";

interface MatchingResultsContainerProps {
  isLoading: boolean;
  matchResult: MatchingResult | null;
  error?: Error | AppError | string | null;
  onStartNewMatch: () => void;
  saveCandidate: (id: string) => void;
  contactCandidate: (id: string) => void;
}

const CandidateCard = ({ candidate }) => {
  const skills = Array.isArray(candidate.skills)
    ? candidate.skills
    : Array.isArray(candidate.Skills)
    ? candidate.Skills
    : [];

  return (
    <Card className="rounded-2xl border border-gray-200 shadow-md p-6 mb-6 bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-indigo-600 text-lg font-bold">
            {candidate.FullName ? candidate.FullName[0] : "👤"}
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">
              {candidate.FullName || "Unknown"}
            </CardTitle>
            <div className="text-sm text-gray-500">
              {candidate.Grade ? `Grade: ${candidate.Grade}` : ""}
            </div>
          </div>
        </div>
        <div className="text-green-600 font-semibold text-md">
          {candidate.Score ? `${candidate.Score}% Match` : ""}
        </div>
      </CardHeader>

      <CardContent className="text-sm space-y-2">
        <div><strong>Experience:</strong> {candidate.Experience || candidate.experience || "N/A"}</div>
        <div><strong>Email:</strong> {candidate.email || "N/A"}</div>
        <div><strong>Phone:</strong> {candidate.phone || "N/A"}</div>
        <div>
          <strong>Skills:</strong>
          <div className="mt-1 flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill, idx) => (
                <Badge key={idx} variant="secondary">{skill}</Badge>
              ))
            ) : (
              <span className="text-gray-400">No skills listed</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MatchingResultsContainer: React.FC<MatchingResultsContainerProps> = ({
  isLoading,
  matchResult,
  error,
  onStartNewMatch,
  saveCandidate,
  contactCandidate
}) => {
  const candidates = matchResult && Array.isArray(matchResult.results) ? matchResult.results : [];

  if (isLoading)
    return <div className="text-center text-blue-600 py-10 text-lg">Loading candidates...</div>;

  if (error)
    return (
      <div className="text-red-600 py-10 text-center">
        <p>Error: {typeof error === "string" ? error : "An error occurred."}</p>
        <Button className="mt-4" onClick={onStartNewMatch}>Try Again</Button>
      </div>
    );

  if (!candidates.length)
    return (
      <div className="text-gray-600 py-10 text-center">
        <p>No candidates found.</p>
        <Button className="mt-4" onClick={onStartNewMatch}>Start New Match</Button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h3 className="text-2xl font-bold mb-6 text-center text-indigo-700">Matching Candidates</h3>
      {candidates.map((candidate, idx) => (
        <CandidateCard key={candidate.email || idx} candidate={candidate} />
      ))}
      <div className="flex justify-center mt-6">
        <Button onClick={onStartNewMatch}>Start New Match</Button>
      </div>
    </div>
  );
};

export default MatchingResultsContainer;
