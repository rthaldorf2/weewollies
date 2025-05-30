import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  Mic as MicIcon,
  Stop as StopIcon,
  PlayArrow as PlayIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

interface Note {
  id: string;
  type: 'voice' | 'text';
  content: string;
  date: string;
  duration?: number; // for voice memos in seconds
}

interface TeacherNotesProps {
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id'>) => void;
  onDeleteNote: (id: string) => void;
  onEditNote: (id: string, content: string) => void;
}

export default function TeacherNotes({
  notes,
  onAddNote,
  onDeleteNote,
  onEditNote,
}: TeacherNotesProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState<string | null>(null);

  const handleStartRecording = () => {
    setIsRecording(true);
    // TODO: Implement voice recording functionality
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // TODO: Implement stop recording and save functionality
    onAddNote({
      type: 'voice',
      content: 'Voice memo recording', // Replace with actual recording
      date: new Date().toISOString(),
      duration: 30, // Replace with actual duration
    });
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote({
        type: 'text',
        content: newNote,
        date: new Date().toISOString(),
      });
      setNewNote('');
    }
  };

  const handleEditNote = (id: string, content: string) => {
    onEditNote(id, content);
    setEditingNote(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          startIcon={isRecording ? <StopIcon /> : <MicIcon />}
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          sx={{
            bgcolor: isRecording ? '#e53935' : '#4A90E2',
            '&:hover': { bgcolor: isRecording ? '#c62828' : '#64B5F6' },
            fontFamily: '"Comic Sans MS", cursive',
            mr: 2,
          }}
        >
          {isRecording ? 'Stop Recording' : 'Record Voice Note'}
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Write a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          sx={{
            '& .MuiInputLabel-root': {
              fontFamily: '"Comic Sans MS", cursive',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleAddNote}
          disabled={!newNote.trim()}
          sx={{
            mt: 1,
            bgcolor: '#4A90E2',
            '&:hover': { bgcolor: '#64B5F6' },
            fontFamily: '"Comic Sans MS", cursive',
          }}
        >
          Add Note
        </Button>
      </Box>

      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid item xs={12} key={note.id}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                {editingNote === note.id ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={note.content}
                    onChange={(e) => onEditNote(note.id, e.target.value)}
                    onBlur={() => setEditingNote(null)}
                    autoFocus
                    sx={{
                      '& .MuiInputLabel-root': {
                        fontFamily: '"Comic Sans MS", cursive',
                      },
                    }}
                  />
                ) : (
                  <Box>
                    {note.type === 'voice' ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                          size="small"
                          sx={{ color: '#4A90E2' }}
                          onClick={() => {
                            // TODO: Implement play functionality
                          }}
                        >
                          <PlayIcon />
                        </IconButton>
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: '"Comic Sans MS", cursive' }}
                        >
                          Voice Memo ({formatDuration(note.duration || 0)})
                        </Typography>
                      </Box>
                    ) : (
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: '"Comic Sans MS", cursive' }}
                      >
                        {note.content}
                      </Typography>
                    )}
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mt: 1,
                        color: '#666',
                        fontFamily: '"Comic Sans MS", cursive',
                      }}
                    >
                      {formatDate(note.date)}
                    </Typography>
                  </Box>
                )}
              </CardContent>
              <CardActions>
                {note.type === 'text' && (
                  <IconButton
                    size="small"
                    onClick={() => setEditingNote(note.id)}
                    sx={{ color: '#4A90E2' }}
                  >
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  onClick={() => onDeleteNote(note.id)}
                  sx={{ color: '#e53935' }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 