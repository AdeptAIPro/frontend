// // import React, { useState, useEffect } from "react";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { Database, Loader2 } from "lucide-react";
// // import { toast } from "sonner";

// // const API_BASE_URL = 'http://127.0.0.1:5055';

// // interface FetchFromAtsTabProps {
// //   setJobDescription: (text: string) => void;
// // }

// // const FetchFromAtsTab: React.FC<FetchFromAtsTabProps> = ({
// //   setJobDescription
// // }) => {
// //   const [selectedSystem, setSelectedSystem] = useState<string>("");
// //   const [jobId, setJobId] = useState<string>("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [jobs, setJobs] = useState([]);
// //   const [isLoadingJobs, setIsLoadingJobs] = useState(false);

// //   useEffect(() => {
// //     if (selectedSystem === "ceipal") {
// //       setIsLoadingJobs(true);
// //       fetch("http://localhost:5055/api/v1/ceipal/jobs")
// //         .then(res => res.json())
// //         .then(data => setJobs(data.jobs || []))
// //         .catch(() => setJobs([]))
// //         .finally(() => setIsLoadingJobs(false));
// //     } else {
// //       setJobs([]);
// //     }
// //   }, [selectedSystem]);

// //   const handleFetchJobDetails = async () => {
// //     if (!selectedSystem || !jobId) {
// //       toast.error("Please select a system and enter a job ID");
// //       return;
// //     }

// //     setIsLoading(true);
// //     try {
// //       if (selectedSystem === "ceipal") {
// //         const response = await fetch(`${API_BASE_URL}/api/v1/ceipal/jobs`, {
// //           method: 'GET',
// //           headers: {
// //             'Accept': 'application/json',
// //             'Content-Type': 'application/json',
// //           },
// //           mode: 'cors',
// //           credentials: 'include'
// //         });
        
// //         if (!response.ok) {
// //           throw new Error(`Failed to fetch jobs: ${response.status}`);
// //         }

// //         const data = await response.json();
// //         const jobs = data.jobs || [];
        
// //         const matchingJob = jobs.find(job => 
// //           job.job_code === jobId || 
// //           job.client_job_id === jobId
// //         );

// //         if (matchingJob) {
// //           setJobDescription(matchingJob.job_description || "");
// //           toast.success("Job details fetched successfully");
// //         } else {
// //           const detailsResponse = await fetch(
// //             `${API_BASE_URL}/api/v1/ceipal/getJobDetails?job_code=${encodeURIComponent(jobId)}`,
// //             {
// //               method: 'GET',
// //               headers: {
// //                 'Accept': 'application/json',
// //                 'Content-Type': 'application/json',
// //               },
// //               mode: 'cors',
// //               credentials: 'include'
// //             }
// //           );

// //           if (!detailsResponse.ok) {
// //             throw new Error(`Failed to fetch job details: ${detailsResponse.status}`);
// //           }

