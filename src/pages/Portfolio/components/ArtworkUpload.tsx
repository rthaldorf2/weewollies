import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Close as CloseIcon,
  Image as ImageIcon,
  Description as DocumentIcon,
} from '@mui/icons-material';

interface ArtworkUploadProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ArtworkData) => void;
}

interface ArtworkData {
  title: string;
  description: string;
  file: File | null;
  type: 'artwork' | 'assignment';
}

export default function ArtworkUpload({ open, onClose, onSubmit }: ArtworkUploadProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<'artwork' | 'assignment'>('artwork');
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create preview URL for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      file,
      type,
    });
    // Reset form
    setTitle('');
    setDescription('');
    setFile(null);
    setPreview(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontFamily: '"Comic Sans MS", cursive' }}>
        Upload New Work
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
                fullWidth
                sx={{
                  height: 100,
                  border: '2px dashed #4A90E2',
                  borderRadius: 2,
                  fontFamily: '"Comic Sans MS", cursive',
                }}
              >
                {file ? file.name : 'Click to upload file'}
                <input
                  type="file"
                  hidden
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>

            {preview && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 200,
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(255,255,255,0.8)',
                    }}
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontFamily: '"Comic Sans MS", cursive',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontFamily: '"Comic Sans MS", cursive',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant={type === 'artwork' ? 'contained' : 'outlined'}
                  startIcon={<ImageIcon />}
                  onClick={() => setType('artwork')}
                  sx={{
                    flex: 1,
                    fontFamily: '"Comic Sans MS", cursive',
                    bgcolor: type === 'artwork' ? '#4A90E2' : 'transparent',
                  }}
                >
                  Artwork
                </Button>
                <Button
                  variant={type === 'assignment' ? 'contained' : 'outlined'}
                  startIcon={<DocumentIcon />}
                  onClick={() => setType('assignment')}
                  sx={{
                    flex: 1,
                    fontFamily: '"Comic Sans MS", cursive',
                    bgcolor: type === 'assignment' ? '#4A90E2' : 'transparent',
                  }}
                >
                  Assignment
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!file || !title}
          sx={{
            bgcolor: '#4A90E2',
            '&:hover': { bgcolor: '#64B5F6' },
            fontFamily: '"Comic Sans MS", cursive',
          }}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
} 