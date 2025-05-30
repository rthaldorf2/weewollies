import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActionArea,
  AppBar,
  Toolbar,
  InputAdornment,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
} from '@mui/material';
import {
  School as SchoolIcon,
  Games as GamesIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Notifications as NotificationsIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  EmojiEvents as EmojiEventsIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  Pets as SheepIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

interface Module {
  title: string;
  icon: React.ReactNode;
  description: string;
  path: string;
  userType: 'all' | 'parent' | 'teacher';
}

const colors = {
  primary: '#4A90E2',      // Calming blue
  secondary: '#FFB74D',    // Warm orange
  accent: '#81C784',       // Soft green
  background: '#E3F2FD',   // Light blue background
  cardBg: '#FFFFFF',       // White
  text: '#2C3E50',         // Dark blue-gray
  border: '#BBDEFB',       // Light blue border
  hover: '#64B5F6',        // Lighter blue for hover states
};

const modules: Module[] = [
  {
    title: 'Portfolios',
    icon: <SheepIcon sx={{ fontSize: 40, color: colors.primary }} />,
    description: 'View and manage student portfolios',
    path: '/portfolios',
    userType: 'all',
  },
  {
    title: 'Game Central',
    icon: <GamesIcon sx={{ fontSize: 40, color: colors.primary }} />,
    description: 'Educational games and activities',
    path: '/games',
    userType: 'all',
  },
  {
    title: 'Teacher Dashboard',
    icon: <DashboardIcon sx={{ fontSize: 40, color: colors.primary }} />,
    description: 'Teacher tools and resources',
    path: '/teacher',
    userType: 'teacher',
  },
  {
    title: 'Parent Portal',
    icon: <PeopleIcon sx={{ fontSize: 40, color: colors.primary }} />,
    description: 'Parent resources and updates',
    path: '/parent',
    userType: 'parent',
  },
  {
    title: 'WhatsUP!',
    icon: <NotificationsIcon sx={{ fontSize: 40, color: colors.primary }} />,
    description: 'Latest news and updates',
    path: '/whatsup',
    userType: 'all',
  },
];

const announcements = [
  {
    title: 'Welcome Back!',
    content: 'School starts on September 1st. Get ready for an exciting year!',
    date: '2024-08-25',
    icon: <SheepIcon sx={{ color: colors.primary, fontSize: 40 }} />,
  },
  {
    title: 'Parent-Teacher Conference',
    content: 'Sign up for our upcoming parent-teacher conferences.',
    date: '2024-08-28',
    icon: <StarIcon sx={{ color: colors.primary, fontSize: 40 }} />,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'parent' | 'teacher' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if we have user type in navigation state
    if (location.state?.userType) {
      setUserType(location.state.userType);
      setIsLoggedIn(true);
    }
  }, [location.state]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase().includes('teacher')) {
      setUserType('teacher');
    } else if (username.toLowerCase().includes('parent')) {
      setUserType('parent');
    } else {
      setUserType('parent');
    }
    setIsLoggedIn(true);
  };

  const handleNavigation = (path: string) => {
    navigate(path, { state: { userType } });
  };

  const filteredModules = modules.filter(module => 
    module.userType === 'all' || module.userType === userType
  );

  const getWelcomeTitle = () => {
    if (!isLoggedIn) return 'Welcome to WeeWoolies! 🐑';
    return `Welcome to WeeWoolies${userType === 'teacher' ? ' - Teacher' : ' - Parent'}! 🐑`;
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: colors.background }}>
      <AppBar position="static" sx={{ bgcolor: colors.primary }}>
        <Toolbar>
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
            {isLoggedIn && (
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
          {isLoggedIn ? (
            <Button 
              color="inherit" 
              onClick={() => {
                setIsLoggedIn(false);
                setUserType(null);
              }}
              sx={{ fontFamily: '"Comic Sans MS", cursive' }}
            >
              Logout
            </Button>
          ) : (
            <Button color="inherit" sx={{ fontFamily: '"Comic Sans MS", cursive' }}>Login</Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {!isLoggedIn ? (
          <Paper 
            sx={{ 
              p: 4, 
              maxWidth: 400, 
              mx: 'auto', 
              mt: 4,
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              bgcolor: colors.cardBg,
              border: `2px solid ${colors.border}`,
            }}
          >
            <Typography 
              variant="h5" 
              component="h1" 
              gutterBottom 
              sx={{ 
                textAlign: 'center',
                color: colors.text,
                fontFamily: '"Comic Sans MS", cursive',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              {getWelcomeTitle()}
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                sx={{ 
                  '& .MuiInputLabel-root': { 
                    fontFamily: '"Comic Sans MS", cursive',
                    color: colors.text,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiInputLabel-root': { 
                    fontFamily: '"Comic Sans MS", cursive',
                    color: colors.text,
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: colors.primary,
                  '&:hover': {
                    bgcolor: colors.hover,
                  },
                  fontFamily: '"Comic Sans MS", cursive',
                }}
              >
                Login
              </Button>
            </form>
          </Paper>
        ) : (
          <>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              sx={{ 
                textAlign: 'center',
                color: colors.text,
                fontFamily: '"Comic Sans MS", cursive',
                fontWeight: 'bold',
                mb: 4,
              }}
            >
              {getWelcomeTitle()}
            </Typography>
            <Grid container spacing={3}>
              {filteredModules.map((module) => (
                <Grid item xs={12} sm={6} md={4} key={module.title}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      borderRadius: 4,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      bgcolor: colors.cardBg,
                      border: `2px solid ${colors.border}`,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 25px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <CardActionArea 
                      onClick={() => handleNavigation(module.path)}
                      sx={{ height: '100%' }}
                    >
                      <CardContent>
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center',
                          textAlign: 'center',
                          p: 2,
                        }}>
                          {module.icon}
                          <Typography 
                            variant="h6" 
                            component="h2" 
                            sx={{ 
                              mt: 2,
                              color: colors.text,
                              fontFamily: '"Comic Sans MS", cursive',
                              fontWeight: 'bold',
                            }}
                          >
                            {module.title === 'Portfolios' && userType === 'parent' ? 'MyKid!' : module.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              mt: 1,
                              color: colors.text,
                              opacity: 0.8,
                              fontFamily: '"Comic Sans MS", cursive',
                            }}
                          >
                            {module.description}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 6 }}>
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  color: colors.text,
                  fontFamily: '"Comic Sans MS", cursive',
                  fontWeight: 'bold',
                  mb: 3,
                }}
              >
                Announcements
              </Typography>
              <Grid container spacing={3}>
                {announcements.map((announcement, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper 
                      sx={{ 
                        p: 3,
                        borderRadius: 4,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        bgcolor: colors.cardBg,
                        border: `2px solid ${colors.border}`,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {announcement.icon}
                        <Box sx={{ ml: 2 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: colors.text,
                              fontFamily: '"Comic Sans MS", cursive',
                              fontWeight: 'bold',
                            }}
                          >
                            {announcement.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: colors.text,
                              opacity: 0.8,
                              fontFamily: '"Comic Sans MS", cursive',
                            }}
                          >
                            {announcement.date}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: colors.text,
                          fontFamily: '"Comic Sans MS", cursive',
                        }}
                      >
                        {announcement.content}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
} 