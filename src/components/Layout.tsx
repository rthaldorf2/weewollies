import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  School as SchoolIcon,
  Games as GamesIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Notifications as NotificationsIcon,
  Pets as SheepIcon,
} from '@mui/icons-material';

const allModules = [
  {
    title: 'Home',
    icon: <SheepIcon />,
    path: '/',
    userType: 'all',
  },
  {
    title: 'Portfolios',
    icon: <SchoolIcon />,
    path: '/portfolios',
    userType: 'all',
  },
  {
    title: 'Game Central',
    icon: <GamesIcon />,
    path: '/games',
    userType: 'all',
  },
  {
    title: 'Teacher Dashboard',
    icon: <DashboardIcon />,
    path: '/teacher',
    userType: 'teacher',
  },
  {
    title: 'Parent Portal',
    icon: <PeopleIcon />,
    path: '/parent',
    userType: 'parent',
  },
  {
    title: 'WhatsUP!',
    icon: <NotificationsIcon />,
    path: '/whatsup',
    userType: 'all',
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userType = location.state?.userType;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path, { state: { userType } });
    setDrawerOpen(false);
  };

  // Filter modules based on user type
  const filteredModules = allModules.filter(module => 
    module.userType === 'all' || module.userType === userType
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#4A90E2' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontFamily: '"Comic Sans MS", cursive',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <SheepIcon sx={{ fontSize: 30 }} /> WeeWoolies
            {userType && (
              <Typography 
                component="span" 
                sx={{ 
                  ml: 1,
                  fontSize: '0.9rem',
                  opacity: 0.9,
                }}
              >
                {userType === 'teacher' ? '- Teacher' : '- Parent'}
              </Typography>
            )}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            bgcolor: '#FFFFFF',
            borderRight: '2px solid #BBDEFB',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: '"Comic Sans MS", cursive',
              color: '#2C3E50',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <SheepIcon sx={{ color: '#4A90E2' }} /> Navigation
          </Typography>
          <List>
            {filteredModules.map((module) => (
              <ListItem 
                button 
                key={module.title}
                onClick={() => handleNavigation(module.path)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    bgcolor: '#E3F2FD',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#4A90E2' }}>
                  {module.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={module.title === 'Portfolios' && userType === 'parent' ? 'MyKid!' : module.title}
                  sx={{
                    '& .MuiTypography-root': {
                      fontFamily: '"Comic Sans MS", cursive',
                      color: '#2C3E50',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#F5F5F5' }}>
        {children}
      </Box>
    </Box>
  );
} 