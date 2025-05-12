import { PAYROLL_HISTORY_TABLE, ensurePayrollTables } from "./utils/DatabaseUtils";

/**
 * Records payroll run in history using the backend API
 */
export const recordPayrollRun = async (
  payrollData: {
    runDate: string;
    payPeriod: string;
    totalAmount: number;
    totalEmployees: number;
    status: "Processing" | "Complete" | "Failed";
  }
): Promise<any> => {
  try {
    // Check if table exists (stubbed)
    const tableExists = await ensurePayrollTables();
    if (!tableExists) {
      console.log("Payroll history table doesn't exist yet");
      return null;
    }
    
    const response = await fetch('/api/payroll-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payrollData),
    });
    
    const data = await response.json();
    
    if (data.error) {
      console.error("Error recording payroll run:", data.error);
      throw data.error;
    }
    
    return data;
  } catch (error) {
    console.error("Failed to record payroll run:", error);
    return null;
  }
};

/**
 * Fetches payroll history from the backend API
 */
export const fetchPayrollHistory = async (): Promise<any[]> => {
  try {
    // Check if table exists (stubbed)
    const tableExists = await ensurePayrollTables();
    if (!tableExists) {
      console.log("Payroll history table doesn't exist yet");
      return [];
    }
    
    const response = await fetch('/api/payroll-history');
    const data = await response.json();
    
    if (data.error) {
      console.error("Error fetching payroll history:", data.error);
      throw data.error;
    }
    
    return data || [];
  } catch (error) {
    console.error("Failed to fetch payroll history:", error);
    return [];
  }
};
