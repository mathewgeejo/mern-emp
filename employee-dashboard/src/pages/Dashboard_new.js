import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Dashboard = ({ customEmployees, deleteEmployee }) => {
  const [apiEmployees, setApiEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const employees = response.data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email
        }));
        setApiEmployees(employees);
      } catch (err) {
        setError('Failed to fetch employees');
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Combine API employees with custom employees and ensure consistent IDs
  const allEmployees = [
    ...apiEmployees,
    ...customEmployees.map((emp, index) => ({
      ...emp,
      id: apiEmployees.length + index + 1
    }))
  ];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress sx={{ color: '#000000' }} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#666666' }}>
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: '#ffffff' }}>
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
          EMPLOYEE DIRECTORY
        </Typography>
        <Divider sx={{ bgcolor: '#000000', height: 2 }} />
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 'none',
          border: '2px solid #000000',
          borderRadius: 0
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#000000' }}>
              <TableCell 
                sx={{ 
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: 'none'
                }}
              >
                ID
              </TableCell>
              <TableCell 
                sx={{ 
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: 'none'
                }}
              >
                NAME
              </TableCell>
              <TableCell 
                sx={{ 
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: 'none'
                }}
              >
                EMAIL
              </TableCell>
              <TableCell 
                sx={{ 
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: 'none'
                }}
              >
                DESIGNATION
              </TableCell>
              <TableCell 
                sx={{ 
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: 'none'
                }}
              >
                LOCATION
              </TableCell>
              <TableCell 
                sx={{ 
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: 'none'
                }}
              >
                SALARY
              </TableCell>
              <TableCell 
                sx={{ 
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: 'none'
                }}
              >
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allEmployees.map((employee, index) => (
              <TableRow 
                key={employee.id}
                sx={{ 
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f5f5f5',
                  '&:hover': {
                    backgroundColor: '#e0e0e0'
                  }
                }}
              >
                <TableCell 
                  sx={{ 
                    fontWeight: 600,
                    color: '#000000',
                    fontSize: '1rem',
                    borderBottom: '1px solid #e0e0e0'
                  }}
                >
                  {employee.id}
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 600,
                    color: '#000000',
                    fontSize: '1rem',
                    borderBottom: '1px solid #e0e0e0'
                  }}
                >
                  {employee.name}
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: '#666666',
                    fontSize: '0.95rem',
                    borderBottom: '1px solid #e0e0e0'
                  }}
                >
                  {employee.email}
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: '#666666',
                    fontSize: '0.95rem',
                    borderBottom: '1px solid #e0e0e0'
                  }}
                >
                  {employee.designation || '-'}
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: '#666666',
                    fontSize: '0.95rem',
                    borderBottom: '1px solid #e0e0e0'
                  }}
                >
                  {employee.location || '-'}
                </TableCell>
                <TableCell 
                  sx={{ 
                    color: '#666666',
                    fontSize: '0.95rem',
                    borderBottom: '1px solid #e0e0e0'
                  }}
                >
                  {employee.salary || '-'}
                </TableCell>
                <TableCell 
                  sx={{ 
                    borderBottom: '1px solid #e0e0e0'
                  }}
                >
                  {employee.designation && (
                    <IconButton
                      onClick={() => deleteEmployee(employee.id)}
                      sx={{
                        color: '#000000',
                        '&:hover': {
                          backgroundColor: '#f5f5f5'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {allEmployees.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#666666',
              fontWeight: 500
            }}
          >
            No employees found
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
