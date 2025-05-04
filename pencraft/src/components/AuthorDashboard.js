import {
  Alert, AppBar, Box, Button,
  CircularProgress, Container, Dialog,
  DialogContent, DialogTitle, Grid,
  Tab, Tabs
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import 'chart.js/auto';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import AnalyticsTab from './AuthorTabs/AnalyticsTab';
import CategoriesTab from './AuthorTabs/CategoriesTab';
import OverviewTab from './AuthorTabs/OverviewTab';
import PublicationsTab from './AuthorTabs/PublicationsTab';
import ResourcesTab from './AuthorTabs/ResourcesTab';
import spaceBackground from './background.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100vw',
    minHeight: '100vh',
    background: `url(${spaceBackground}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    color: '#E0E1DD',
    fontFamily: 'Orbitron',
  },
  appBar: {
    boxShadow: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#FFFFFF',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  tab: {
    fontWeight: 'bold',
    minWidth: '19vw',
    justifyContent: 'space-between',
    color: '#4fc3f7',
    '&.Mui-selected': {
      color: '#FFFFFF',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      opacity: 1,
    },
  },
  tabs: {
    width: '100%',
    '.MuiTabs-flexContainer': {
      justifyContent: 'space-evenly',
    },
  },
  card: {
    margin: theme.spacing(2),
    background: 'rgba(0, 0, 0, 0.8)',
    color: '#E0E1DD',
    maxWidth: '100vw',
    boxShadow: theme.shadows[5],
  },
}));

const DashboardTabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index} id={`dashboard-tabpanel-${index}`} aria-labelledby={`dashboard-tab-${index}`}>
    {value === index && <Box p={3}>{children}</Box>}
  </div>
);

const AuthorDashboard = () => {
  const { isAuthenticated, authorId } = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAuthorData = useCallback(async () => {
    if (!authorId) {
      console.error('Author ID is undefined.');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/author/${authorId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to fetch author data');
      const data = await response.json();
      setAuthorData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [authorId]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAuthorData();
    } else {
      navigate('/authorLogin');
    }
  }, [isAuthenticated, navigate, fetchAuthorData]);


  useEffect(() => {
    if (tabIndex === 4 && authorId) {
      // This is a simplistic approach; you may already handle this inside AnalyticsTab
      // Ensure AnalyticsTab handles its own fetching or pass down necessary data
    }
  }, [tabIndex, authorId]);

  if (loading) return <CircularProgress />;
  if (error) return (
    <Dialog open={true} onClose={() => setError(null)}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <Alert severity="error">{error}</Alert>
        <Button onClick={fetchAuthorData} style={{ marginTop: 10 }}>Retry</Button>
      </DialogContent>
    </Dialog>
  );

  return (
    <Container maxWidth="lg" className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} centered className={classes.tabs}>
          <Tab label="Overview" className={classes.tab} />
          <Tab label="Publications" disabled={!authorData} className={classes.tab} />
          <Tab label="Categories" className={classes.tab} />
          <Tab label="Resources" className={classes.tab} />
          <Tab label="Analytics" disabled={!authorData} className={classes.tab} />
        </Tabs>
      </AppBar>
      <Grid container justifyContent="center">
        {/* Overview tab panel */}
        <DashboardTabPanel value={tabIndex} index={0}>
          <OverviewTab />
        </DashboardTabPanel>
        
        <DashboardTabPanel value={tabIndex} index={0}>
          {/* Overview tab content */}
        </DashboardTabPanel>

        {/* Publications tab panel */}
        <DashboardTabPanel value={tabIndex} index={1}>
          {authorId && <PublicationsTab authorId={authorId} />}
        </DashboardTabPanel>

        {/* Categories tab panel */}
        <DashboardTabPanel value={tabIndex} index={2}>
          <CategoriesTab />
        </DashboardTabPanel>

        {/* Resources tab panel */}
        <DashboardTabPanel value={tabIndex} index={3}>
          <ResourcesTab />
        </DashboardTabPanel>

        {/* Analytics tab panel */}
        <DashboardTabPanel value={tabIndex} index={4}>
          {authorId && <AnalyticsTab authorId={authorId} />}
        </DashboardTabPanel>
      </Grid>
    </Container>
  );
};

export default AuthorDashboard;