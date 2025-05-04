import AnalyticsIcon from '@mui/icons-material/Assessment';
import ResourceIcon from '@mui/icons-material/Book';
import CategoryIcon from '@mui/icons-material/Category';
import PublicationIcon from '@mui/icons-material/LibraryBooks';
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: '100vh',
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    color: theme.palette.text.primary,
    transition: 'box-shadow 0.5s ease-in-out',
    '&:hover': {
      boxShadow: theme.shadows[20],
    },
  },
  content: {
    textAlign: 'center',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 700,
    marginTop: theme.spacing(1),
  },
  description: {
    margin: theme.spacing(1, 0),
  },
  icon: {
    fontSize: '4rem',
    color: '#ffffff',
  },
  summary: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
  },
});

const OverviewTab = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  // Example summaries for each section
  const tabsOverview = [
    {
      icon: <PublicationIcon className={classes.icon} />,
      title: 'Publications',
      summary: '3 drafts pending, 5 articles published this month.',
    },
    {
      icon: <CategoryIcon className={classes.icon} />,
      title: 'Categories',
      summary: 'Most engaged category: Technology.',
    },
    {
      icon: <AnalyticsIcon className={classes.icon} />,
      title: 'Analytics',
      summary: 'Total reads increased by 20% this quarter.',
    },
    {
      icon: <ResourceIcon className={classes.icon} />,
      title: 'Resources',
      summary: 'New guide on SEO best practices added.',
    },
  ];

  return (
    <Box className={classes.root}>
      <Typography variant={matches ? 'h2' : 'h4'} gutterBottom align="center">
        Dashboard Overview
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {tabsOverview.map((tab, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className={classes.card} elevation={5}>
              <CardContent className={classes.content}>
                {tab.icon}
                <Typography className={classes.title} gutterBottom>
                  {tab.title}
                </Typography>
                <Typography className={classes.summary}>
                  {tab.summary}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OverviewTab;
