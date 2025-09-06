import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { useThemeStore } from './store/themeStore';
import { useLanguageStore } from './store/languageStore';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isDarkMode } = useThemeStore();
  const { language } = useLanguageStore();

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
        transition: 'background-color 0.3s ease'
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Box>
  );
}

export default App;
