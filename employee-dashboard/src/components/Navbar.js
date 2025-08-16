import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon />, color: '#2563eb' },
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, color: '#7c3aed' },
    { label: 'Add Employee', path: '/employee-form', icon: <PersonAddIcon />, color: '#059669' }
  ];

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            sx={{
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              color: 'white',
              mr: 2,
              p: 1.5,
              '&:hover': {
                background: 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)'
            }}
          >
            <BusinessIcon sx={{ fontSize: 28 }} />
          </IconButton>
          
          <Box>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.025em',
                lineHeight: 1.2
              }}
            >
              Employee Portal
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#94a3b8',
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              Professional Management System
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item, index) => (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              startIcon={item.icon}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: 3,
                background: location.pathname === item.path 
                  ? `linear-gradient(135deg, ${item.color} 0%, ${item.color}CC 100%)` 
                  : 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: location.pathname === item.path 
                  ? `1px solid ${item.color}66` 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: location.pathname === item.path 
                  ? `0 8px 25px ${item.color}40` 
                  : 'none',
                '&:hover': {
                  background: location.pathname === item.path 
                    ? `linear-gradient(135deg, ${item.color} 0%, ${item.color}DD 100%)`
                    : `linear-gradient(135deg, ${item.color}20 0%, ${item.color}10 100%)`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 35px ${item.color}30`,
                  border: `1px solid ${item.color}66`
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transition: 'left 0.5s ease',
                },
                '&:hover::before': {
                  left: '100%',
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
