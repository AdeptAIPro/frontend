import React, { useState, useEffect } from 'react';
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
  Alert,
  MenuItem,
} from '@mui/material';

interface BankAccount {
  account_id: string;
  account_name: string;
  account_type: string;
  last_four: string;
  status: string;
}

interface Payment {
  payment_id: string;
  amount: number;
  status: string;
  type: string;
  recipient: string;
  date: string;
}

const Payments: React.FC = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState('direct_deposit');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBankAccounts();
    fetchPayments();
  }, []);

  const fetchBankAccounts = async () => {
    try {
      const response = await fetch('/api/payments/bank-accounts');
      const data = await response.json();
      setBankAccounts(data);
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/payments');
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleAddBankAccount = async () => {
    try {
      const response = await fetch('/api/payments/bank-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_token: 'plaid_public_token', // This would come from Plaid Link
          account_id: 'plaid_account_id', // This would come from Plaid Link
        }),
      });

      if (response.ok) {
        setSuccess('Bank account added successfully');
        fetchBankAccounts();
      } else {
        setError('Failed to add bank account');
      }
    } catch (error) {
      console.error('Error adding bank account:', error);
      setError('Failed to add bank account');
    }
  };

  const handleMakePayment = async () => {
    try {
      const response = await fetch('/api/payments/direct-deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account_id: selectedAccount,
          amount: parseFloat(amount),
          type: paymentType,
        }),
      });

      if (response.ok) {
        setSuccess('Payment initiated successfully');
        setOpenDialog(false);
        fetchPayments();
      } else {
        setError('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Error making payment:', error);
      setError('Failed to initiate payment');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4">Payments</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenDialog(true)}
            >
              Make Payment
            </Button>
          </Box>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Alert severity="error" onClose={() => setError('')}>
              {error}
            </Alert>
          </Grid>
        )}

        {success && (
          <Grid item xs={12}>
            <Alert severity="success" onClose={() => setSuccess('')}>
              {success}
            </Alert>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bank Accounts
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Account Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Last 4</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bankAccounts.map((account) => (
                      <TableRow key={account.account_id}>
                        <TableCell>{account.account_name}</TableCell>
                        <TableCell>{account.account_type}</TableCell>
                        <TableCell>{account.last_four}</TableCell>
                        <TableCell>{account.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleAddBankAccount}
                >
                  Add Bank Account
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Payments
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.payment_id}>
                        <TableCell>
                          {new Date(payment.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell>${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>{payment.status}</TableCell>
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
        <DialogTitle>Make Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Bank Account"
                  fullWidth
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                >
                  {bankAccounts.map((account) => (
                    <MenuItem key={account.account_id} value={account.account_id}>
                      {account.account_name} - {account.last_four}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Payment Type"
                  fullWidth
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <MenuItem value="direct_deposit">Direct Deposit</MenuItem>
                  <MenuItem value="tax_payment">Tax Payment</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Amount"
                  fullWidth
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleMakePayment}
            disabled={!selectedAccount || !amount}
          >
            Make Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payments; 