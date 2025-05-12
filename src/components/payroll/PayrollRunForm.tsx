import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface PayrollRunFormProps {
  employees?: any[];
  onSubmit?: (data: any) => Promise<void>;
  onPayrollRun?: () => void;
}

const PayrollRunForm = React.memo(({ employees = [], onSubmit, onPayrollRun }: PayrollRunFormProps) => {
  const methods = useForm({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      employeeType: 'W2',
      payType: 'hourly',
    }
  });

  const handleSubmit = async (data: any) => {
    if (onSubmit) {
      await onSubmit(data);
    }
    if (onPayrollRun) {
      onPayrollRun();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel>Date</FormLabel>
          <FormControl>
            <input
              type="date"
              {...methods.register("date")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel>Employee Type</FormLabel>
          <FormControl>
            <select
              {...methods.register("employeeType")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="W2">W2</option>
              <option value="contractor">Contractor</option>
              <option value="perDiem">Per Diem</option>
            </select>
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel>Pay Type</FormLabel>
          <FormControl>
            <select
              {...methods.register("payType")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="hourly">Hourly</option>
              <option value="salary">Salary</option>
            </select>
          </FormControl>
        </FormItem>
        <Button type="submit">Submit Payroll Run</Button>
      </form>
    </FormProvider>
  );
});

PayrollRunForm.displayName = 'PayrollRunForm';

export default PayrollRunForm;
