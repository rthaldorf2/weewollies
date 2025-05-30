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
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Send as SendIcon,
  Translate as TranslateIcon,
  EmojiEvents as TrophyIcon,
  School as SchoolIcon,
  Message as MessageIcon,
  Lightbulb as LightbulbIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
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
      id={`parent-tabpanel-${index}`}
      aria-labelledby={`parent-tab-${index}`}
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

interface WeeklySummary {
  date: string;
  learningGoals: {
    title: string;
    status: 'achieved' | 'in_progress' | 'not_started';
  }[];
  behaviorNotes: string[];
  highlights: string[];
}

interface Message {
  id: string;
  from: string;
  content: string;
  timestamp: string;
  translated?: boolean;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  category: 'reading' | 'math' | 'art' | 'science';
  duration: string;
  materials: string[];
  relatedTo: string;
}

const mockWeeklySummary: WeeklySummary = {
  date: 'March 11-15, 2024',
  learningGoals: [
    { title: 'Letter Recognition (A-E)', status: 'achieved' },
    { title: 'Counting to 10', status: 'achieved' },
    { title: 'Sharing with Peers', status: 'in_progress' },
  ],
  behaviorNotes: [
    'Great participation in group activities',
    'Showed kindness by helping a friend',
    'Working on raising hand before speaking',
  ],
  highlights: [
    'Created a beautiful art project',
    'Read first complete sentence',
    'Led the morning circle time',
  ],
};

const mockMessages: Message[] = [
  {
    id: '1',
    from: 'Ms. Johnson',
    content: 'Emma had a wonderful day today! She showed great enthusiasm in our art project.',
    timestamp: '2024-03-15 2:30 PM',
  },
  {
    id: '2',
    from: 'School Nurse',
    content: 'Reminder: Please bring updated immunization records.',
    timestamp: '2024-03-14 10:15 AM',
  },
];

const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Letter Hunt',
    description: 'Find objects around the house that start with letters A-E',
    category: 'reading',
    duration: '15-20 minutes',
    materials: ['Paper', 'Pencil', 'Objects around the house'],
    relatedTo: 'Letter Recognition (A-E)',
  },
  {
    id: '2',
    title: 'Counting Collection',
    description: 'Collect and count small items (buttons, coins, etc.)',
    category: 'math',
    duration: '10-15 minutes',
    materials: ['Small items', 'Counting mat (optional)'],
    relatedTo: 'Counting to 10',
  },
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'zh', name: '中文' },
];

