// import React, { useEffect, useState } from 'react';
// import {
//   Card, CardContent, CardDescription, CardHeader, CardTitle
// } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Check } from 'lucide-react';
// import { matchJobWithCandidates } from '@/services/talent-matching/JobMatchingService';
// import { Button } from '../button';
// import { Link } from 'react-router-dom';

// interface Candidate {
//   id: string;
//   FullName: string;
//   email: string;
//   phone: string;
//   Skills: string[];
//   Experience: string;
//   SourceURL: string;
//   Score: number;
//   Grade: string;
// }

// interface CandidateResultsProps {
//   candidates?: Candidate[];
//   showLimited: boolean;
//   isLoading?: boolean;
//   jobDescription?: string;
// }

// const CandidateResults: React.FC<CandidateResultsProps> = ({
//   candidates = [],
//   showLimited,
//   isLoading = false,
// }) => {
//   const displayedCandidates = candidates.slice(0, 5);

//   if (isLoading) {
//     return (
//       <div className="mt-12">
//         <Card className="shadow-lg overflow-hidden border-primary/10">
//           <CardContent className="p-6">
//             <div className="text-center text-muted-foreground">
//               Loading results...
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (displayedCandidates.length === 0) {
//     return (
//       <div className="mt-12">
//         <Card className="shadow-lg overflow-hidden border-primary/10">
//           <CardContent className="p-6">
//             <div className="text-center text-muted-foreground">
//               No matching candidates found
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-12">
//       <Card className="shadow-lg overflow-hidden border-primary/10">
//         <CardHeader className="bg-primary/5 border-b border-primary/10">
//           <div className="flex items-center gap-2">
//             <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
//               <Check className="h-4 w-4 text-primary" />
//             </div>
//             <div>
//               <CardTitle>Top Matching Candidates</CardTitle>
//               <CardDescription>
//                 Showing top 5 matches (limited view)
//               </CardDescription>
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent className="p-0">
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader className="bg-muted/30">
//                 <TableRow>
//                   <TableHead className="w-[90px]">Match</TableHead>
//                   <TableHead>Candidate</TableHead>
//                   <TableHead className="hidden md:table-cell">Experience</TableHead>
//                   <TableHead>Skills</TableHead>
//                   <TableHead className="hidden md:table-cell">Contact</TableHead>
//                   <TableHead className="w-[100px] text-right">Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {displayedCandidates.map((candidate, index) => (
//                   <TableRow key={`${candidate.email}-${index}`} className="hover:bg-muted/20 transition-colors">
//                     <TableCell>
//                       <div className="flex flex-col items-center">
//                         <span className="text-lg font-bold text-primary">
//                           {candidate.Score ? `${candidate.Score}%` : 'N/A'}
//                         </span>
//                         <div className="w-full bg-muted rounded-full h-2 mt-1">
//                           <div
//                             className="bg-primary h-2 rounded-full"
//                             style={{ width: `${candidate.Score || 0}%` }}
//                           />
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <span className="font-medium">{candidate.FullName || 'N/A'}</span>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell">***</TableCell>
//                     <TableCell>***</TableCell>
//                     <TableCell className="hidden md:table-cell">***</TableCell>
//                     <TableCell className="text-right">***</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//       <div>
//         <Link to="/pricing">     <Button>View All Candidates</Button></Link>
//       </div>
//     </div>
//   );
// };

// export default CandidateResults;
import React from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Check } from 'lucide-react';
import { Button } from '../button';
import { Link } from 'react-router-dom';

interface Candidate {
  id: string;
  FullName: string;
  email: string;
  phone: string;
  Skills: string[];
  Experience: string;
  SourceURL: string;
  Score: number;
  Grade: string;
}

interface CandidateResultsProps {
  candidates?: Candidate[];
  showLimited: boolean;
  isLoading?: boolean;
  jobDescription?: string;
}

const CandidateResults: React.FC<CandidateResultsProps> = ({
  candidates = [],
  showLimited,
  isLoading = false,
}) => {
  const displayedCandidates = showLimited ? candidates.slice(0, 5) : candidates;

  if (isLoading) {
    return (
      <div className="mt-12">
        <Card className="shadow-lg overflow-hidden border-primary/10">
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              Loading results...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (displayedCandidates.length === 0) {
    return (
      <div className="mt-12">
        <Card className="shadow-lg overflow-hidden border-primary/10">
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              No matching candidates found
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <Card className="shadow-lg overflow-hidden border-primary/10">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle>Top Matching Candidates</CardTitle>
              <CardDescription>
                {showLimited
                  ? 'Showing top 5 matches (limited view)'
                  : 'Showing all matching candidates'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[90px]">Match</TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead className="hidden md:table-cell">Experience</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead className="hidden md:table-cell">Contact</TableHead>
                  <TableHead className="w-[100px] text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedCandidates.map((candidate, index) => (
                  <TableRow key={`${candidate.email}-${index}`} className="hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-primary">
                          {candidate.Score ? `${candidate.Score}%` : 'N/A'}
                        </span>
                        <div className="w-full bg-muted rounded-full h-2 mt-1">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${candidate.Score || 0}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {candidate.FullName ? candidate.FullName.split(' ')[0] : 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {candidate.Experience || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {candidate.Skills?.join(', ') || 'N/A'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>
                        <div>{candidate.email}</div>
                        <div>{candidate.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to="/pricing"> 
                        <Button size="sm">View</Button>
                        </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {showLimited && (
        <div className="mt-4 text-center">
          <Link to="/pricing">
            <Button>View All Candidates</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CandidateResults;
