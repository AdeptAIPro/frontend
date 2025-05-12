import React, { useState, useEffect } from "react";
import { usePayrollEmployees } from '@/hooks/use-payroll';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Search } from "lucide-react";
import AddEmployeeDialog from "./AddEmployeeDialog";
import { deleteEmployee } from '@/services/payroll/EmployeeService';

interface AddEmployeeDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddEmployee: (newEmployee: any) => Promise<void>;
}

interface EmployeeListProps {
  onSelectEmployee: (employeeId: string | null) => void;
  selectedEmployee: string | null;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onSelectEmployee, selectedEmployee }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { employees, isLoading, addEmployee } = usePayrollEmployees();
  const [localEmployees, setLocalEmployees] = useState(employees);

  useEffect(() => {
    setLocalEmployees(employees);
  }, [employees]);

  // Filter and safely handle employees that might be null/undefined
  const filteredEmployees = localEmployees
    .filter(emp => emp) // Filter out null/undefined employees
    .filter(emp => 
      (emp.name && emp.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (emp.employee_id && emp.employee_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (emp.type && emp.type.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    const success = await deleteEmployee(id);
    if (success) {
      setLocalEmployees(prev => prev.filter(emp => emp.employee_id !== id));
    }
  };

  const handleAddEmployee = async (newEmployee: any) => {
    const success = await addEmployee(newEmployee);
    if (success) {
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredEmployees.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow 
                  key={employee.id}
                  className={`cursor-pointer ${selectedEmployee === employee.id ? "bg-muted" : ""}`}
                  onClick={() => onSelectEmployee(employee.id)}
                >
                  <TableCell className="font-medium">{employee.name || 'Unnamed'}</TableCell>
                  <TableCell>{employee.employee_id || 'No ID'}</TableCell>
                  <TableCell>{employee.type || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={(employee.status || '').toLowerCase() === "active" ? "success" : "default"}>
                      {employee.status ? (employee.status.charAt(0).toUpperCase() + employee.status.slice(1)) : 'Unknown'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={e => { e.stopPropagation(); handleDelete(employee.employee_id); }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md bg-muted/10">
          <p className="mb-2 text-sm text-muted-foreground">No employees found</p>
          <Button variant="outline" size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
      )}

      <AddEmployeeDialog 
        isOpen={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
        onAddEmployee={handleAddEmployee}
      />
    </div>
  );
};

export default EmployeeList;
