import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface PayrollRun {
  payroll_id: string;
  start_date: string;
  end_date: string;
  status: string;
  total_gross_pay: number;
  total_deductions: number;
  total_net_pay: number;
}

interface Employee {
  employee_id: string;
  first_name: string;
  last_name: string;
  salary: number;
  status: string;
}

const PayrollDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  useEffect(() => {
    fetchPayrollRuns();
    fetchEmployees();
  }, []);

  const fetchPayrollRuns = async () => {
    try {
      const response = await fetch('/api/payroll/org/current');
      const data = await response.json();
      setPayrollRuns(data);
    } catch (error) {
      console.error('Error fetching payroll runs:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees/org/current');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleRunPayroll = async () => {
    try {
      const response = await fetch('/api/payroll/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start_date: selectedStartDate?.toISOString().split('T')[0],
          end_date: selectedEndDate?.toISOString().split('T')[0],
          employee_ids: selectedEmployees,
        }),
      });

      if (response.ok) {
        setOpenDialog(false);
        fetchPayrollRuns();
      }
    } catch (error) {
      console.error('Error running payroll:', error);
    }
  };

  const handleViewDetails = (payrollId: string) => {
    navigate(`/payroll/${payrollId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4">Payroll Dashboard</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenDialog(true)}
            >
              Run Payroll
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Payroll Runs
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Payroll Period</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Gross Pay</TableCell>
                      <TableCell>Deductions</TableCell>
                      <TableCell>Net Pay</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payrollRuns.map((run) => (
                      <TableRow key={run.payroll_id}>
                        <TableCell>
                          {new Date(run.start_date).toLocaleDateString()} -{' '}
                          {new Date(run.end_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{run.status}</TableCell>
                        <TableCell>${run.total_gross_pay.toFixed(2)}</TableCell>
                        <TableCell>${run.total_deductions.toFixed(2)}</TableCell>
                        <TableCell>${run.total_net_pay.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleViewDetails(run.payroll_id)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Run Payroll</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <DatePicker
                    label="Start Date"
                    value={selectedStartDate}
                    onChange={(date) => setSelectedStartDate(date)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    label="End Date"
                    value={selectedEndDate}
                    onChange={(date) => setSelectedEndDate(date)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Employees"
                    fullWidth
                    SelectProps={{
                      multiple: true,
                      value: selectedEmployees,
                      onChange: (e) => setSelectedEmployees(e.target.value as string[]),
                    }}
                  >
                    {employees.map((employee) => (
                      <MenuItem key={employee.employee_id} value={employee.employee_id}>
                        {employee.first_name} {employee.last_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRunPayroll}
            disabled={!selectedStartDate || !selectedEndDate || selectedEmployees.length === 0}
          >
            Run Payroll
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PayrollDashboard; 