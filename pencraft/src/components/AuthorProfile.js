import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import WebIcon from '@mui/icons-material/Web';
import { Avatar, Box, CircularProgress, Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import backgroundImage from './background.jpg';

const useStyles = makeStyles((theme) => ({
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: theme.spacing(4),
    backgroundColor: 'transparent',
  },
  content: {
    maxWidth: 800,
    width: '100%',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[10],
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    border: `2px solid ${theme.palette.divider}`,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing(2),
    borderRadius: '50%',
    overflow: 'hidden',
    border: `4px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.background.default,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  title: {
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  description: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
  },
  socialMedia: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  statsContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  statItem: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  writingsList: {
    width: '100%', // Adjust width as necessary
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
  },
}));

const AuthorProfile = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [writings, setWritings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('Author ID is undefined');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const authorResponse = await fetch(`http://localhost:5000/api/author/${id}`);
        const writingsResponse = await fetch(`http://localhost:5000/api/writings/by-author/${id}`);
        const statsResponse = await fetch(`http://localhost:5000/api/stats/${id}`); // Fetch stats data

        if (!authorResponse.ok || !writingsResponse.ok || !statsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const authorData = await authorResponse.json();
        const writingsData = await writingsResponse.json();
        const statsData = await statsResponse.json(); // Extract stats data

        setAuthor(authorData);
        setWritings(writingsData.writings || []);
        setStats(statsData); // Set stats
        setLoading(false);
      } catch (error) {
        setError('An error occurred: ' + error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const renderStats = () => {
    return (
      <Box className={classes.statsContainer}>
        <Typography variant="h6" gutterBottom>Author Stats</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={classes.statItem}>
              <Typography variant="subtitle1">Total Writings</Typography>
              <Typography variant="h6">{stats ? stats.totalWritings : 'Loading...'}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={classes.statItem}>
              <Typography variant="subtitle1">Total Reads</Typography>
              <Typography variant="h6">{stats ? stats.totalReads : 'Loading...'}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={classes.statItem}>
              <Typography variant="subtitle1">Total Likes</Typography>
              <Typography variant="h6">{stats ? stats.totalLikes : 'Loading...'}</Typography>
            </Paper>
          </Grid>
          {/* Add more stats items as needed */}
        </Grid>
      </Box>
    );
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="body1">{error}</Typography>;
  if (!author) return <Typography variant="body1">Author not found.</Typography>;

  return (
    <>
      <div className={classes.background}></div>
      <div className={classes.container}>
        <Paper className={classes.content}>
          <div className={classes.avatarContainer}>
            <Avatar alt="Profile Picture" src={author.profilePicture || 'https://via.placeholder.com/150'} className={classes.avatar} />
          </div>
          <Typography variant="h4" className={classes.title}>{author.name}</Typography>
          <Typography variant="body1" className={classes.description}>{author.bio || "No biography provided."}</Typography>
          <div className={classes.socialMedia}>
            {author.socialMedia && (
              <>
                {author.socialMedia.twitter && (
                  <TwitterIcon color="primary" />
                )}
                {author.socialMedia.facebook && (
                  <FacebookIcon color="primary" />
                )}
                {author.socialMedia.linkedin && (
                  <LinkedInIcon color="primary" />
                )}
                {author.socialMedia.instagram && (
                  <InstagramIcon color="primary" />
                )}
                {author.website && (
                  <WebIcon color="primary" />
                )}
              </>
            )}
          </div>
          {renderStats()}
          {writings.length > 0 && (
            <List className={classes.writingsList}>
              {writings.map((writing, index) => (
                <ListItem key={index}>
                  <ListItemText primary={writing.title} secondary={writing.summary || "No summary available"} />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </div>
    </>
  );
};

export default AuthorProfile;
