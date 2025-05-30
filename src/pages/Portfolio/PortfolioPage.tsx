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
  Avatar,
  Chip,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  School as SchoolIcon,
  ArtTrack as ArtIcon,
  TrendingUp as ProgressIcon,
  Mic as MicIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import ArtworkUpload from './components/ArtworkUpload';
import ProgressTracker from './components/ProgressTracker';
import TeacherNotes from './components/TeacherNotes';

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
      id={`portfolio-tabpanel-${index}`}
      aria-labelledby={`portfolio-tab-${index}`}
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
  age: number;
  grade: string;
  avatar?: string;
}

const mockStudent: Student = {
  id: '1',
  name: 'Emma Thompson',
  age: 5,
  grade: 'Kindergarten',
  avatar: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=200&h=200&fit=crop&auto=format',
};

const mockProgressData = {
  reading: {
    category: 'Reading',
    currentLevel: 3,
    maxLevel: 5,
    trend: 'up' as const,
    lastUpdated: '2024-03-15',
    milestones: [
      { title: 'Recognizes all letters', achieved: true },
      { title: 'Reads simple words', achieved: true },
      { title: 'Reads short sentences', achieved: false },
    ],
  },
  math: {
    category: 'Math',
    currentLevel: 2,
    maxLevel: 5,
    trend: 'stable' as const,
    lastUpdated: '2024-03-14',
    milestones: [
      { title: 'Counts to 20', achieved: true },
      { title: 'Recognizes numbers 1-10', achieved: true },
      { title: 'Simple addition', achieved: false },
    ],
  },
  social: {
    category: 'Social Skills',
    currentLevel: 4,
    maxLevel: 5,
    trend: 'up' as const,
    lastUpdated: '2024-03-13',
    milestones: [
      { title: 'Shares with others', achieved: true },
      { title: 'Takes turns', achieved: true },
      { title: 'Expresses feelings', achieved: true },
    ],
  },
};

const mockNotes = [
  {
    id: '1',
    type: 'text' as const,
    content: 'Emma showed great enthusiasm during the art project today!',
    date: '2024-03-15T10:30:00Z',
  },
  {
    id: '2',
    type: 'voice' as const,
    content: 'Voice memo about reading progress',
    date: '2024-03-14T14:20:00Z',
    duration: 45,
  },
];

export default function PortfolioPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'parent'; // Default to parent if not specified
  const [currentTab, setCurrentTab] = useState(0);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [notes, setNotes] = useState(mockNotes);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleUploadSubmit = (data: any) => {
    console.log('Upload data:', data);
    // TODO: Implement file upload functionality
  };

  const handleAddNote = (note: any) => {
    setNotes([{ ...note, id: Date.now().toString() }, ...notes]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEditNote = (id: string, content: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, content } : note
    ));
  };

  const handleHomeClick = () => {
    navigate('/', { state: { userType } });
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
            Student Portfolio
          </Typography>
        </Breadcrumbs>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={mockStudent.avatar}
              sx={{ 
                width: 100, 
                height: 100, 
                border: '3px solid #4A90E2',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => setIsImageDialogOpen(true)}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h4" sx={{ fontFamily: '"Comic Sans MS", cursive', color: '#2C3E50' }}>
              {mockStudent.name}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip
                icon={<SchoolIcon />}
                label={`Grade ${mockStudent.grade}`}
                sx={{ mr: 1, bgcolor: '#E3F2FD', color: '#2C3E50' }}
              />
              <Chip
                label={`${mockStudent.age} years old`}
                sx={{ bgcolor: '#E3F2FD', color: '#2C3E50' }}
              />
            </Box>
          </Grid>
        </Grid>
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
          <Tab icon={<ArtIcon />} label="Artwork & Assignments" />
          <Tab icon={<ProgressIcon />} label="Progress" />
          <Tab icon={<MicIcon />} label="Teacher Notes" />
        </Tabs>

        <TabPanel value={currentTab} index={0}>
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              onClick={() => setIsUploadOpen(true)}
              sx={{
                bgcolor: '#4A90E2',
                '&:hover': { bgcolor: '#64B5F6' },
                fontFamily: '"Comic Sans MS", cursive',
              }}
            >
              Upload New Work
            </Button>
          </Box>
          <Grid container spacing={3}>
            {/* Artwork and assignments will be displayed here */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontFamily: '"Comic Sans MS", cursive', color: '#2C3E50' }}>
                Recent Uploads
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: '#666' }}>
                No artwork or assignments uploaded yet.
              </Typography>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <ProgressTracker
                data={mockProgressData.reading}
                onEdit={() => console.log('Edit reading progress')}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ProgressTracker
                data={mockProgressData.math}
                onEdit={() => console.log('Edit math progress')}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ProgressTracker
                data={mockProgressData.social}
                onEdit={() => console.log('Edit social skills progress')}
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <TeacherNotes
            notes={notes}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
            onEditNote={handleEditNote}
          />
        </TabPanel>
      </Paper>

      <Dialog
        open={isImageDialogOpen}
        onClose={() => setIsImageDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ position: 'relative', p: 0 }}>
          <IconButton
            onClick={() => setIsImageDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={mockStudent.avatar}
            alt={`${mockStudent.name}'s photo`}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '4px',
            }}
          />
        </DialogContent>
      </Dialog>

      <ArtworkUpload
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSubmit={handleUploadSubmit}
      />
    </Container>
  );
} 