// //           const detailsData = await detailsResponse.json();
// //           if (detailsData.job_details) {
// //             setJobDescription(detailsData.job_details.job_description || "");
// //             toast.success("Job details fetched successfully");
// //           } else {
// //             toast.error("No job details found");
// //           }
// //         }
// //       } else {
// //         toast.error("Selected ATS system not implemented yet");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching job details:", error);
// //       toast.error(error instanceof Error ? error.message : "Failed to fetch job details");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="space-y-4">
// //       <div className="grid gap-4 md:grid-cols-2">
// //         <div>
// //           <label className="text-sm font-medium mb-2 block">Select ATS/VMS System</label>
// //           <Select value={selectedSystem} onValueChange={setSelectedSystem}>
// //             <SelectTrigger>
// //               <SelectValue placeholder="Select system" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="ceipal">Ceipal</SelectItem>
// //               <SelectItem value="stafferlink">Stafferlink</SelectItem>
// //               <SelectItem value="sapfieldglass">SAP Fieldglass</SelectItem>
// //               <SelectItem value="beeline">Beeline</SelectItem>
// //               <SelectItem value="pontoon">Pontoon</SelectItem>
// //               <SelectItem value="jobdiva">JobDiva</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>
// //         <div>
// //           <label className="text-sm font-medium mb-2 block">Job ID/Reference</label>
// //           <Input 
// //             placeholder="Enter job ID or reference" 
// //             value={jobId} 
// //             onChange={(e) => setJobId(e.target.value)}
// //             disabled={isLoading}
// //           />
// //         </div>
// //       </div>
// //       <Button 
// //         className="w-full md:w-auto" 
// //         onClick={handleFetchJobDetails}
// //         disabled={isLoading || !selectedSystem || !jobId}
// //       >
// //         {isLoading ? (
// //           <>
// //             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //             Fetching...
// //           </>
// //         ) : (
// //           <>
// //             <Database className="mr-2 h-4 w-4" />
// //             Fetch Job Details
// //           </>
// //         )}
// //       </Button>
// //       {selectedSystem === "ceipal" && (
// //         <div className="mt-4">
// //           {isLoadingJobs ? (
// //             <div>Loading jobs...</div>
// //           ) : jobs.length === 0 ? (
// //             <div>No jobs found.</div>
// //           ) : (
// //             <div>
// //               <h4>Ceipal Jobs</h4>
// //               <ul>
// //                 {jobs.map(job => (
// //                   <li key={job.job_code || job.id}>
// //                     <b>{job.job_title}</b> (Job Code: {job.job_code})
// //                     <div>Location: {job.location}</div>
// //                     <div>Type: {job.job_type}</div>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default FetchFromAtsTab;
// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Database, Loader2 } from "lucide-react";
// import { toast } from "sonner";

// const API_BASE_URL = 'http://127.0.0.1:5055';

// interface FetchFromAtsTabProps {
//   setJobDescription: (text: string) => void;
// }

// const FetchFromAtsTab: React.FC<FetchFromAtsTabProps> = ({
//   setJobDescription
// }) => {
//   const [selectedSystem, setSelectedSystem] = useState<string>("");
//   const [jobId, setJobId] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [jobs, setJobs] = useState<any[]>([]);
//   const [isLoadingJobs, setIsLoadingJobs] = useState(false);
//   const [matchedJob, setMatchedJob] = useState<any | null>(null);

//   useEffect(() => {
//     if (selectedSystem === "ceipal") {
//       setIsLoadingJobs(true);
//       fetch("http://localhost:5055/api/v1/ceipal/jobs")
//         .then(res => res.json())
//         .then(data => setJobs(data.jobs || []))
//         .catch(() => setJobs([]))
//         .finally(() => setIsLoadingJobs(false));
//     } else {
//       setJobs([]);
//     }
//   }, [selectedSystem]);

//   const handleFetchJobDetails = async () => {
//     if (!selectedSystem || !jobId) {
//       toast.error("Please select a system and enter a job ID");
//       return;
//     }

//     setIsLoading(true);
//     setMatchedJob(null); // clear previous result

