import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Snackbar,
  Alert,
  Divider
} from '@mui/material';
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
      newErrors.salary = 'Salary must be a valid positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Add employee using the prop function
      addEmployee(formData);
      
      setSnackbarMessage(`Employee "${formData.name}" added successfully!`);
      setOpenSnackbar(true);
      
      // Reset form
      setFormData({
        name: '',
        designation: '',
        location: '',
        salary: ''
      });
      
      // Navigate back to dashboard after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#000000',
            fontWeight: 700,
            textAlign: 'center',
            mb: 1,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          ADD NEW EMPLOYEE
        </Typography>
        <Divider sx={{ bgcolor: '#000000', height: 2 }} />
      </Box>

      <Paper 
        sx={{ 
          p: 4,
          boxShadow: 'none',
          border: '2px solid #000000',
          borderRadius: 0,
          backgroundColor: '#ffffff'
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="FULL NAME"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    backgroundColor: '#ffffff',
                    '& fieldset': {
                      borderColor: '#000000',
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: '#000000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000000',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#666666',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#000000',
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="DESIGNATION"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                error={!!errors.designation}
                helperText={errors.designation}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    backgroundColor: '#ffffff',
                    '& fieldset': {
                      borderColor: '#000000',
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: '#000000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000000',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#666666',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#000000',
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="LOCATION"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={!!errors.location}
                helperText={errors.location}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    backgroundColor: '#ffffff',
                    '& fieldset': {
                      borderColor: '#000000',
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: '#000000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000000',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#666666',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#000000',
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="SALARY"
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                error={!!errors.salary}
                helperText={errors.salary}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    backgroundColor: '#ffffff',
                    '& fieldset': {
                      borderColor: '#000000',
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: '#000000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000000',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#666666',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#000000',
                  },
                }}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#000000',
                color: '#ffffff',
                borderRadius: 0,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                border: '2px solid #000000',
                '&:hover': {
                  backgroundColor: '#333333',
                  borderColor: '#333333'
                },
              }}
            >
              ADD EMPLOYEE
            </Button>
            
            <Button
              type="button"
              onClick={() => navigate('/')}
              variant="outlined"
              sx={{
                color: '#000000',
                backgroundColor: 'transparent',
                borderRadius: 0,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                border: '2px solid #000000',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  borderColor: '#000000'
                },
              }}
            >
              CANCEL
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success"
          sx={{
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: 0,
            '& .MuiAlert-icon': {
              color: '#ffffff'
            }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EmployeeForm;
