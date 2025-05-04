import { CircularProgress } from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Layout from './components/Layout'; // Import the Layout component instead of Header
import NotFoundPage from './components/NotFoundPage';

// Lazy loading components
const AuthorDashboard = lazy(() => import('./components/AuthorDashboard'));
const AuthorList = lazy(() => import('./components/AuthorList'));
const AuthorLogin = lazy(() => import('./components/AuthorLogin'));
const AuthorProfile = lazy(() => import('./components/AuthorProfile'));
const PersonalAuthorProfile = lazy(() => import('./components/PersonalAuthorProfile'));
const AuthorRegistration = lazy(() => import('./components/AuthorRegistration'));
const AuthorSettings = lazy(() => import('./components/AuthorSettings'));
const Homepage = lazy(() => import('./components/Homepage'));
const ParentComponent = lazy(() => import('./components/ParentComponent'));
const WritingPortfolio = lazy(() => import('./components/WritingPortfolio'));
const WritingForm = lazy(() => import('./components/WritingForm'));
const EditWriting = lazy(() => import('./components/EditWriting'));
const WritingDetail = lazy(() => import('./components/WritingDetails'));
const CategoryWritings = lazy(() => import('./components/categoryWritings'));


const theme = createTheme({
    palette: {
        primary: { main: '#556cd6' },
        secondary: { main: '#19857b' },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h1: { fontSize: '2rem' },
    },
});

const MainContainer = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  overflowX: 'hidden',
}));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <CircularProgress />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/authorLogin" replace />;
  }

  return <Layout>{children}</Layout>; // Wrap children with the Layout for protected routes
};

const AppRouter = () => {
    return (
        <ThemeProvider theme={theme}>
          <MainContainer>
            <Suspense fallback={<CircularProgress />}>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/authorLogin" element={<AuthorLogin />} />
                    <Route path="/authorRegistration" element={<AuthorRegistration />} />
                    <Route path="/parent" element={<ProtectedRoute><ParentComponent /></ProtectedRoute>} />
                    <Route path="/authorlist" element={<ProtectedRoute><AuthorList /></ProtectedRoute>} />
                    <Route path="/author/:id" element={<ProtectedRoute><AuthorProfile /></ProtectedRoute>} />
                    <Route path="/authordashboard" element={<ProtectedRoute><AuthorDashboard /></ProtectedRoute>} />
                    <Route path="/authorsettings" element={<ProtectedRoute><AuthorSettings /></ProtectedRoute>} />
                    <Route path="/writingportfolio" element={<ProtectedRoute><WritingPortfolio /></ProtectedRoute>} />
                    <Route path="/add-writing" element={<ProtectedRoute><WritingForm /></ProtectedRoute>} />
                    <Route path="/edit-writings/:id" element={<ProtectedRoute><EditWriting /></ProtectedRoute>} />
                    <Route path="/writings/:id" element={<ProtectedRoute><WritingDetail /></ProtectedRoute>} />
                    <Route path="/categories/:categoryId" element={<ProtectedRoute><CategoryWritings /></ProtectedRoute>} />
                    <Route path="/authorprofile" element={<ProtectedRoute><PersonalAuthorProfile /></ProtectedRoute>} />
                    <Route path="/authorprofile" element={<ProtectedRoute><PersonalAuthorProfile /></ProtectedRoute>} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
          </MainContainer>
        </ThemeProvider>
    );
};

export default AppRouter;
