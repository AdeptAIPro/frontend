import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import ComplianceDashboard from '../components/payroll/ComplianceDashboard';
import I9DocumentUpload from '../components/payroll/I9DocumentUpload';
import TaxFormGenerator from '../components/payroll/TaxFormGenerator';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`compliance-tabpanel-${index}`}
      aria-labelledby={`compliance-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CompliancePage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [employeeId] = useState(1); // Replace with actual employee ID from context/auth

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFormGenerated = () => {
    // Refresh the dashboard data
    setTabValue(0);
  };

  const handleDocumentUploaded = () => {
    // Refresh the dashboard data
    setTabValue(0);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Compliance Management
        </Typography>

        <Paper sx={{ width: '100%', mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Dashboard" />
            <Tab label="Generate Forms" />
            <Tab label="Upload Documents" />
          </Tabs>
        </Paper>

        <TabPanel value={tabValue} index={0}>
          <ComplianceDashboard />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TaxFormGenerator
                employeeId={employeeId}
                onFormGenerated={handleFormGenerated}
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <I9DocumentUpload
                employeeId={employeeId}
                onUploadComplete={handleDocumentUploaded}
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default CompliancePage; 