
import { Employee } from "@/types/employee";
import { fetchEmployees, fetchEmployeeById } from "./EmployeeService";
import { recordPayrollRun } from "./PayrollHistoryService";
import { processBulkPayments } from "./payment/PaymentProcessor";
import { processEmployeePayroll } from "./processors/EmployeePayrollProcessor";
import { calculateHoursPerPeriod, determinePayrollStatus } from "./utils/PayrollCalculationUtils";
import { PayrollRunOptions, PayrollRunResult, PayrollBatchItem } from "./types/PayrollTypes";
import { toast } from "@/hooks/use-toast";
import BankValidationService from "./payment/BankValidationService";
import TimeTrackingService from "./time/TimeTrackingService";
import { W2GenerationService } from "./compliance/W2GenerationService";

/**
 * Runs payroll processing for the specified pay period and employees
 */
export const runPayroll = async (options: PayrollRunOptions): Promise<PayrollRunResult> => {
  const startTime = Date.now();
  
  try {
    // Show toast if using dynamic tax rates
    if (options.useDynamicTaxRates) {
      toast({
        title: "Using Dynamic Tax Rates",
        description: "Connecting to tax agency APIs to fetch current tax rates...",
      });
    }

    let employees: Employee[] = [];
    
    // Check if we're processing an individual employee
    if (options.individualEmployeeId) {
      const employee = await fetchEmployeeById(options.individualEmployeeId);
      if (employee) {
        employees = [employee];
        toast({
          title: "Individual Employee Payroll",
          description: `Processing payroll for ${employee.firstName} ${employee.lastName}`,
        });
      } else {
        toast({
          title: "Employee Not Found",
          description: "The selected employee could not be found.",
          variant: "destructive",
        });
        return {
          totalEmployees: 0,
          processedEmployees: 0,
          totalGrossPay: 0,
          totalNetPay: 0,
          totalTaxes: 0,
          successfulPayments: 0,
          failedPayments: 0,
          payDate: options.payDate,
          processingTime: 0,
          status: "Failed"
        };
      }
    } else {
      // 1. Fetch and filter employees
      employees = await fetchEmployees();
      
      // Apply filters
      if (options.employeeType && options.employeeType !== "All") {
        employees = employees.filter(emp => emp.payrollType === options.employeeType);
      }
      
      if (options.departmentFilter) {
        employees = employees.filter(emp => emp.department === options.departmentFilter);
      }
      
      // Apply country filter if specified
      if (options.country) {
        employees = employees.filter(emp => {
          if (typeof emp.address === 'string') {
            const address = emp.address || "";
            if (options.country === "USA") {
              return !address.includes("India");
            } else if (options.country === "India") {
              return address.includes("India");
            }
          } else if (typeof emp.address === 'object' && emp.address) {
            // Handle address object format
            if (options.country === "USA") {
              return emp.address.state !== "India";
            }
          }
          return true; // Default case, include all
        });
      }
    }
    
    // 2. Initialize result object
    const result: PayrollRunResult = {
      totalEmployees: employees.length,
      processedEmployees: 0,
      totalGrossPay: 0,
      totalNetPay: 0,
      totalTaxes: 0,
      successfulPayments: 0,
      failedPayments: 0,
      payDate: options.payDate,
      processingTime: 0,
      status: "Failed",
      taxRateSource: options.useDynamicTaxRates ? "API" : "Static"
    };
    
    // 3. Calculate hours per pay period
    const hoursPerPeriod = calculateHoursPerPeriod(options.payFrequency);
    
    // 4. Prepare batch processing data
    const paymentBatch: PayrollBatchItem[] = [];
    
    // 5. Verify compliance if requested
    if (options.verifyCompliance) {
      toast({
        title: "Verifying Compliance",
        description: "Checking regulatory compliance and bank account information...",
      });
      
      // Verify bank accounts for direct deposit
      for (const employee of employees) {
        if (!await BankValidationService.validateEmployeeBankInfo(employee)) {
          toast({
            title: "Bank Validation Failed",
            description: `Invalid bank information for ${employee.firstName} ${employee.lastName}.`,
            variant: "destructive",
          });
        }
      }
    }
    
    // 6. Process each eligible employee
    for (const employee of employees) {
      try {
        // Process time tracking data if available
        let grossPay = 0;
        if (employee.timeTracking) {
          const payRate = parseFloat(employee.payRate);
          if (!isNaN(payRate)) {
            const timeCalculation = TimeTrackingService.calculatePay(
              employee,
              employee.timeTracking,
              payRate
            );
            grossPay = timeCalculation.totalPay;
          } else {
            grossPay = hoursPerPeriod * parseFloat(employee.payRate);
          }
        } else {
          // Use standard calculation if no time tracking data
          grossPay = hoursPerPeriod * parseFloat(employee.payRate);
        }
        
        const processResult = await processEmployeePayroll(
          employee,
          hoursPerPeriod,
          options.payPeriod,
          options.payDate,
          options.payFrequency,
          options.companyInfo,
          options.useDynamicTaxRates
        );
        
        // Add to batch and update totals if processing succeeded
        if (processResult.payStubItem) {
          paymentBatch.push(processResult.payStubItem);
          
          // Update running totals
          result.totalGrossPay += processResult.grossPay;
          result.totalNetPay += processResult.netPay;
          result.totalTaxes += processResult.totalTaxes;
          result.processedEmployees++;
        }
      } catch (error) {
        console.error(`Error processing employee ${employee.id}:`, error);
      }
    }
    
    // 7. Process payments in bulk
    if (paymentBatch.length > 0) {
      const paymentResults = await processBulkPayments(paymentBatch);
      result.successfulPayments = paymentResults.successful;
      result.failedPayments = paymentResults.failed;
    }
    
    // 8. Calculate processing time
    const endTime = Date.now();
    result.processingTime = (endTime - startTime) / 1000; // Convert to seconds
    
    // 9. Determine overall status
    result.status = determinePayrollStatus(result.processedEmployees, result.failedPayments);
    
    // 10. Record payroll run in history
    await recordPayrollRun({
      runDate: new Date().toISOString(),
      payPeriod: options.payPeriod,
      totalAmount: result.totalGrossPay,
      totalEmployees: result.processedEmployees,
      status: result.status === "Failed" ? "Failed" : (result.status === "Partial" ? "Processing" : "Complete")
    });
    
    // 11. Show summary toast
    const employeeText = options.individualEmployeeId ? "individual employee" : `${result.processedEmployees} employees`;
    toast({
      title: `Payroll Run ${result.status}`,
      description: `Processed ${employeeText} with ${result.successfulPayments} successful payments using ${result.taxRateSource} tax rates.`,
      variant: result.status === "Failed" ? "destructive" : (result.status === "Partial" ? "default" : "default"),
    });
    
    return result;
  } catch (error) {
    console.error("Error running payroll:", error);
    toast({
      title: "Payroll Processing Failed",
      description: "There was an error running payroll. Please try again.",
      variant: "destructive",
    });
    
    return {
      totalEmployees: 0,
      processedEmployees: 0,
      totalGrossPay: 0,
      totalNetPay: 0,
      totalTaxes: 0,
      successfulPayments: 0,
      failedPayments: 0,
      payDate: options.payDate,
      processingTime: (Date.now() - startTime) / 1000,
      status: "Failed"
    };
  }
};

