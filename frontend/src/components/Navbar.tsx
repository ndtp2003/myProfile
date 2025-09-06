import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Language,
  AdminPanelSettings,
  Logout,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../store/themeStore';
import { useLanguageStore } from '../store/languageStore';
import { useAuthStore } from '../store/authStore';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { language, toggleLanguage } = useLanguageStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleMenuClose();
  };

  const handleAdminLogin = () => {
    navigate('/admin/login');
  };

  const handleAdminDashboard = () => {
    navigate('/admin');
    handleMenuClose();
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          CV Portfolio
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Theme Toggle */}
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {/* Language Toggle */}
          <IconButton onClick={toggleLanguage} color="inherit">
            <Language />
          </IconButton>
          <Typography variant="body2" sx={{ minWidth: 30 }}>
            {language.toUpperCase()}
          </Typography>

          {/* Admin Section */}
          {isAuthenticated ? (
            <>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user?.email?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleAdminDashboard}>
                  <AdminPanelSettings sx={{ mr: 1 }} />
                  {t('adminDashboard')}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} />
                  {t('logout')}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={handleAdminLogin}
              startIcon={<AdminPanelSettings />}
            >
              {t('admin')}
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
