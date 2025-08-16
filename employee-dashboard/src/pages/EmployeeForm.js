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
} from '@mui/material';
import {
  Person as PersonIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const EmployeeForm = () => {
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
      // Simulate API call
      console.log('Employee Data:', formData);
      
      setSnackbarMessage('Employee added successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      // Reset form
      setFormData({
        name: '',
        designation: '',
        location: '',
        salary: ''
      });
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
      type: 'text'
    },
    {
      name: 'designation',
      label: 'Designation',
      icon: <WorkIcon />,
      placeholder: 'Enter job designation',
      type: 'text'
    },
    {
      name: 'location',
      label: 'Location',
      icon: <LocationIcon />,
      placeholder: 'Enter work location',
      type: 'text'
    },
    {
      name: 'salary',
      label: 'Salary',
      icon: <MoneyIcon />,
      placeholder: 'Enter salary amount',
      type: 'number'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in={true}>
        <Box>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #fff 30%, #f0f8ff 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                mb: 2
              }}
            >
              Add New Employee
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 400
              }}
            >
              Fill in the details to add a new team member
            </Typography>
          </Box>

          <Zoom in={true} style={{ transitionDelay: '200ms' }}>
            <Card
              sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  p: 3,
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                <WorkIcon sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Employee Registration Form
                </Typography>
              </Box>

              <CardContent sx={{ p: 4 }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    {formFields.map((field, index) => (
                      <Grid item xs={12} sm={6} key={field.name}>
                        <Fade in={true} style={{ transitionDelay: `${(index + 1) * 100}ms` }}>
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
                                  <Box sx={{ color: '#667eea' }}>
                                    {field.icon}
                                  </Box>
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.15)',
                                },
                                '&.Mui-focused': {
                                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.25)',
                                  transform: 'translateY(-2px)',
                                }
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: '#667eea',
                              },
                              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#667eea',
                                borderWidth: 2,
                              }
                            }}
                          />
                        </Fade>
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<SaveIcon />}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                          background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                        }
                      }}
                    >
                      Save Employee
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outlined"
                      size="large"
                      startIcon={<RefreshIcon />}
                      onClick={handleReset}
                      sx={{
                        borderColor: '#667eea',
                        color: '#667eea',
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        borderWidth: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#667eea',
                          background: 'rgba(102, 126, 234, 0.1)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
                        }
                      }}
                    >
                      Reset Form
                    </Button>
                  </Box>
                </form>

                <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(102, 126, 234, 0.05)', borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ color: '#667eea', fontWeight: 600, mb: 1 }}>
                    Form Preview
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4a5568' }}>
                    <strong>Name:</strong> {formData.name || 'Not provided'}<br />
                    <strong>Designation:</strong> {formData.designation || 'Not provided'}<br />
                    <strong>Location:</strong> {formData.location || 'Not provided'}<br />
                    <strong>Salary:</strong> {formData.salary ? `$${formData.salary}` : 'Not provided'}
                  </Typography>
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
