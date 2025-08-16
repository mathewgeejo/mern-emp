import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Avatar,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  TableChart as TableChartIcon,
} from '@mui/icons-material';
import axios from 'axios';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('cards'); // 'cards', 'list', 'table'

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  const getRandomColor = (index) => {
    const colors = [
      'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
      'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
      'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
      'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
      'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
      'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
      'linear-gradient(135deg, #be123c 0%, #f43f5e 100%)',
      'linear-gradient(135deg, #365314 0%, #65a30d 100%)',
      'linear-gradient(135deg, #581c87 0%, #a21caf 100%)',
    ];
    return colors[index % colors.length];
  };

  const renderCardView = () => (
    <Grid container spacing={3}>
      {employees.map((employee, index) => (
        <Grid item xs={12} sm={6} md={4} key={employee.id}>
          <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
            <Card
              className="hover-lift professional-card"
              sx={{
                borderRadius: 5,
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: getRandomColor(index),
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                },
                '&:hover': {
                  transform: 'translateY(-12px) scale(1.02)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                  '&::before': {
                    opacity: 1
                  }
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      background: getRandomColor(index),
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      mr: 2.5,
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                      border: '3px solid rgba(255, 255, 255, 0.9)'
                    }}
                  >
                    {employee.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        color: '#1e293b',
                        mb: 0.5,
                        fontSize: '1.25rem'
                      }}
                    >
                      {employee.name}
                    </Typography>
                    <Chip
                      label={`ID: ${employee.id}`}
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        '& .MuiChip-label': {
                          px: 1.5
                        }
                      }}
                    />
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                  <EmailIcon sx={{ color: '#2563eb', mr: 1.5, fontSize: '1.2rem' }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#64748b',
                      fontWeight: 500,
                      fontSize: '0.95rem'
                    }}
                  >
                    {employee.email}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Zoom>
        </Grid>
      ))}
    </Grid>
  );

  const renderListView = () => (
    <Box>
      {employees.map((employee, index) => (
        <Fade in={true} key={employee.id} style={{ transitionDelay: `${index * 50}ms` }}>
          <Card
            className="hover-lift professional-card"
            sx={{
              mb: 3,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: getRandomColor(index),
                opacity: 0,
                transition: 'opacity 0.3s ease'
              },
              '&:hover': {
                transform: 'translateX(12px) translateY(-4px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                '&::before': {
                  opacity: 1
                }
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      background: getRandomColor(index),
                      mr: 3,
                      fontWeight: 700,
                      fontSize: '1.3rem',
                      border: '3px solid rgba(255, 255, 255, 0.9)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    {employee.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '1.2rem' }}>
                      {employee.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5, fontSize: '0.95rem' }}>
                      {employee.email}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={`ID: ${employee.id}`}
                  sx={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.8rem'
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Fade>
      ))}
    </Box>
  );

  const renderTableView = () => (
    <TableContainer
      component={Paper}
      className="professional-table"
      sx={{
        borderRadius: 5,
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              '& th': {
                color: 'white',
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: '0.025em',
                py: 3
              }
            }}
          >
            <TableCell>ID</TableCell>
            <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow
              key={employee.id}
              sx={{
                '&:nth-of-type(odd)': {
                  backgroundColor: 'rgba(37, 99, 235, 0.03)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.08)',
                  transform: 'scale(1.005)',
                },
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              <TableCell>
                <Chip
                  label={employee.id}
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.8rem'
                  }}
                />
              </TableCell>
              <TableCell>
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                    background: getRandomColor(index),
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    border: '2px solid rgba(255, 255, 255, 0.9)'
                  }}
                >
                  {employee.name.charAt(0)}
                </Avatar>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1e293b', fontSize: '1rem' }}>
                {employee.name}
              </TableCell>
              <TableCell sx={{ color: '#64748b', fontSize: '0.95rem' }}>
                {employee.email}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress 
              size={60} 
              sx={{ 
                color: '#667eea',
                mb: 2
              }} 
            />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
              Loading employees...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
              Employee Dashboard
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 400,
                mb: 3
              }}
            >
              Manage and view all employees in your organization
            </Typography>
            
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewChange}
              sx={{
                '& .MuiToggleButton-root': {
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '&.Mui-selected': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                  },
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                  }
                }
              }}
            >
              <ToggleButton value="cards">
                <ViewModuleIcon sx={{ mr: 1 }} />
                Cards
              </ToggleButton>
              <ToggleButton value="list">
                <ViewListIcon sx={{ mr: 1 }} />
                List
              </ToggleButton>
              <ToggleButton value="table">
                <TableChartIcon sx={{ mr: 1 }} />
                Table
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box className="fade-in-up">
            {viewMode === 'cards' && renderCardView()}
            {viewMode === 'list' && renderListView()}
            {viewMode === 'table' && renderTableView()}
          </Box>
        </Box>
      </Fade>
    </Container>
  );
};

export default Dashboard;
