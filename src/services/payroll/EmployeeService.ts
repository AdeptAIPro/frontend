import axios from 'axios';
import { Employee, EmployeeCreate, EmployeeUpdate } from '../types/employee';
import { toast } from "@/hooks/use-toast";
import { EMPLOYEES_TABLE, ensurePayrollTables } from "./utils/DatabaseUtils";
import { API_BASE_URL } from '../config';

export class EmployeeService {
    private static instance: EmployeeService;
    private constructor() {}

    public static getInstance(): EmployeeService {
        if (!EmployeeService.instance) {
            EmployeeService.instance = new EmployeeService();
        }
        return EmployeeService.instance;
    }

    async getEmployees(page: number = 1, limit: number = 10): Promise<{ data: Employee[]; total: number }> {
        try {
            const response = await axios.get(`${API_BASE_URL}/employees`, {
                params: { skip: (page - 1) * limit, limit }
            });
            return {
                data: response.data,
                total: response.headers['x-total-count'] || response.data.length
            };
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw error;
        }
    }

    async getEmployee(id: number): Promise<Employee> {
        try {
            const response = await axios.get(`${API_BASE_URL}/employees/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching employee ${id}:`, error);
            throw error;
        }
    }

    async createEmployee(employee: EmployeeCreate): Promise<Employee> {
        try {
            const response = await axios.post(`${API_BASE_URL}/employees`, employee);
            return response.data;
        } catch (error) {
            console.error('Error creating employee:', error);
            throw error;
        }
    }

    async updateEmployee(id: number, employee: EmployeeUpdate): Promise<Employee> {
        try {
            const response = await axios.put(`${API_BASE_URL}/employees/${id}`, employee);
            return response.data;
        } catch (error) {
            console.error(`Error updating employee ${id}:`, error);
            throw error;
        }
    }

    async deleteEmployee(id: number): Promise<void> {
        try {
            await axios.delete(`${API_BASE_URL}/employees/${id}`);
        } catch (error) {
            console.error(`Error deleting employee ${id}:`, error);
            throw error;
        }
    }

    async getPayrollHistory(id: number): Promise<any[]> {
        try {
            const response = await axios.get(`${API_BASE_URL}/employees/${id}/payroll-history`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching payroll history for employee ${id}:`, error);
            throw error;
        }
    }

    async uploadDocument(id: number, file: File): Promise<{ url: string }> {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(
                `${API_BASE_URL}/employees/${id}/documents`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error(`Error uploading document for employee ${id}:`, error);
            throw error;
        }
    }

    async getDocuments(id: number): Promise<any[]> {
        try {
            const response = await axios.get(`${API_BASE_URL}/employees/${id}/documents`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching documents for employee ${id}:`, error);
            throw error;
        }
    }
}

/**
 * Fetches all employees from the backend API
 */
export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    // First check if the table exists (stubbed)
    const tableExists = await ensurePayrollTables();
    if (!tableExists) {
      console.log("Employees table doesn't exist yet");
      return [];
    }
    
    const response = await fetch('/api/employees');
    const data = await response.json();
    
    return data as Employee[] || [];
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    toast({
      title: "Database Error",
      description: "Failed to load employees. Please check your database connection.",
      variant: "destructive",
    });
    // We'll still return an empty array as fallback
    return [];
  }
};

/**
 * Fetches a single employee by ID from the backend API
 */
export const fetchEmployeeById = async (id: string): Promise<Employee | null> => {
  try {
    const response = await fetch(`/api/employees/${id}`);
    const data = await response.json();
    
    return data as Employee;
  } catch (error) {
    console.error(`Failed to fetch employee with ID ${id}:`, error);
    toast({
      title: "Error",
      description: "Failed to load employee details",
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Creates a new employee in the backend API
 */
export const createEmployee = async (employee: Omit<Employee, "id">): Promise<Employee | null> => {
  try {
    // First check if the table exists (stubbed)
    const tableExists = await ensurePayrollTables();
    if (!tableExists) {
      toast({
        title: "Database Setup Required",
        description: "Please create the necessary tables in your backend.",
        variant: "default",
      });
      return null;
    }
    
    const response = await fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    const data = await response.json();
    
    toast({
      title: "Employee Created",
      description: "The employee has been successfully added.",
    });
    
    return data as Employee;
  } catch (error) {
    console.error("Failed to create employee:", error);
    toast({
      title: "Error",
      description: "Failed to create employee. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Updates an existing employee in the backend API
 */
export const updateEmployee = async (id: string, updates: Partial<Employee>): Promise<Employee | null> => {
  try {
    const response = await fetch(`/api/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    const data = await response.json();
    
    toast({
      title: "Employee Updated",
      description: "The employee information has been updated.",
    });
    
    return data as Employee;
  } catch (error) {
    console.error("Failed to update employee:", error);
    toast({
      title: "Error",
      description: "Failed to update employee. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

// Export addEmployee as an alias to createEmployee for backward compatibility
export const addEmployee = createEmployee;

/**
 * Deletes an employee by ID via the backend API
 */
export const deleteEmployee = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/employees/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Delete failed');
    }
    toast({
      title: 'Employee Deleted',
      description: 'Employee has been removed.',
    });
    return true;
  } catch (error) {
    console.error('Failed to delete employee:', error);
    toast({
      title: 'Error',
      description: 'Failed to delete employee',
      variant: 'destructive',
    });
    return false;
  }
};
