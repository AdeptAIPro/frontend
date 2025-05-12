export type MockResumeMatch = {
    id: string;
    name: string;
    matchScore: number;
    topSkills: string[];
    experience: string;
  };
  
  export type FormValues = {
    jobDescription: string;
  };
  
  export type UploadStatus = "idle" | "success" | "error";
  