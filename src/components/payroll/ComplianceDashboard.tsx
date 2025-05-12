import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { complianceService, TaxForm, TaxFiling, ComplianceDocument } from '../../services/payroll/ComplianceService';

const ComplianceDashboard: React.FC = () => {
  const [taxForms, setTaxForms] = useState<TaxForm[]>([]);
  const [taxFilings, setTaxFilings] = useState<TaxFiling[]>([]);
  const [complianceDocuments, setComplianceDocuments] = useState<ComplianceDocument[]>([]);
  const [selectedForm, setSelectedForm] = useState<TaxForm | null>(null);
  const [selectedFiling, setSelectedFiling] = useState<TaxFiling | null>(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openFilingDialog, setOpenFilingDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [forms, filings, documents] = await Promise.all([
        complianceService.getEmployeeTaxForms(1), // Replace with actual employee ID
        complianceService.getTaxFilings(),
        complianceService.getEmployeeComplianceDocuments(1), // Replace with actual employee ID
      ]);
      setTaxForms(forms);
      setTaxFilings(filings);
      setComplianceDocuments(documents);
    } catch (error) {
      console.error('Error fetching compliance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewForm = (form: TaxForm) => {
    setSelectedForm(form);
    setOpenFormDialog(true);
  };

  const handleViewFiling = (filing: TaxFiling) => {
    setSelectedFiling(filing);
    setOpenFilingDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setSelectedForm(null);
  };

  const handleCloseFilingDialog = () => {
    setOpenFilingDialog(false);
    setSelectedFiling(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'submitted':
        return 'info';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      case 'amended':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5">Compliance Dashboard</Typography>
            <Button
              startIcon={<RefreshIcon />}
              onClick={fetchData}
              disabled={loading}
            >
              Refresh
            </Button>
          </Box>
        </Grid>

        {/* Tax Forms Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tax Forms
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Form Type</TableCell>
                      <TableCell>Tax Year</TableCell>
                      <TableCell>Quarter</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {taxForms.map((form) => (
                      <TableRow key={form.id}>
                        <TableCell>{form.form_type}</TableCell>
                        <TableCell>{form.tax_year}</TableCell>
                        <TableCell>{form.quarter || 'N/A'}</TableCell>
                        <TableCell>
                          <Chip
                            label={form.status}
                            color={getStatusColor(form.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{new Date(form.due_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleViewForm(form)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton size="small">
                            <DownloadIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Tax Filings Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tax Filings
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Form Type</TableCell>
                      <TableCell>Tax Year</TableCell>
                      <TableCell>Quarter</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Total Amount</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {taxFilings.map((filing) => (
                      <TableRow key={filing.id}>
                        <TableCell>{filing.form_type}</TableCell>
                        <TableCell>{filing.tax_year}</TableCell>
                        <TableCell>{filing.quarter || 'N/A'}</TableCell>
                        <TableCell>
                          <Chip
                            label={filing.status}
                            color={getStatusColor(filing.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>${filing.total_amount.toFixed(2)}</TableCell>
                        <TableCell>{new Date(filing.due_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleViewFiling(filing)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton size="small">
                            <DownloadIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Compliance Documents Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Compliance Documents
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Document Type</TableCell>
                      <TableCell>Verification Status</TableCell>
                      <TableCell>Verification Date</TableCell>
                      <TableCell>Expiration Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {complianceDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>{doc.document_type}</TableCell>
                        <TableCell>
                          <Chip
                            label={doc.verification_status}
                            color={getStatusColor(doc.verification_status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(doc.verification_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {doc.expiration_date
                            ? new Date(doc.expiration_date).toLocaleDateString()
                            : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            href={doc.document_url}
                            target="_blank"
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            href={doc.document_url}
                            download
                          >
                            <DownloadIcon />
                          </IconButton>
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

      {/* Form Details Dialog */}
      <Dialog
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Tax Form Details</DialogTitle>
        <DialogContent>
          {selectedForm && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Form Data:
              </Typography>
              <pre style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(selectedForm.form_data, null, 2)}
              </pre>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFormDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Filing Details Dialog */}
      <Dialog
        open={openFilingDialog}
        onClose={handleCloseFilingDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Tax Filing Details</DialogTitle>
        <DialogContent>
          {selectedFiling && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Filing Data:
              </Typography>
              <pre style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(selectedFiling.form_data, null, 2)}
              </pre>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFilingDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ComplianceDashboard; 