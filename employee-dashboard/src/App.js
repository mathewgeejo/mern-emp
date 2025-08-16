import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import EmployeeForm from './pages/EmployeeForm';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#666666',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#000000',
    },
    h6: {
      fontWeight: 500,
      color: '#000000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 0,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
        },
      },
    },
  },
});

function App() {
  // State to store custom employees added through the form
  const [customEmployees, setCustomEmployees] = useState([]);

  // Load employees from localStorage on app start
  useEffect(() => {
    const savedEmployees = localStorage.getItem('customEmployees');
    if (savedEmployees) {
      setCustomEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  // Function to add new employee
  const addEmployee = (employeeData) => {
    const newEmployee = {
      id: customEmployees.length + 11, // Start after API employees (1-10)
      name: employeeData.name,
      email: `${employeeData.name.toLowerCase().replace(/\s+/g, '.')}@company.com`,
      designation: employeeData.designation,
      location: employeeData.location,
      salary: employeeData.salary
    };
    
    const updatedEmployees = [...customEmployees, newEmployee];
    setCustomEmployees(updatedEmployees);
    
    // Save to localStorage for persistence
    localStorage.setItem('customEmployees', JSON.stringify(updatedEmployees));
    
    return newEmployee;
  };

  // Function to delete an employee
  const deleteEmployee = (employeeId) => {
    const updatedEmployees = customEmployees.filter(emp => emp.id !== employeeId);
    setCustomEmployees(updatedEmployees);
    localStorage.setItem('customEmployees', JSON.stringify(updatedEmployees));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route 
                path="/" 
                element={<Dashboard customEmployees={customEmployees} deleteEmployee={deleteEmployee} />} 
              />
              <Route 
                path="/dashboard" 
                element={<Dashboard customEmployees={customEmployees} deleteEmployee={deleteEmployee} />} 
              />
              <Route 
                path="/employee-form" 
                element={<EmployeeForm addEmployee={addEmployee} />} 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
