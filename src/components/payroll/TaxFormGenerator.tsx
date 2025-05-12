import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Description as DescriptionIcon } from '@mui/icons-material';
import { complianceService } from '../../services/payroll/ComplianceService';

interface TaxFormGeneratorProps {
  employeeId: number;
  onFormGenerated?: () => void;
}

const formTypes = [
  { value: 'W2', label: 'W-2 Form' },
  { value: 'W4', label: 'W-4 Form' },
  { value: 'FORM_941', label: 'Form 941' },
  { value: 'FORM_940', label: 'Form 940' },
  { value: 'STATE_TAX', label: 'State Tax Form' },
  { value: 'LOCAL_TAX', label: 'Local Tax Form' },
];

const TaxFormGenerator: React.FC<TaxFormGeneratorProps> = ({
  employeeId,
  onFormGenerated,
}) => {
  const [formType, setFormType] = useState('');
  const [taxYear, setTaxYear] = useState(new Date().getFullYear().toString());
  const [quarter, setQuarter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFormTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormType(event.target.value);
    setError(null);
  };

  const handleTaxYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaxYear(event.target.value);
    setError(null);
  };

  const handleQuarterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuarter(event.target.value);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!formType) {
      setError('Please select a form type');
      return;
    }

    if (!taxYear) {
      setError('Please enter a tax year');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (formType === 'W2') {
        await complianceService.generateW2(employeeId, parseInt(taxYear));
        setSuccess('W-2 form generated successfully');
      } else if (formType === 'FORM_941') {
        if (!quarter) {
          setError('Please select a quarter for Form 941');
          setLoading(false);
          return;
        }
        await complianceService.generateForm941(parseInt(quarter), parseInt(taxYear));
        setSuccess('Form 941 generated successfully');
      }

      if (onFormGenerated) {
        onFormGenerated();
      }
    } catch (error) {
      setError('Error generating form. Please try again.');
      console.error('Error generating tax form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Generate Tax Form
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Form Type</InputLabel>
              <Select
                value={formType}
                label="Form Type"
                onChange={handleFormTypeChange}
                disabled={loading}
              >
                {formTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tax Year"
              type="number"
              value={taxYear}
              onChange={handleTaxYearChange}
              disabled={loading}
              inputProps={{ min: 2000, max: new Date().getFullYear() }}
            />
          </Grid>

          {formType === 'FORM_941' && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Quarter</InputLabel>
                <Select
                  value={quarter}
                  label="Quarter"
                  onChange={handleQuarterChange}
                  disabled={loading}
                >
                  <MenuItem value="1">Q1 (Jan-Mar)</MenuItem>
                  <MenuItem value="2">Q2 (Apr-Jun)</MenuItem>
                  <MenuItem value="3">Q3 (Jul-Sep)</MenuItem>
                  <MenuItem value="4">Q4 (Oct-Dec)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}

          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          {success && (
            <Grid item xs={12}>
              <Alert severity="success">{success}</Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleGenerate}
              disabled={loading || !formType || !taxYear}
              startIcon={loading ? <CircularProgress size={20} /> : <DescriptionIcon />}
              fullWidth
            >
              {loading ? 'Generating...' : 'Generate Form'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaxFormGenerator; 