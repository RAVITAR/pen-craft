import { Button, Container, Fade, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Ensure the path to your context is correct
import backgroundImage from './background.jpg'; // Use a high-quality, fire-themed background image

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.secondary.contrastText,
    },
    container: {
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        textAlign: 'center',
    },
    title: {
        fontSize: '4rem',
        fontWeight: 600,
        marginBottom: theme.spacing(4),
        color: '#FF4500', // Orange-red color for a fiery feel
        textShadow: '2px 2px 10px rgba(0, 0, 0, 0.8)', // Strong shadow for depth
    },
    subtitle: {
        fontSize: '1.5rem',
        marginBottom: theme.spacing(6),
        color: '#FF6347', // Tomato color for a vibrant look
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)', // Subtle text shadow for clarity
    },
    button: {
        padding: theme.spacing(2, 6),
        fontSize: '1.2rem',
        fontWeight: 'bold',
        letterSpacing: '0.05em',
        marginTop: theme.spacing(4),
        backgroundColor: '#FF8C00', // Dark orange for buttons
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#FF4500', // Darker orange when hovered
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)', // Adding dynamic shadow for effects
        },
    },
    featureIcon: {
        fontSize: '4rem',
        marginBottom: theme.spacing(2),
        color: theme.palette.secondary.main,
    },
    featureTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
        color: '#FFA500', // Bright orange for feature titles
    },
    featureDescription: {
        fontSize: '1rem',
        color: '#FFD700', // Golden yellow for descriptions
    },
}));


const Homepage = () => {
    const classes = useStyles();
    const { isAuthenticated } = useAuth();

    const getStartedLink = isAuthenticated ? '/writingPortfolio' : '/authorLogin';

    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Fade in={true} timeout={1500}>
                    <div>
                        <Typography variant="h1" className={classes.title}>
                            Welcome to the Blaze Realm
                        </Typography>
                        <Typography variant="h4" className={classes.subtitle}>
                            Ignite your passion and creativity!
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            className={classes.button}
                            component={RouterLink}
                            to={getStartedLink}
                        >
                            Get Started
                        </Button>
                    </div>
                </Fade>

                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <Fade in={true} timeout={2500}>
                            <div>
                                <Typography variant="h2" align="center" className={classes.featureIcon}>
                                    🔥
                                </Typography>
                                <Typography variant="h5" align="center" className={classes.featureTitle}>
                                    Fiery Tales
                                </Typography>
                                <Typography variant="body1" align="center" className={classes.featureDescription}>
                                    Explore stories that spark emotions and fiery debates.
                                </Typography>
                            </div>
                        </Fade>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Fade in={true} timeout={2500}>
                            <div>
                                <Typography variant="h2" align="center" className={classes.featureIcon}>
                                    🌋
                                </Typography>
                                <Typography variant="h5" align="center" className={classes.featureTitle}>
                                    Lava Workshops
                                </Typography>
                                <Typography variant="body1" align="center" className={classes.featureDescription}>
                                    Master the art of storytelling with intense, powerful workshops.
                                </Typography>
                            </div>
                        </Fade>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Fade in={true} timeout={2500}>
                            <div>
                                <Typography variant="h2" align="center" className={classes.featureIcon}>
                                    🌟
                                </Typography>
                                <Typography variant="h5" align="center" className={classes.featureTitle}>
                                    Spark of Inspiration
                                </Typography>
                                <Typography variant="body1" align="center" className={classes.featureDescription}>
                                    Discover insights that ignite your creative journey.
                                </Typography>
                            </div>
                        </Fade>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Homepage;
