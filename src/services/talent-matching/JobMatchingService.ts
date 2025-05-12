import { MatchingOptions, MatchingResult } from "@/components/talent-matching/types";

export async function matchJobWithCandidates(
  jobDescription: string,
  matchingOptions?: MatchingOptions
): Promise<MatchingResult> {
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
    return {
      candidates: data.results,
      summary: data.summary,
    };
  } catch (error) {
    console.error("Error in job matching:", error);
    throw error;
  }
} 