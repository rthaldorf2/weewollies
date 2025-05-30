import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';

interface ProgressData {
  category: string;
  currentLevel: number;
  maxLevel: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  milestones: {
    title: string;
    achieved: boolean;
  }[];
}

interface ProgressTrackerProps {
  data: ProgressData;
  onEdit: () => void;
}

const getProgressColor = (progress: number) => {
  if (progress >= 80) return '#4CAF50';
  if (progress >= 60) return '#FFC107';
  return '#F44336';
};

const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up':
      return <TrendingUpIcon sx={{ color: '#4CAF50' }} />;
    case 'down':
      return <TrendingDownIcon sx={{ color: '#F44336' }} />;
    default:
      return null;
  }
};

export default function ProgressTracker({ data, onEdit }: ProgressTrackerProps) {
  const progress = (data.currentLevel / data.maxLevel) * 100;

  return (
    <Paper sx={{ p: 3, borderRadius: 4, bgcolor: '#E3F2FD' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontFamily: '"Comic Sans MS", cursive', color: '#2C3E50' }}>
          {data.category}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {getTrendIcon(data.trend)}
          <Tooltip title="Edit Progress">
            <IconButton onClick={onEdit} size="small">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" sx={{ fontFamily: '"Comic Sans MS", cursive' }}>
            Level {data.currentLevel} of {data.maxLevel}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: '"Comic Sans MS", cursive' }}>
            {Math.round(progress)}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            bgcolor: '#BBDEFB',
            '& .MuiLinearProgress-bar': {
              bgcolor: getProgressColor(progress),
            },
          }}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" sx={{ fontFamily: '"Comic Sans MS", cursive', mb: 1 }}>
          Recent Milestones
        </Typography>
        <Grid container spacing={1}>
          {data.milestones.map((milestone, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1,
                  borderRadius: 1,
                  bgcolor: milestone.achieved ? '#C8E6C9' : '#FFECB3',
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: milestone.achieved ? '#4CAF50' : '#FFC107',
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: '"Comic Sans MS", cursive',
                    color: milestone.achieved ? '#2E7D32' : '#F57F17',
                  }}
                >
                  {milestone.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Typography
        variant="caption"
        sx={{
          display: 'block',
          mt: 2,
          textAlign: 'right',
          fontFamily: '"Comic Sans MS", cursive',
          color: '#666',
        }}
      >
        Last updated: {data.lastUpdated}
      </Typography>
    </Paper>
  );
} 