export default function ParentPortal() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'parent';
  const [currentTab, setCurrentTab] = useState(0);
  const [message, setMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleHomeClick = () => {
    navigate('/', { state: { userType } });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleSendMessage = () => {
    // TODO: Implement message sending
    setMessage('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'achieved':
        return <CheckCircleIcon sx={{ color: '#81C784' }} />;
      case 'in_progress':
        return <WarningIcon sx={{ color: '#FFB74D' }} />;
      case 'not_started':
        return <StarIcon sx={{ color: '#E3F2FD' }} />;
      default:
        return null;
    }
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
            Parent Portal
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
          <Tab icon={<SchoolIcon />} label="Weekly Summary" />
          <Tab icon={<MessageIcon />} label="Messages" />
          <Tab icon={<LightbulbIcon />} label="At-Home Activities" />
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
              Week of {mockWeeklySummary.date}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 4, border: '2px solid #BBDEFB' }}>
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: '"Comic Sans MS", cursive',
                        color: '#2C3E50',
                        mb: 2,
                      }}
                    >
                      Learning Goals
                    </Typography>
                    <List>
                      {mockWeeklySummary.learningGoals.map((goal, index) => (
                        <ListItem key={index}>
                          <ListItemAvatar>
                            {getStatusIcon(goal.status)}
                          </ListItemAvatar>
                          <ListItemText 
                            primary={goal.title}
                            primaryTypographyProps={{
                              fontFamily: '"Comic Sans MS", cursive',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 4, border: '2px solid #BBDEFB' }}>
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: '"Comic Sans MS", cursive',
                        color: '#2C3E50',
                        mb: 2,
                      }}
                    >
                      Behavior Notes
                    </Typography>
                    <List>
                      {mockWeeklySummary.behaviorNotes.map((note, index) => (
                        <ListItem key={index}>
                          <ListItemText 
                            primary={note}
                            primaryTypographyProps={{
                              fontFamily: '"Comic Sans MS", cursive',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 4, border: '2px solid #BBDEFB' }}>
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: '"Comic Sans MS", cursive',
                        color: '#2C3E50',
                        mb: 2,
                      }}
                    >
                      Highlights
                    </Typography>
                    <List>
                      {mockWeeklySummary.highlights.map((highlight, index) => (
                        <ListItem key={index}>
                          <ListItemAvatar>
                            <TrophyIcon sx={{ color: '#4A90E2' }} />
                          </ListItemAvatar>
                          <ListItemText 
                            primary={highlight}
                            primaryTypographyProps={{
                              fontFamily: '"Comic Sans MS", cursive',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: '"Comic Sans MS", cursive',
                color: '#2C3E50',
                mb: 2,
              }}
            >
              Messages
            </Typography>
            <Box sx={{ mb: 3 }}>
              <TextField
                select
                label="Language"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                sx={{ 
                  mb: 2,
                  width: 200,
                  '& .MuiInputLabel-root': {
                    fontFamily: '"Comic Sans MS", cursive',
                  },
                }}
              >
                {languages.map((language) => (
                  <MenuItem key={language.code} value={language.code}>
                    {language.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ 
                  mb: 2,
                  '& .MuiInputLabel-root': {
                    fontFamily: '"Comic Sans MS", cursive',
                  },
                }}
              />
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
                sx={{
                  bgcolor: '#4A90E2',
                  '&:hover': { bgcolor: '#64B5F6' },
                  fontFamily: '"Comic Sans MS", cursive',
                }}
              >
                Send Message
              </Button>
            </Box>
            <List>
              {mockMessages.map((msg) => (
                <Card 
                  key={msg.id}
                  sx={{ 
                    mb: 2,
                    borderRadius: 4,
                    border: '2px solid #BBDEFB',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontFamily: '"Comic Sans MS", cursive',
                          color: '#2C3E50',
                          fontWeight: 'bold',
                        }}
                      >
                        {msg.from}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontFamily: '"Comic Sans MS", cursive',
                          color: '#666',
                        }}
                      >
                        {msg.timestamp}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontFamily: '"Comic Sans MS", cursive',
                      }}
                    >
                      {msg.content}
                    </Typography>
                    {msg.translated && (
                      <Button
                        startIcon={<TranslateIcon />}
                        size="small"
                        sx={{ 
                          mt: 1,
                          fontFamily: '"Comic Sans MS", cursive',
                        }}
                      >
                        Show Original
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </List>
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
              At-Home Activities
            </Typography>
            <Grid container spacing={3}>
              {mockActivities.map((activity) => (
                <Grid item xs={12} md={6} key={activity.id}>
                  <Card 
                    sx={{ 
                      borderRadius: 4,
                      border: '2px solid #BBDEFB',
                      height: '100%',
                    }}
                  >
                    <CardContent>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontFamily: '"Comic Sans MS", cursive',
                          color: '#2C3E50',
                          mb: 1,
                        }}
                      >
                        {activity.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontFamily: '"Comic Sans MS", cursive',
                          color: '#666',
                          mb: 2,
                        }}
                      >
                        {activity.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            fontFamily: '"Comic Sans MS", cursive',
                            color: '#2C3E50',
                          }}
                        >
                          Duration: {activity.duration}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            fontFamily: '"Comic Sans MS", cursive',
                            color: '#2C3E50',
                          }}
                        >
                          Materials Needed:
                        </Typography>
                        <List dense>
                          {activity.materials.map((material, index) => (
                            <ListItem key={index}>
                              <ListItemText 
                                primary={material}
                                primaryTypographyProps={{
                                  fontFamily: '"Comic Sans MS", cursive',
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                      <Chip
                        label={`Related to: ${activity.relatedTo}`}
                        size="small"
                        sx={{ 
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
    </Container>
  );
} 