import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#ffffff',
        borderBottom: '2px solid #000000',
        boxShadow: 'none'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#000000',
            fontWeight: 700,
            fontSize: '1.5rem',
            letterSpacing: '-0.025em'
          }}
        >
          EMPLOYEE MANAGEMENT
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 0 }}>
          <Button
            onClick={() => navigate('/')}
            sx={{
              color: location.pathname === '/' ? '#ffffff' : '#000000',
              backgroundColor: location.pathname === '/' ? '#000000' : 'transparent',
              borderRadius: 0,
              px: 3,
              py: 1,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              border: '2px solid #000000',
              '&:hover': {
                backgroundColor: location.pathname === '/' ? '#000000' : '#f5f5f5',
              },
            }}
          >
            DASHBOARD
          </Button>
          <Button
            onClick={() => navigate('/employee-form')}
            sx={{
              color: location.pathname === '/employee-form' ? '#ffffff' : '#000000',
              backgroundColor: location.pathname === '/employee-form' ? '#000000' : 'transparent',
              borderRadius: 0,
              px: 3,
              py: 1,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              border: '2px solid #000000',
              borderLeft: 'none',
              '&:hover': {
                backgroundColor: location.pathname === '/employee-form' ? '#000000' : '#f5f5f5',
              },
            }}
          >
            ADD EMPLOYEE
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
