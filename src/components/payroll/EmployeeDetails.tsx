
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCog, Mail, Phone, MapPin, CalendarClock, Building, Briefcase, CreditCard, FileText, Download } from 'lucide-react';
import { Employee } from '@/types/employee';

interface EmployeeDetailsProps {
  employee: Employee | any; // Allow for global Employee type
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employee }) => {
  // Safety check: if employee is undefined or null, render a placeholder card
  if (!employee) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Employee Details</CardTitle>
          <CardDescription>No employee selected or data unavailable</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please select an employee to view their details.</p>
        </CardContent>
      </Card>
    );
  }

  // Make sure employee.status exists with a fallback
  const status = employee.status || 'unknown';
  
  // Format address properly to avoid object display issue
  const formatAddress = (address: any) => {
    if (!address) return 'N/A';
    if (typeof address === 'string') return address;
    
    // If it's an object, format it appropriately
    if (typeof address === 'object') {
      return `${address.street || ''}, ${address.city || ''}, ${address.state || ''}`;
    }
    
    return 'N/A';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{employee.name}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <span>{employee.employeeId || employee.id}</span>
              <Badge variant={status === 'active' ? 'success' : 'default'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <UserCog className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="info" className="mt-2">
          <TabsList className="mb-4">
            <TabsTrigger value="info">Personal Info</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Email:</span>
                  <span>{employee.email || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Phone:</span>
                  <span>{employee.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Address:</span>
                  <span className="truncate">{formatAddress(employee.address)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Hire Date:</span>
                  <span>{employee.hireDate || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Department:</span>
                  <span>{employee.department || 'Unassigned'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Position:</span>
                  <span>{employee.position || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Employment Type</h4>
                <Badge variant="outline">{employee.type || employee.employeeType || 'N/A'}</Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payroll">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-3">
                  <div className="text-xs text-muted-foreground">Pay Rate</div>
                  <div className="text-lg font-bold">${employee.payRate || '0.00'} / hr</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-xs text-muted-foreground">Pay Frequency</div>
                  <div className="text-lg font-bold">Bi-weekly</div>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Tax Information</h4>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Withholding:</span>
                  <span>{employee.taxInfo?.withholding || employee.taxInfo?.withholdings || 'Not set'}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Actions</h4>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Run Individual Payroll
                  </Button>
                  <Button variant="outline" size="sm">
                    View Payment History
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">Employee Documents</h4>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Upload Document
                </Button>
              </div>
              <div className="border rounded-md p-6 text-center">
                <p className="text-muted-foreground">No documents available</p>
                <Button variant="link" className="mt-2">
                  <Download className="h-4 w-4 mr-1" />
                  Generate Onboarding Documents
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmployeeDetails;
