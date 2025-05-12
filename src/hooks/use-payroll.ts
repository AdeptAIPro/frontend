import { useState, useEffect } from "react";
import { Employee } from "@/types/employee";
import { mockEmployees } from "@/data/mockEmployees";
import { toast } from "@/hooks/use-toast";

/**
 * Hook to fetch and manage all payroll employees
 */
export function usePayrollEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // In a real app, you would fetch from your API
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setEmployees(mockEmployees);
        setError(null);
      } catch (err) {
        setError("Failed to load employees");
        toast("Failed to load employees");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const addEmployee = async (newEmployee: Employee) => {
    try {
      // Simulate adding employee
      await new Promise(resolve => setTimeout(resolve, 500));
      setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
      toast("Employee added successfully");
      return true;
    } catch (err) {
      toast("Failed to add employee");
      return false;
    }
  };

  return {
    employees,
    isLoading,
    error,
    addEmployee,
  };
}

/**
 * Hook to fetch and manage a single payroll employee
 */
export function usePayrollEmployee(employeeId: string | null) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!employeeId) {
        setEmployee(null);
        setIsLoading(false);
        return;
      }
      
      try {
        // In a real app, you would fetch from your API
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const foundEmployee = mockEmployees.find(emp => emp.id === employeeId) || null;
        setEmployee(foundEmployee);
        setError(null);
      } catch (err) {
        setError("Failed to load employee details");
        toast("Failed to load employee details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  return {
    employee,
    isLoading,
    error,
  };
}
