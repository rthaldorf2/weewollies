import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import PortfolioPage from './pages/Portfolio/PortfolioPage';
import GameCentralPage from './pages/GameCentral/GameCentralPage';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import ParentPortal from './pages/Parent/ParentPortal';
import WhatsUpPage from './pages/WhatsUp/WhatsUpPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2',
    },
    secondary: {
      main: '#F5A623',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
  },
});

function AppRoutes() {
  console.log('Rendering AppRoutes');
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/portfolios" 
        element={
          <Layout>
            <PortfolioPage />
          </Layout>
        } 
      />
      <Route 
        path="/games" 
        element={
          <Layout>
            <GameCentralPage />
          </Layout>
        } 
      />
      <Route 
        path="/teacher" 
        element={
          <Layout>
            <TeacherDashboard />
          </Layout>
        } 
      />
      <Route 
        path="/parent" 
        element={
          <Layout>
            <ParentPortal />
          </Layout>
        } 
      />
      <Route 
        path="/whatsup" 
        element={
          <Layout>
            <WhatsUpPage />
          </Layout>
        } 
      />
    </Routes>
  );
}

function App() {
  console.log('Rendering App');
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App; 