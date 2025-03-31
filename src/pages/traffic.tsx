'use client';

import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Box, TextField, Button, Typography, Container, Paper, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom theme to match the website's style
const theme = createTheme({
  palette: {
    warning: {
      main: '#ffc107',
      dark: '#e5ad06',
    },
    text: {
      primary: '#222222',
      secondary: '#636363',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '&:hover fieldset': {
              borderColor: '#ffc107',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffc107',
            },
          },
          '& label.Mui-focused': {
            color: '#ffc107',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: '8px',
          height: '56px',
          textTransform: 'none',
          fontSize: '16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: '#ffc107',
          color: '#222222',
          '&:hover': {
            backgroundColor: '#e5ad06',
          },
        },
        outlined: {
          borderWidth: '1px',
          borderColor: '#ffc107',
          color: '#ffc107',
          '&:hover': {
            borderWidth: '1px',
            borderColor: '#e5ad06',
            backgroundColor: 'rgba(255, 193, 7, 0.04)',
            color: '#e5ad06',
          },
        },
      },
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0px 10px 40px 0px rgba(0, 0, 0, 0.04)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2.5rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 15px 50px 0px rgba(0, 0, 0, 0.08)',
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface FormData {
  name: string;
  phone: string;
  email: string;
  ticketImage: File | null;
}

interface TicketStatus {
  ticketNumber: string;
  driverLicense: string;
  status: 'pending' | 'in_review' | 'scheduled' | 'completed';
  hearingDate?: string;
  paymentStatus: 'pending' | 'paid' | 'not_required';
  amount?: number;
  lastUpdated: string;
  notes?: string;
}

interface CheckStatusForm {
  ticketNumber: string;
  driverLicense: string;
  email: string;
  phone: string;
}

// Update dummy data with driver's license numbers
const DUMMY_TICKETS: Record<string, TicketStatus> = {
  'TK-2024-001': {
    ticketNumber: 'TK-2024-001',
    driverLicense: 'DL123456',
    status: 'scheduled',
    hearingDate: '2024-04-15 10:00 AM',
    paymentStatus: 'pending',
    amount: 250.00,
    lastUpdated: '2024-03-10',
    notes: 'Hearing scheduled with Judge Smith'
  },
  'TK-2024-002': {
    ticketNumber: 'TK-2024-002',
    driverLicense: 'DL234567',
    status: 'in_review',
    paymentStatus: 'not_required',
    lastUpdated: '2024-03-08',
    notes: 'Under review by legal team'
  },
  'TK-2024-003': {
    ticketNumber: 'TK-2024-003',
    driverLicense: 'DL345678',
    status: 'completed',
    hearingDate: '2024-03-01 09:30 AM',
    paymentStatus: 'paid',
    amount: 150.00,
    lastUpdated: '2024-03-05',
    notes: 'Case dismissed, fine reduced'
  },
  'TK-2024-004': {
    ticketNumber: 'TK-2024-004',
    driverLicense: 'DL456789',
    status: 'pending',
    paymentStatus: 'pending',
    amount: 300.00,
    lastUpdated: '2024-03-12',
    notes: 'Documentation received, awaiting review'
  },
  'TK-2024-005': {
    ticketNumber: 'TK-2024-005',
    driverLicense: 'DL567890',
    status: 'scheduled',
    hearingDate: '2024-05-01 02:30 PM',
    paymentStatus: 'pending',
    amount: 175.00,
    lastUpdated: '2024-03-11',
    notes: 'Court date confirmed, awaiting additional documentation'
  },
  'TK-2024-006': {
    ticketNumber: 'TK-2024-006',
    driverLicense: 'DL678901',
    status: 'completed',
    hearingDate: '2024-02-28 11:00 AM',
    paymentStatus: 'paid',
    amount: 200.00,
    lastUpdated: '2024-03-01',
    notes: 'Ticket reduced, payment completed'
  },
  'TK-2024-007': {
    ticketNumber: 'TK-2024-007',
    driverLicense: 'DL789012',
    status: 'in_review',
    paymentStatus: 'not_required',
    lastUpdated: '2024-03-13',
    notes: 'Evidence under review, potential dismissal'
  }
};

type PageState = 'landing' | 'new-ticket' | 'check-status';

const StatusChip = styled('div')<{ status: TicketStatus['status'] }>(({ status }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 12px',
  borderRadius: '16px',
  fontSize: '14px',
  fontWeight: 600,
  backgroundColor: 
    status === 'completed' ? '#4caf50' :
    status === 'scheduled' ? '#2196f3' :
    status === 'in_review' ? '#ff9800' : '#757575',
  color: '#fff',
}));

const Traffic = () => {
  const [pageState, setPageState] = useState<PageState>('landing');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    ticketImage: null,
  });
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [ticketId, setTicketId] = useState<string>('');
  const [statusFormData, setStatusFormData] = useState<CheckStatusForm>({
    ticketNumber: '',
    driverLicense: '',
    email: '',
    phone: '',
  });
  const [ticketStatus, setTicketStatus] = useState<TicketStatus | null>(null);
  const [showStatus, setShowStatus] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    ticketNumber?: string;
    driverLicense?: string;
    email?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        ticketImage: e.target.files![0],
      }));
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  const handleStatusFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStatusFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user types
    setFormErrors({});
  };

  const validateStatusForm = (): boolean => {
    const errors: { ticketNumber?: string; driverLicense?: string; email?: string; } = {};
    
    if (!statusFormData.driverLicense) {
      errors.driverLicense = 'Driver license number is required';
    }

    if (!statusFormData.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(statusFormData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleTicketLookup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateStatusForm()) {
      return;
    }

    // Simulate API call with dummy data
    if (statusFormData.ticketNumber) {
      const foundTicket = DUMMY_TICKETS[statusFormData.ticketNumber];
      if (foundTicket && foundTicket.driverLicense === statusFormData.driverLicense) {
        setTicketStatus(foundTicket);
        setShowStatus(true);
      } else {
        alert('Ticket not found or driver license does not match. Please check your information and try again.');
      }
    } else {
      alert('Please enter a ticket number to check its status.');
    }
  };

  const renderLandingPage = () => (
    <Container maxWidth="lg">
      <Typography 
        variant="h3" 
        component="h1" 
        align="center"
        sx={{
          color: '#222222',
          fontWeight: 700,
          marginBottom: '4rem',
          fontSize: { xs: '32px', md: '42px' }
        }}
      >
        Traffic Ticket Services
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledPaper onClick={() => setPageState('new-ticket')}>
            <AddCircleOutlineIcon sx={{ fontSize: 64, color: '#ffc107', mb: 3 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#222222' }}>
              Request New Quote
            </Typography>
            <Typography align="center" sx={{ color: '#636363', lineHeight: 1.6 }}>
              Submit your traffic ticket for a free quote and consultation
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper onClick={() => setPageState('check-status')}>
            <SearchIcon sx={{ fontSize: 64, color: '#ffc107', mb: 3 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#222222' }}>
              Check Ticket Status
            </Typography>
            <Typography align="center" sx={{ color: '#636363', lineHeight: 1.6 }}>
              Track the status of your existing ticket submission
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );

  const renderNewTicketForm = () => (
    <Container maxWidth="sm">
      <StyledPaper elevation={0} sx={{ p: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{
            color: '#222222',
            fontSize: '36px',
            fontWeight: 600,
            marginBottom: '40px'
          }}
        >
          Submit Your Ticket
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              required
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              sx={{ backgroundColor: '#fff' }}
            />
            <TextField
              required
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              sx={{ backgroundColor: '#fff' }}
            />
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              sx={{ backgroundColor: '#fff' }}
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ mt: 1 }}
            >
              Upload Ticket Image
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {selectedFileName && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#636363',
                  fontSize: '14px'
                }}
              >
                Selected file: {selectedFileName}
              </Typography>
            )}
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => setPageState('landing')}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </StyledPaper>
    </Container>
  );

  const renderTicketStatus = () => {
    if (!ticketStatus) return null;

    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Ticket Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Status
              </Typography>
              <StatusChip status={ticketStatus.status}>
                {ticketStatus.status.replace('_', ' ').toUpperCase()}
              </StatusChip>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Ticket Number
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {ticketStatus.ticketNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Driver License Number
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {ticketStatus.driverLicense}
            </Typography>
          </Grid>
          {ticketStatus.hearingDate && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Hearing Date
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {ticketStatus.hearingDate}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Payment Status
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 
              ticketStatus.paymentStatus === 'paid' ? '#4caf50' :
              ticketStatus.paymentStatus === 'pending' ? '#ff9800' : '#757575'
            }}>
              {ticketStatus.paymentStatus.replace('_', ' ').toUpperCase()}
            </Typography>
          </Grid>
          {ticketStatus.amount && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Amount
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                ${ticketStatus.amount.toFixed(2)}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Last Updated
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {ticketStatus.lastUpdated}
            </Typography>
          </Grid>
          {ticketStatus.notes && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Notes
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {ticketStatus.notes}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    );
  };

  const renderCheckStatus = () => (
    <Container maxWidth="sm">
      <StyledPaper elevation={0} sx={{ p: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{
            color: '#222222',
            fontSize: '36px',
            fontWeight: 600,
            marginBottom: '40px'
          }}
        >
          Check Ticket Status
        </Typography>
        <form onSubmit={handleTicketLookup}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Ticket Number"
              name="ticketNumber"
              value={statusFormData.ticketNumber}
              onChange={handleStatusFormChange}
              placeholder="e.g., TK-2024-001"
              error={!!formErrors.ticketNumber}
              helperText={formErrors.ticketNumber}
              sx={{ backgroundColor: '#fff' }}
            />
            <TextField
              required
              fullWidth
              label="Driver License Number"
              name="driverLicense"
              value={statusFormData.driverLicense}
              onChange={handleStatusFormChange}
              error={!!formErrors.driverLicense}
              helperText={formErrors.driverLicense}
              sx={{ backgroundColor: '#fff' }}
            />
            <TextField
              required
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={statusFormData.email}
              onChange={handleStatusFormChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              sx={{ backgroundColor: '#fff' }}
            />
            <TextField
              fullWidth
              label="Phone Number (Optional)"
              name="phone"
              value={statusFormData.phone}
              onChange={handleStatusFormChange}
              sx={{ backgroundColor: '#fff' }}
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => {
                  setPageState('landing');
                  setShowStatus(false);
                  setTicketStatus(null);
                  setFormErrors({});
                  setStatusFormData({
                    ticketNumber: '',
                    driverLicense: '',
                    email: '',
                    phone: '',
                  });
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                Check Status
              </Button>
            </Box>
          </Box>
        </form>
        {showStatus && renderTicketStatus()}
      </StyledPaper>
    </Container>
  );

  return (
    <Layout>
      <div className="pt-120 pb-120">
        <ThemeProvider theme={theme}>
          {pageState === 'landing' && renderLandingPage()}
          {pageState === 'new-ticket' && renderNewTicketForm()}
          {pageState === 'check-status' && renderCheckStatus()}
        </ThemeProvider>
      </div>
    </Layout>
  );
};

export default Traffic;
