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
  IconButton,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  EmojiEvents as TrophyIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  Group as GroupIcon,
  PhotoCamera as CameraIcon,
  CheckCircle as CheckCircleIcon,
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
      id={`teacher-tabpanel-${index}`}
      aria-labelledby={`teacher-tab-${index}`}
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

interface Student {
  id: string;
  name: string;
  avatar: string;
  participation: number;
  behavior: 'excellent' | 'good' | 'needs_attention';
  recentAssessments: {
    type: string;
    date: string;
    status: 'completed' | 'pending';
  }[];
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    avatar: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=200&h=200&fit=crop&auto=format',
    participation: 85,
    behavior: 'excellent',
    recentAssessments: [
      { type: 'Reading Progress', date: '2024-03-15', status: 'completed' },
      { type: 'Math Skills', date: '2024-03-14', status: 'pending' },
    ],
  },
  {
    id: '2',
    name: 'Liam Johnson',
    avatar: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=200&h=200&fit=crop&auto=format',
    participation: 70,
    behavior: 'good',
    recentAssessments: [
      { type: 'Social Skills', date: '2024-03-15', status: 'completed' },
      { type: 'Art Project', date: '2024-03-14', status: 'completed' },
    ],
  },
];

const getBehaviorColor = (behavior: string) => {
  switch (behavior) {
    case 'excellent':
      return '#81C784';
    case 'good':
      return '#FFB74D';
    case 'needs_attention':
      return '#E57373';
    default:
      return '#4A90E2';
  }
};

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'teacher';
  const [currentTab, setCurrentTab] = useState(0);

  const handleHomeClick = () => {
    navigate('/', { state: { userType } });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
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
            Teacher Dashboard
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
          <Tab icon={<CalendarIcon />} label="Lesson Planning" />
          <Tab icon={<GroupIcon />} label="Class Overview" />
          <Tab icon={<AssessmentIcon />} label="Assessments" />
        </Tabs>

        <TabPanel value={currentTab} index={0}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: '"Comic Sans MS", cursive',
                color: '#2C3E50',
              }}
            >
              Weekly Schedule
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: '#4A90E2',
                '&:hover': { bgcolor: '#64B5F6' },
                fontFamily: '"Comic Sans MS", cursive',
              }}
            >
              Add Activity
            </Button>
          </Box>
          <Grid container spacing={3}>
            {/* Lesson planning content will go here */}
            <Grid item xs={12}>
              <Paper 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  bgcolor: '#F5F5F5',
                  borderRadius: 4,
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: '"Comic Sans MS", cursive',
                    color: '#666',
                  }}
                >
                  Drag and drop activities to plan your week
                </Typography>
              </Paper>
            </Grid>
          </Grid>
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
              Class Overview
            </Typography>
            <Grid container spacing={3}>
              {mockStudents.map((student) => (
                <Grid item xs={12} sm={6} md={4} key={student.id}>
                  <Card 
                    sx={{ 
                      borderRadius: 4,
                      border: '2px solid #BBDEFB',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          src={student.avatar}
                          sx={{ width: 60, height: 60, mr: 2 }}
                        />
                        <Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontFamily: '"Comic Sans MS", cursive',
                              color: '#2C3E50',
                            }}
                          >
                            {student.name}
                          </Typography>
                          <Chip
                            label={student.behavior}
                            size="small"
                            sx={{ 
                              bgcolor: getBehaviorColor(student.behavior),
                              color: 'white',
                              fontFamily: '"Comic Sans MS", cursive',
                            }}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontFamily: '"Comic Sans MS", cursive',
                            color: '#666',
                            mb: 1,
                          }}
                        >
                          Participation
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={student.participation}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            bgcolor: '#E3F2FD',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: '#4A90E2',
                            },
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontFamily: '"Comic Sans MS", cursive',
                            color: '#666',
                            mb: 1,
                          }}
                        >
                          Recent Assessments
                        </Typography>
                        {student.recentAssessments.map((assessment, index) => (
                          <Chip
                            key={index}
                            icon={assessment.status === 'completed' ? <CheckCircleIcon /> : <CameraIcon />}
                            label={assessment.type}
                            size="small"
                            sx={{ 
                              mr: 1,
                              mb: 1,
                              bgcolor: assessment.status === 'completed' ? '#E3F2FD' : '#FFF3E0',
                              fontFamily: '"Comic Sans MS", cursive',
                            }}
                          />
                        ))}
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
              Assessment Tools
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    borderRadius: 4,
                    border: '2px solid #BBDEFB',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    },
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CheckCircleIcon sx={{ fontSize: 40, color: '#4A90E2', mr: 2 }} />
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontFamily: '"Comic Sans MS", cursive',
                          color: '#2C3E50',
                        }}
                      >
                        Progress Checklists
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: '"Comic Sans MS", cursive',
                        color: '#666',
                      }}
                    >
                      Create and manage assessment checklists for different skills and milestones
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    borderRadius: 4,
                    border: '2px solid #BBDEFB',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    },
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CameraIcon sx={{ fontSize: 40, color: '#4A90E2', mr: 2 }} />
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontFamily: '"Comic Sans MS", cursive',
                          color: '#2C3E50',
                        }}
                      >
                        Photo/Video Evidence
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: '"Comic Sans MS", cursive',
                        color: '#666',
                      }}
                    >
                      Capture and organize visual evidence of student progress
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    borderRadius: 4,
                    border: '2px solid #BBDEFB',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    },
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TrophyIcon sx={{ fontSize: 40, color: '#4A90E2', mr: 2 }} />
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontFamily: '"Comic Sans MS", cursive',
                          color: '#2C3E50',
                        }}
                      >
                        Milestone Tracking
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: '"Comic Sans MS", cursive',
                        color: '#666',
                      }}
                    >
                      Track and celebrate student achievements and developmental milestones
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
} 