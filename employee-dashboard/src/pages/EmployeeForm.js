import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Alert,
  InputAdornment,
  Fade,
  Zoom,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  BusinessCenter as BusinessIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = ({ addEmployee }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: ''
  });
  
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.salary.trim()) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || parseFloat(formData.salary) <= 0) {
      newErrors.salary = 'Please enter a valid salary amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Add employee using the prop function
      addEmployee(formData);
      
      setSnackbarMessage(`Employee "${formData.name}" added successfully! 🎉`);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      // Reset form
      setFormData({
        name: '',
        designation: '',
        location: '',
        salary: ''
      });

      // Navigate to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } else {
      setSnackbarMessage('Please correct the errors in the form');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      designation: '',
      location: '',
      salary: ''
    });
    setErrors({});
  };

  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      icon: <PersonIcon />,
      placeholder: 'Enter employee full name',
      type: 'text',
      color: '#2563eb'
    },
    {
      name: 'designation',
      label: 'Designation',
      icon: <WorkIcon />,
      placeholder: 'Enter job designation',
      type: 'text',
      color: '#7c3aed'
    },
    {
      name: 'location',
      label: 'Location',
      icon: <LocationIcon />,
      placeholder: 'Enter work location',
      type: 'text',
      color: '#059669'
    },
    {
      name: 'salary',
      label: 'Salary',
      icon: <MoneyIcon />,
      placeholder: 'Enter salary amount',
      type: 'number',
      color: '#d97706'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Fade in={true}>
        <Box>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                mb: 2,
                letterSpacing: '-0.025em'
              }}
            >
              Add New Employee
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.85)',
                fontWeight: 400,
                fontSize: '1.2rem',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Fill in the details below to add a new team member to your organization
            </Typography>
          </Box>

          <Zoom in={true} style={{ transitionDelay: '300ms' }}>
            <Card
              className="professional-form"
              sx={{
                borderRadius: 5,
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  p: 4,
                  color: 'white',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, #2563eb20 0%, #7c3aed20 50%, #05966920 100%)',
                    opacity: 0.3
                  }}
                />
                <IconButton
                  sx={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    color: 'white',
                    mb: 2,
                    p: 2,
                    zIndex: 1,
                    position: 'relative',
                    boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: '0 12px 35px rgba(37, 99, 235, 0.6)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <BusinessIcon sx={{ fontSize: 32 }} />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, zIndex: 1, position: 'relative' }}>
                  Employee Registration
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, zIndex: 1, position: 'relative' }}>
                  Professional onboarding form
                </Typography>
              </Box>

              <CardContent sx={{ p: 5 }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                    {formFields.map((field, index) => (
                      <Grid item xs={12} sm={6} key={field.name}>
                        <Fade in={true} style={{ transitionDelay: `${(index + 1) * 150}ms` }}>
                          <TextField
                            fullWidth
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            value={formData[field.name]}
                            onChange={handleChange}
                            error={!!errors[field.name]}
                            helperText={errors[field.name]}
                            placeholder={field.placeholder}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Box sx={{ color: field.color }}>
                                    {field.icon}
                                  </Box>
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                backgroundColor: 'rgba(248, 250, 252, 0.8)',
                                '&:hover': {
                                  boxShadow: `0 4px 20px ${field.color}20`,
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                },
                                '&.Mui-focused': {
                                  boxShadow: `0 8px 25px ${field.color}40`,
                                  transform: 'translateY(-2px)',
                                  backgroundColor: 'rgba(255, 255, 255, 1)',
                                }
                              },
                              '& .MuiInputLabel-root': {
                                fontWeight: 600,
                                '&.Mui-focused': {
                                  color: field.color,
                                }
                              },
                              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: field.color,
                                borderWidth: 2,
                              }
                            }}
                          />
                        </Fade>
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ mt: 5, display: 'flex', gap: 3, justifyContent: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<SaveIcon />}
                      className="professional-button"
                      sx={{
                        background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                        borderRadius: 4,
                        px: 5,
                        py: 2,
                        fontWeight: 700,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        letterSpacing: '0.025em',
                        boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 15px 40px rgba(37, 99, 235, 0.6)',
                          background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                          transition: 'left 0.5s ease',
                        },
                        '&:hover::before': {
                          left: '100%',
                        }
                      }}
                      >
                        <CheckCircleIcon sx={{ mr: 1 }} />
                        Save Employee
                      </Button>                    <Button
                      type="button"
                      variant="outlined"
                      size="large"
                      startIcon={<RefreshIcon />}
                      onClick={handleReset}
                      sx={{
                        borderColor: '#7c3aed',
                        color: '#7c3aed',
                        borderRadius: 4,
                        px: 5,
                        py: 2,
                        fontWeight: 700,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        letterSpacing: '0.025em',
                        borderWidth: 2,
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        '&:hover': {
                          borderColor: '#7c3aed',
                          background: 'rgba(124, 58, 237, 0.1)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 35px rgba(124, 58, 237, 0.3)',
                        }
                      }}
                    >
                      Reset Form
                    </Button>
                  </Box>
                </form>

                <Box sx={{ 
                  mt: 5, 
                  p: 4, 
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)', 
                  borderRadius: 3,
                  border: '1px solid rgba(148, 163, 184, 0.2)'
                }}>
                  <Typography variant="h6" sx={{ 
                    color: '#1e293b', 
                    fontWeight: 700, 
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <BusinessIcon sx={{ color: '#2563eb' }} />
                    Form Preview
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                        <strong style={{ color: '#1e293b' }}>Name:</strong> {formData.name || 'Not provided'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                        <strong style={{ color: '#1e293b' }}>Designation:</strong> {formData.designation || 'Not provided'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                        <strong style={{ color: '#1e293b' }}>Location:</strong> {formData.location || 'Not provided'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                        <strong style={{ color: '#1e293b' }}>Salary:</strong> {formData.salary ? `$${parseInt(formData.salary).toLocaleString()}` : 'Not provided'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Zoom>
        </Box>
      </Fade>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ 
            borderRadius: 2,
            fontWeight: 500
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EmployeeForm;
