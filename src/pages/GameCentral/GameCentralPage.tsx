import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Paper,
  Breadcrumbs,
  Link,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Star as StarIcon,
  School as SchoolIcon,
  Calculate as CalculateIcon,
  Psychology as PsychologyIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';

interface Game {
  id: string;
  title: string;
  description: string;
  category: 'reading' | 'math' | 'cognitive';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ReactNode;
  path: string;
  learningGoals: string[];
}

const games: Game[] = [
  {
    id: 'phonics-fun',
    title: 'Phonics Fun',
    description: 'Learn letter sounds and build words through interactive games',
    category: 'reading',
    difficulty: 'beginner',
    icon: <SchoolIcon sx={{ fontSize: 40, color: '#4A90E2' }} />,
    path: '/games/phonics',
    learningGoals: [
      'Letter sound recognition',
      'Basic word building',
      'Phonemic awareness'
    ],
  },
  {
    id: 'number-adventure',
    title: 'Number Adventure',
    description: 'Explore numbers and basic math concepts through fun activities',
    category: 'math',
    difficulty: 'beginner',
    icon: <CalculateIcon sx={{ fontSize: 40, color: '#4A90E2' }} />,
    path: '/games/numbers',
    learningGoals: [
      'Number recognition',
      'Basic counting',
      'Simple addition'
    ],
  },
  {
    id: 'pattern-play',
    title: 'Pattern Play',
    description: 'Develop pattern recognition and logical thinking skills',
    category: 'cognitive',
    difficulty: 'intermediate',
    icon: <PsychologyIcon sx={{ fontSize: 40, color: '#4A90E2' }} />,
    path: '/games/patterns',
    learningGoals: [
      'Pattern recognition',
      'Logical thinking',
      'Visual discrimination'
    ],
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return '#81C784';
    case 'intermediate':
      return '#FFB74D';
    case 'advanced':
      return '#E57373';
    default:
      return '#4A90E2';
  }
};

export default function GameCentralPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'parent';
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleHomeClick = () => {
    navigate('/', { state: { userType } });
  };

  const handleGameClick = (path: string) => {
    navigate(path, { state: { userType } });
  };

  const filteredGames = selectedCategory
    ? games.filter(game => game.category === selectedCategory)
    : games;

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
            Game Central
          </Typography>
        </Breadcrumbs>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3,
            fontFamily: '"Comic Sans MS", cursive',
            color: '#2C3E50',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TrophyIcon sx={{ color: '#4A90E2' }} />
          Game Central
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              fontFamily: '"Comic Sans MS", cursive',
              color: '#2C3E50',
            }}
          >
            Categories
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label="All Games"
              onClick={() => setSelectedCategory(null)}
              color={selectedCategory === null ? 'primary' : 'default'}
              sx={{ fontFamily: '"Comic Sans MS", cursive' }}
            />
            <Chip
              label="Reading"
              onClick={() => setSelectedCategory('reading')}
              color={selectedCategory === 'reading' ? 'primary' : 'default'}
              sx={{ fontFamily: '"Comic Sans MS", cursive' }}
            />
            <Chip
              label="Math"
              onClick={() => setSelectedCategory('math')}
              color={selectedCategory === 'math' ? 'primary' : 'default'}
              sx={{ fontFamily: '"Comic Sans MS", cursive' }}
            />
            <Chip
              label="Cognitive"
              onClick={() => setSelectedCategory('cognitive')}
              color={selectedCategory === 'cognitive' ? 'primary' : 'default'}
              sx={{ fontFamily: '"Comic Sans MS", cursive' }}
            />
          </Box>
        </Box>

        <Grid container spacing={3}>
          {filteredGames.map((game) => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 4,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  },
                  border: '2px solid #BBDEFB',
                }}
              >
                <CardActionArea onClick={() => handleGameClick(game.path)}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {game.icon}
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          ml: 1,
                          fontFamily: '"Comic Sans MS", cursive',
                          color: '#2C3E50',
                        }}
                      >
                        {game.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        mb: 2,
                        fontFamily: '"Comic Sans MS", cursive',
                      }}
                    >
                      {game.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={game.difficulty}
                        size="small"
                        sx={{ 
                          bgcolor: getDifficultyColor(game.difficulty),
                          color: 'white',
                          fontFamily: '"Comic Sans MS", cursive',
                        }}
                      />
                      {game.learningGoals.map((goal, index) => (
                        <Tooltip key={index} title={goal}>
                          <Chip
                            icon={<StarIcon />}
                            label={`Goal ${index + 1}`}
                            size="small"
                            sx={{ 
                              bgcolor: '#E3F2FD',
                              fontFamily: '"Comic Sans MS", cursive',
                            }}
                          />
                        </Tooltip>
                      ))}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
} 