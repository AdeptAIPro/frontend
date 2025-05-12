import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormValues, MockResumeMatch } from "./types.tsx";

interface JobDescriptionFormProps {
  onSearch: (data: FormValues) => void;
  isSearching: boolean;
}

const JobDescriptionForm = ({ onSearch, isSearching }: JobDescriptionFormProps) => {
  const form = useForm<FormValues>({
    defaultValues: {
      jobDescription: "",
    }
  });
  
  const onSubmit = (data: FormValues) => {
    if (!data.jobDescription.trim()) return;
    onSearch(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <h3 className="text-xl font-medium mb-4">Enter Job Description</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the job position, required skills..."
                    className="min-h-[150px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  More details = better matches
                </FormDescription>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            disabled={isSearching} 
            className="w-full"
          >
            {isSearching ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              <span className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Find Matches
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default JobDescriptionForm;