import EditIcon from '@mui/icons-material/Edit';
import { Button, CircularProgress, Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicationsTab = ({ authorId }) => {
    const [loading, setLoading] = useState(true);
    const [writings, setWritings] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWritings = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/writings/by-author/${authorId}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (!response.ok) throw new Error('Failed to fetch writings');
                const data = await response.json();
                setWritings(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWritings();
    }, [authorId]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!Array.isArray(writings) || writings.length === 0) return <Typography>No writings found.</Typography>;

    return (
<Paper style={{
    padding: 24,
    marginBottom: 24,
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'radial-gradient(ellipse at center, #CF1020 0%, #881411 100%)' // Deeper red towards a more muted shade
}}>
    <Typography variant="h4" gutterBottom align="center" style={{
        color: '#ffffff',
        marginBottom: 24,
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
    }}>Published Writings</Typography>
    <List style={{
        width: '100%',
        maxWidth: 600,
        overflow: 'auto',
        maxHeight: '70vh'
    }}>
        {writings.map((writing, index) => (
            <ListItem key={writing._id} divider style={{
                backgroundColor: '#441a1a', // A muted dark red, almost a burgundy
                borderRadius: 8,
                marginBottom: 16
            }}>
                <Grid container alignItems="center">
                    <Grid item xs={9}>
                        <ListItemText
                            primary={<Typography variant="h6" style={{ color: '#ffffff' }}>{writing.title}</Typography>}
                            secondary={<Typography variant="body2" style={{ color: '#B3BAC5' }}>Created on {new Date(writing.createdAt).toLocaleDateString()}</Typography>} // Muted secondary text color
                        />
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: 'right' }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() => navigate(`/edit-writings/${writing._id}`)}
                            style={{
                                color: '#ffffff', // White text for contrast
                                borderColor: '#CF1020' // Keeping the volcano red for the border to maintain theme consistency
                            }}
                        >
                            Edit
                        </Button>
                    </Grid>
                </Grid>
            </ListItem>
        ))}
    </List>
</Paper>


    );
};

export default PublicationsTab;
