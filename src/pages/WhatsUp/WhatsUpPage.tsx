import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  CalendarToday as CalendarIcon,
  PhotoCamera as CameraIcon,
  EmojiEvents as TrophyIcon,
  Cake as CakeIcon,
  School as SchoolIcon,
  Star as StarIcon,
  Add as AddIcon,
  Close as CloseIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`whatsup-tabpanel-${index}`}
      aria-labelledby={`whatsup-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'birthday' | 'event';
  description?: string;
  studentName?: string;
}

interface ShowAndTell {
  id: string;
  studentName: string;
  title: string;
  description: string;
  mediaUrl: string;
  date: string;
  likes: number;
}

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  studentName: string;
  date: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: "Emma's Birthday",
    date: '2024-03-20',
    type: 'birthday',
    studentName: 'Emma Thompson',
  },
  {
    id: '2',
    title: 'Spring Show',
    date: '2024-03-25',
    type: 'event',
    description: 'Annual spring performance by our talented students',
  },
  {
    id: '3',
    title: "Liam's Birthday",
    date: '2024-03-28',
    type: 'birthday',
    studentName: 'Liam Johnson',
  },
];

const mockShowAndTell: ShowAndTell[] = [
  {
    id: '1',
    studentName: 'Emma Thompson',
    title: 'My Pet Turtle',
    description: 'This is my pet turtle, Speedy! He loves to eat lettuce.',
    mediaUrl: 'https://example.com/turtle.jpg',
    date: '2024-03-15',
    likes: 12,
  },
  {
    id: '2',
    studentName: 'Liam Johnson',
    title: 'My Art Project',
    description: 'I made this painting of a rainbow!',
    mediaUrl: 'https://example.com/art.jpg',
    date: '2024-03-14',
    likes: 8,
  },
];

const mockBadges: Badge[] = [
  {
    id: '1',
    title: 'Kind Friend',
    description: 'Always helps others and shares with classmates',
    icon: '🤗',
    studentName: 'Emma Thompson',
    date: '2024-03-15',
  },
  {
    id: '2',
    title: 'Math Star',
    description: 'Excellent work in counting and number recognition',
    icon: '⭐',
    studentName: 'Liam Johnson',
    date: '2024-03-14',
  },
];

export default function WhatsUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'parent';
  const [currentTab, setCurrentTab] = useState(0);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [newShowAndTell, setNewShowAndTell] = useState({
    title: '',
    description: '',
    mediaUrl: '',
  });

  const handleHomeClick = () => {
    navigate('/', { state: { userType } });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleUploadClick = () => {
    setShowUploadDialog(true);
  };

  const handleCloseDialog = () => {
    setShowUploadDialog(false);
    setNewShowAndTell({ title: '', description: '', mediaUrl: '' });
  };

  const handleSubmitShowAndTell = () => {
    // TODO: Implement show and tell submission
    handleCloseDialog();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 4,
          bgcolor: '#E3F2FD',
          border: '1px solid #BBDEFB',
        }}
      >
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            component="button"
            variant="body1"
            onClick={handleHomeClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#4A90E2',
              textDecoration: 'none',
              fontFamily: '"Comic Sans MS", cursive',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
            Home
          </Link>
          <Typography 
            color="text.primary"
            sx={{ 
              fontFamily: '"Comic Sans MS", cursive',
              color: '#2C3E50',
            }}
          >
            WhatsUp!
          </Typography>
        </Breadcrumbs>
      </Paper>

      <Paper sx={{ borderRadius: 4 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '1.1rem',
              py: 2,
            },
          }}
        >
          <Tab icon={<CalendarIcon />} label="Calendar" />
          <Tab icon={<CameraIcon />} label="Show & Tell" />
          <Tab icon={<TrophyIcon />} label="Recognition" />
        </Tabs>

        <TabPanel value={currentTab} index={0}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: '"Comic Sans MS", cursive',
                color: '#2C3E50',
                mb: 2,
              }}
            >
              Upcoming Events
            </Typography>
            <Grid container spacing={3}>
              {mockEvents.map((event) => (
                <Grid item xs={12} md={4} key={event.id}>
                  <Card 
                    sx={{ 
                      borderRadius: 4,
                      border: '2px solid #BBDEFB',
                      height: '100%',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {event.type === 'birthday' ? (
                          <CakeIcon sx={{ fontSize: 40, color: '#4A90E2', mr: 2 }} />
                        ) : (
                          <SchoolIcon sx={{ fontSize: 40, color: '#4A90E2', mr: 2 }} />
                        )}
                        <Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontFamily: '"Comic Sans MS", cursive',
                              color: '#2C3E50',
                            }}
                          >
                            {event.title}
                          </Typography>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              fontFamily: '"Comic Sans MS", cursive',
                              color: '#666',
                            }}
                          >
                            {event.date}
                          </Typography>
                        </Box>
                      </Box>
                      {event.studentName && (
                        <Chip
                          label={event.studentName}
                          size="small"
                          sx={{ 
                            bgcolor: '#E3F2FD',
                            fontFamily: '"Comic Sans MS", cursive',
                          }}
                        />
                      )}
                      {event.description && (
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontFamily: '"Comic Sans MS", cursive',
                            color: '#666',
                            mt: 1,
                          }}
                        >
                          {event.description}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontFamily: '"Comic Sans MS", cursive',
                  color: '#2C3E50',
                }}
              >
                Show & Tell Gallery
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleUploadClick}
                sx={{
                  bgcolor: '#4A90E2',
                  '&:hover': { bgcolor: '#64B5F6' },
                  fontFamily: '"Comic Sans MS", cursive',
                }}
              >
                Share Something
              </Button>
            </Box>
            <Grid container spacing={3}>
              {mockShowAndTell.map((item) => (
                <Grid item xs={12} md={6} key={item.id}>
                  <Card 
                    sx={{ 
                      borderRadius: 4,
                      border: '2px solid #BBDEFB',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ mb: 2 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontFamily: '"Comic Sans MS", cursive',
                            color: '#2C3E50',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            fontFamily: '"Comic Sans MS", cursive',
                            color: '#666',
                          }}
                        >
                          Shared by {item.studentName} on {item.date}
                        </Typography>
                      </Box>
                      <Box 
                        sx={{ 
                          width: '100%',
                          height: 200,
                          bgcolor: '#E3F2FD',
                          borderRadius: 2,
                          mb: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CameraIcon sx={{ fontSize: 60, color: '#4A90E2' }} />
                      </Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontFamily: '"Comic Sans MS", cursive',
                          mb: 2,
                        }}
                      >
                        {item.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton size="small">
                          <StarIcon sx={{ color: '#4A90E2' }} />
                        </IconButton>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontFamily: '"Comic Sans MS", cursive',
                            color: '#666',
                          }}
                        >
                          {item.likes} likes
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: '"Comic Sans MS", cursive',
                color: '#2C3E50',
                mb: 2,
              }}
            >
              Recognition Badges
            </Typography>
            <Grid container spacing={3}>
              {mockBadges.map((badge) => (
                <Grid item xs={12} md={4} key={badge.id}>
                  <Card 
                    sx={{ 
                      borderRadius: 4,
                      border: '2px solid #BBDEFB',
                      height: '100%',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography 
                          variant="h2" 
                          sx={{ 
                            fontFamily: '"Comic Sans MS", cursive',
                            mr: 2,
                          }}
                        >
                          {badge.icon}
                        </Typography>
                        <Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontFamily: '"Comic Sans MS", cursive',
                              color: '#2C3E50',
                            }}
                          >
                            {badge.title}
                          </Typography>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              fontFamily: '"Comic Sans MS", cursive',
                              color: '#666',
                            }}
                          >
                            Awarded to {badge.studentName}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontFamily: '"Comic Sans MS", cursive',
                          color: '#666',
                        }}
                      >
                        {badge.description}
                      </Typography>
                      <Chip
                        label={`Awarded on ${badge.date}`}
                        size="small"
                        sx={{ 
                          mt: 2,
                          bgcolor: '#E3F2FD',
                          fontFamily: '"Comic Sans MS", cursive',
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>
      </Paper>

      <Dialog 
        open={showUploadDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontFamily: '"Comic Sans MS", cursive' }}>
          Share Something New
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              value={newShowAndTell.title}
              onChange={(e) => setNewShowAndTell({ ...newShowAndTell, title: e.target.value })}
              sx={{ mb: 2, '& .MuiInputLabel-root': { fontFamily: '"Comic Sans MS", cursive' } }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={newShowAndTell.description}
              onChange={(e) => setNewShowAndTell({ ...newShowAndTell, description: e.target.value })}
              sx={{ mb: 2, '& .MuiInputLabel-root': { fontFamily: '"Comic Sans MS", cursive' } }}
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
              fullWidth
              sx={{ 
                mb: 2,
                fontFamily: '"Comic Sans MS", cursive',
                borderColor: '#4A90E2',
                color: '#4A90E2',
                '&:hover': {
                  borderColor: '#64B5F6',
                  bgcolor: '#E3F2FD',
                },
              }}
            >
              Upload Photo/Video
              <input type="file" hidden accept="image/*,video/*" />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog}
            sx={{ fontFamily: '"Comic Sans MS", cursive' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitShowAndTell}
            variant="contained"
            sx={{
              bgcolor: '#4A90E2',
              '&:hover': { bgcolor: '#64B5F6' },
              fontFamily: '"Comic Sans MS", cursive',
            }}
          >
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 