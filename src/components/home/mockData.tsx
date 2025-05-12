import { MockResumeMatch } from "./types";

// Mock data that would come from actual resume matching
export const MOCK_MATCHES: MockResumeMatch[] = [
  {
    id: "1",
    name: "John Doe",
    matchScore: 92,
    topSkills: ["JavaScript", "React", "Node.js"],
    experience: "5 years"
  },
  {
    id: "2",
    name: "Jane Smith",
    matchScore: 85,
    topSkills: ["Python", "Data Analysis", "AWS"],
    experience: "3 years"
  },
  {
    id: "3",
    name: "Alex Johnson",
    matchScore: 78,
    topSkills: ["Java", "Spring Boot", "SQL"],
    experience: "7 years"
  },
  {
    id: "4",
    name: "Sarah Williams",
    matchScore: 68,
    topSkills: ["HTML/CSS", "UI/UX", "Figma"],
    experience: "2 years"
  }
];