//     try {
//       if (selectedSystem === "ceipal") {
//         const response = await fetch(`${API_BASE_URL}/api/v1/ceipal/jobs`, {
//           method: 'GET',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           },
//           mode: 'cors',
//           credentials: 'include'
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch jobs: ${response.status}`);
//         }

//         const data = await response.json();
//         const jobs = data.jobs || [];

//         const matchingJob = jobs.find(job =>
//           job.job_code === jobId || job.client_job_id === jobId
//         );

//         if (matchingJob) {
//           setMatchedJob(matchingJob);
//           setJobDescription(matchingJob.job_description || "");
//           toast.success("Job details fetched successfully");
//         } else {
//           // Try fallback endpoint
//           const detailsResponse = await fetch(
//             `${API_BASE_URL}/api/v1/ceipal/getJobDetails?job_code=${encodeURIComponent(jobId)}`,
//             {
//               method: 'GET',
//               headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//               },
//               mode: 'cors',
//               credentials: 'include'
//             }
//           );

//           if (!detailsResponse.ok) {
//             throw new Error(`Failed to fetch job details: ${detailsResponse.status}`);
//           }

//           const detailsData = await detailsResponse.json();
//           if (detailsData.job_details) {
//             setMatchedJob(detailsData.job_details);
//             setJobDescription(detailsData.job_details.job_description || "");
//             toast.success("Job details fetched successfully");
//           } else {
//             toast.error("No job details found");
//           }
//         }
//       } else {
//         toast.error("Selected ATS system not implemented yet");
//       }
//     } catch (error) {
//       console.error("Error fetching job details:", error);
//       toast.error(error instanceof Error ? error.message : "Failed to fetch job details");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="grid gap-4 md:grid-cols-2">
//         <div>
//           <label className="text-sm font-medium mb-2 block">Select ATS/VMS System</label>
//           <Select value={selectedSystem} onValueChange={setSelectedSystem}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select system" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="ceipal">Ceipal</SelectItem>
//               <SelectItem value="stafferlink">Stafferlink</SelectItem>
//               <SelectItem value="sapfieldglass">SAP Fieldglass</SelectItem>
//               <SelectItem value="beeline">Beeline</SelectItem>
//               <SelectItem value="pontoon">Pontoon</SelectItem>
//               <SelectItem value="jobdiva">JobDiva</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//           <label className="text-sm font-medium mb-2 block">Job ID/Reference</label>
//           <Input
//             placeholder="Enter job ID or reference"
//             value={jobId}
//             onChange={(e) => setJobId(e.target.value)}
//             disabled={isLoading}
//           />
//         </div>
//       </div>

//       <Button
//         className="w-full md:w-auto"
//         onClick={handleFetchJobDetails}
//         disabled={isLoading || !selectedSystem || !jobId}
//       >
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Fetching...
//           </>
//         ) : (
//           <>
//             <Database className="mr-2 h-4 w-4" />
//             Fetch Job Details
//           </>
//         )}
//       </Button>

//       {selectedSystem === "ceipal" && (
//         <div className="mt-4">
//           {isLoadingJobs && <div className="text-gray-500">Loading Ceipal jobs...</div>}

//           {!isLoadingJobs && jobId && matchedJob && (
//             <div className="p-4 border rounded-md shadow-sm bg-gray-50">
//               <h4 className="text-lg font-semibold mb-1">{matchedJob.job_title}</h4>
//               <div><strong>Job Code:</strong> {matchedJob.job_code}</div>
//               <div><strong>Location:</strong> {matchedJob.location}</div>
//               <div><strong>Type:</strong> {matchedJob.job_type}</div>
//             </div>
//           )}

//           {!isLoadingJobs && jobId && !matchedJob && (
// <></>          )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FetchFromAtsTab;
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database, Loader2 } from "lucide-react";
import { toast } from "sonner";

const API_BASE_URL = "http://127.0.0.1:5055";

interface FetchFromAtsTabProps {
  setJobDescription: (text: string) => void;
}

const FetchFromAtsTab: React.FC<FetchFromAtsTabProps> = ({ setJobDescription }) => {
  const [selectedSystem, setSelectedSystem] = useState<string>("");
  const [jobId, setJobId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [matchedJob, setMatchedJob] = useState<any | null>(null);

  useEffect(() => {
    if (selectedSystem === "ceipal") {
      setIsLoadingJobs(true);
      setMatchedJob(null);
      fetch(`${API_BASE_URL}/api/v1/ceipal/jobs`)
        .then((res) => res.json())
        .then((data) => setJobs(data.jobs || []))
        .catch(() => setJobs([]))
        .finally(() => setIsLoadingJobs(false));
    } else {
      setJobs([]);
      setMatchedJob(null);
    }
  }, [selectedSystem]);

  const handleFetchJobDetails = async () => {
    if (!selectedSystem || !jobId) {
      toast.error("Please select a system and enter a job ID");
      return;
    }

    setIsLoading(true);
    setMatchedJob(null);

    try {
      if (selectedSystem === "ceipal") {
        const response = await fetch(`${API_BASE_URL}/api/v1/ceipal/jobs`);
        const data = await response.json();
        const fetchedJobs = data.jobs || [];
        setJobs(fetchedJobs);

        const matchingJob = fetchedJobs.find(
          (job) =>
            job.job_code?.toLowerCase() === jobId.toLowerCase() ||
            job.client_job_id?.toLowerCase() === jobId.toLowerCase()
        );

        if (matchingJob) {
          console.log("Matched job (local):", matchingJob);
          setMatchedJob(matchingJob);
          setJobDescription(matchingJob.job_description || "");
          toast.success("Job details fetched successfully");
        } else {
          const fallbackRes = await fetch(
            `${API_BASE_URL}/api/v1/ceipal/getJobDetails?job_code=${encodeURIComponent(jobId)}`
          );
          const fallbackData = await fallbackRes.json();

          if (fallbackData?.job_details) {
            console.log("Matched job (fallback):", fallbackData.job_details);
            setMatchedJob(fallbackData.job_details);
            setJobDescription(fallbackData.job_details.job_description || "");
            toast.success("Job details fetched via fallback API");
          } else {
            toast.error("No job details found");
          }
        }
      } else {
        toast.error("Selected ATS system not implemented yet");
      }
    } catch (error) {
      console.error("Error fetching job:", error);
      toast.error("Failed to fetch job details");
    } finally {
      setIsLoading(false);
    }
  };

  const getField = (obj: any, keys: string[], fallback: string = "N/A") => {
    for (const key of keys) {
      if (obj?.[key]) return obj[key];
    }
    return fallback;
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium mb-2 block">Select ATS/VMS System</label>
          <Select value={selectedSystem} onValueChange={setSelectedSystem}>
            <SelectTrigger>
              <SelectValue placeholder="Select system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ceipal">Ceipal</SelectItem>
              <SelectItem value="stafferlink">Stafferlink</SelectItem>
              <SelectItem value="sapfieldglass">SAP Fieldglass</SelectItem>
              <SelectItem value="beeline">Beeline</SelectItem>
              <SelectItem value="pontoon">Pontoon</SelectItem>
              <SelectItem value="jobdiva">JobDiva</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Job ID/Reference</label>
          <Input
            placeholder="Enter job ID or reference"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      <Button
        className="w-full md:w-auto"
        onClick={handleFetchJobDetails}
        disabled={isLoading || !selectedSystem || !jobId}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Fetching...
          </>
        ) : (
          <>
            <Database className="mr-2 h-4 w-4" />
            Fetch Job Details
          </>
        )}
      </Button>

      {selectedSystem === "ceipal" && matchedJob && (
        <div className="mt-4 p-4 border rounded-md shadow-sm bg-gray-50">
          <h4 className="text-lg font-semibold mb-1">
            {getField(matchedJob, ["job_title", "title"], "Untitled Job")}
          </h4>
          <div><strong>Job Code:</strong> {getField(matchedJob, ["job_code", "jobCode", "jobCodeId"])}</div>
          <div><strong>Location:</strong> {getField(matchedJob, ["location", "job_location"])}</div>
          <div><strong>Type:</strong> {getField(matchedJob, ["job_type", "type"])}</div>

          {/* Debug Dump */}
          {/* <div className="mt-4">
            <strong className="block mb-1 text-sm text-gray-600">Raw job object:</strong>
            <pre className="text-xs bg-gray-100 p-2 rounded max-h-64 overflow-auto">
              {JSON.stringify(matchedJob, null, 2)}
            </pre>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default FetchFromAtsTab;