/**
 * Create audit trail entry for payroll changes
 */
export const createPayrollAuditEntry = async (
  action: string,
  details: any,
  userId: string
): Promise<boolean> => {
  try {
    // In a real implementation, this would save to database
    console.log("Payroll Audit Trail:", {
      timestamp: new Date().toISOString(),
      action,
      details,
      userId
    });
    
    return true;
  } catch (error) {
    console.error("Failed to create audit entry:", error);
    return false;
  }
};

/**
 * Get payroll tax filing deadlines
 */
export const getTaxFilingDeadlines = (): { name: string; deadline: string; state?: string }[] => {
  const now = new Date();
  const year = now.getFullYear();
  
  return [
    {
      name: "Form 941 (Q1)",
      deadline: `${year}-04-30`
    },
    {
      name: "Form 941 (Q2)",
      deadline: `${year}-07-31`
    },
    {
      name: "Form 941 (Q3)",
      deadline: `${year}-10-31`
    },
    {
      name: "Form 941 (Q4)",
      deadline: `${year+1}-01-31`
    },
    {
      name: "W-2 Distribution",
      deadline: `${year+1}-01-31`
    },
    {
      name: "Form 940",
      deadline: `${year+1}-01-31`
    },
    {
      name: "1099-NEC Distribution",
      deadline: `${year+1}-01-31`
    }
  ];
};
