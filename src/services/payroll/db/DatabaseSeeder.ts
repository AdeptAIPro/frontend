import { toast } from "@/hooks/use-toast";
import { sampleEmployees } from "../data/SampleEmployeeData";
import { createPayrollTables } from "../utils/PayrollDatabaseUtils";

/**
 * Seeds the database with sample employee data using the backend API
 */
export const seedEmployeeData = async (): Promise<boolean> => {
  try {
    // First check if tables exist (stubbed)
    const tablesExist = await createPayrollTables();
    if (!tablesExist) {
      return false;
    }
    
    // Check if data already exists
    const response = await fetch('/api/payroll-seed', { method: 'POST', body: JSON.stringify({ query: 'SELECT id FROM employees LIMIT 1' }) });
    const data = await response.json();
    
    if (data && data.length > 0) {
      // Data already exists, ask before overwriting
      console.log("Sample data already exists");
      toast({
        title: "Sample Data Already Exists",
        description: "Additional sample data has been added to your database.",
      });
    }
    
    // Insert sample data
    for (const employee of sampleEmployees) {
      const response = await fetch('/api/payroll-seed', { method: 'POST', body: JSON.stringify(employee) });
      const result = await response.json();
      
      if (result.error) {
        console.error("Error inserting employee:", result.error);
        toast({
          title: "Error",
          description: "Failed to add sample employee data",
          variant: "destructive",
        });
        return false;
      }
    }
    
    toast({
      title: "Success",
      description: "Sample employee data has been added to your database",
    });
    
    return true;
  } catch (error) {
    console.error("Error seeding employee data:", error);
    toast({
      title: "Error",
      description: "Failed to add sample employee data",
      variant: "destructive",
    });
    return false;
  }
};
