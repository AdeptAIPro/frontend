import { toast } from "@/hooks/use-toast";

export const EMPLOYEES_TABLE = "employees";
export const PAYROLL_HISTORY_TABLE = "payroll_history";

/**
 * Checks if we need to create the necessary tables in the backend API (stubbed: always true)
 */
export const ensurePayrollTables = async () => true;
