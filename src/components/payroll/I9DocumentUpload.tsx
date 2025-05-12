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
} from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';
import { complianceService } from '../../services/payroll/ComplianceService';

interface I9DocumentUploadProps {
  employeeId: number;
  onUploadComplete?: () => void;
}

const documentTypes = [
  { value: 'passport', label: 'U.S. Passport' },
  { value: 'drivers_license', label: 'Driver\'s License' },
  { value: 'state_id', label: 'State ID Card' },
  { value: 'birth_certificate', label: 'Birth Certificate' },
  { value: 'social_security', label: 'Social Security Card' },
  { value: 'permanent_resident', label: 'Permanent Resident Card' },
  { value: 'employment_authorization', label: 'Employment Authorization Document' },
];

const I9DocumentUpload: React.FC<I9DocumentUploadProps> = ({
  employeeId,
  onUploadComplete,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleDocumentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentType(event.target.value);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    if (!documentType) {
      setError('Please select a document type');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await complianceService.processI9Document(
        employeeId,
        documentType,
        selectedFile
      );

      setSuccess('Document uploaded and processed successfully');
      setSelectedFile(null);
      setDocumentType('');
      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (error) {
      setError('Error uploading document. Please try again.');
      console.error('Error uploading I-9 document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload I-9 Document
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Document Type"
              value={documentType}
              onChange={handleDocumentTypeChange}
              disabled={loading}
            >
              {documentTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                border: '2px dashed #ccc',
                borderRadius: 1,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
              component="label"
            >
              <input
                type="file"
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                disabled={loading}
              />
              {selectedFile ? (
                <Typography>{selectedFile.name}</Typography>
              ) : (
                <Box>
                  <UploadIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                  <Typography>
                    Click to select a file or drag and drop
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Supported formats: PDF, JPG, PNG
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

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
              onClick={handleUpload}
              disabled={loading || !selectedFile || !documentType}
              startIcon={loading ? <CircularProgress size={20} /> : <UploadIcon />}
              fullWidth
            >
              {loading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default I9DocumentUpload; 