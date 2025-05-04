import { Avatar, Box, CircularProgress, Divider, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext'; // Correctly importing useAuth
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
        borderRadius: theme.spacing(2),
        boxShadow: theme.shadows[5],
        backgroundColor: '#ffffff',
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden',
        border: `2px solid ${theme.palette.primary.main}`,
    },
    avatarContainer: {
        width: 150,
        height: 150,
        marginBottom: theme.spacing(2),
        borderRadius: '50%',
        overflow: 'hidden',
        border: `4px solid ${theme.palette.primary.main}`,
    },
    avatar: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    title: {
        marginBottom: theme.spacing(1),
        color: theme.palette.primary.main,
    },
    description: {
        marginBottom: theme.spacing(2),
        color: '#333',
        fontStyle: 'italic',
    },
    info: {
        marginTop: theme.spacing(2),
    },
    statsContainer: {
        marginTop: theme.spacing(4),
    },
    statItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: theme.shadows[3],
        },
    },
}));

const PersonalAuthorProfile = () => {
    const classes = useStyles();
    const { authorId } = useAuth(); // Accessing authorId from AuthContext
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAuthorDetails = async () => {
            setLoading(true);
            try {
                // Fetch author details
                const authorResponse = await fetch(`http://localhost:5000/api/author/${authorId}`);
                const authorData = await authorResponse.json();
                if (!authorResponse.ok) throw new Error(authorData.message || 'Failed to fetch author details');

                // Fetch author stats
                const statsResponse = await fetch(`http://localhost:5000/api/stats/${authorId}`);
                const statsData = await statsResponse.json();
                if (!statsResponse.ok) throw new Error(statsData.message || 'Failed to fetch author stats');

                // Merge author details and stats
                const mergedData = { ...authorData, ...statsData };

                // Update state
                setAuthor(mergedData);
                setLoading(false);
            } catch (error) {
                setError('An error occurred while fetching author details: ' + error.message);
                setLoading(false);
            }
        };

        if (authorId) fetchAuthorDetails();
    }, [authorId]);

    const renderStats = () => {
        return (
            <Box className={classes.statsContainer}>
                <Typography variant="h6" gutterBottom>Author Stats</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className={classes.statItem}>
                            <Typography variant="subtitle1">Total Writings</Typography>
                            <Typography variant="h6">{author.totalWritings}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className={classes.statItem}>
                            <Typography variant="subtitle1">Total Reads</Typography>
                            <Typography variant="h6">{author.totalReads}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className={classes.statItem}>
                            <Typography variant="subtitle1">Total Likes</Typography>
                            <Typography variant="h6">{author.totalLikes}</Typography>
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
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                        <div className={classes.avatarContainer}>
                            <Avatar alt="Profile Picture" src={`${author.profilePicture}`} className={classes.avatar} />
                        </div>
                        <div style={{ marginLeft: 20 }}>
                            <Typography variant="h4" className={classes.title}>{author.name}</Typography>
                            <Typography variant="body1" className={classes.description}>{author.description}</Typography>
                            <div className={classes.info}>
                                <Typography variant="body1"><strong>Email:</strong> {author.email}</Typography>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    {renderStats()}
                    {/* Add additional sections like authored posts, followers, etc. */}
                </Paper>
            </div>
        </>
    );
};

export default PersonalAuthorProfile;
