import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Link, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        minHeight: '100vh',
        minWidth: '90vw',
    },
    list: {
        width: '100%',
    },
    listItem: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    searchBox: {
        display: 'flex',
        marginBottom: theme.spacing(2),
    },
    input: {
        marginRight: theme.spacing(1),
        flexGrow: 1,
    },
}));

const ResourcesTab = () => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResources, setFilteredResources] = useState([]);

    // Sample resources for demonstration
    const resources = [
        { title: 'Ultimate Guide to Writing', link: 'https://www.writing.com/main/books/entry_id/834714', description: 'Comprehensive writing guide covering all aspects of writing.' },
        { title: 'Common Grammar Mistakes', link: 'https://www.grammarly.com/blog/common-grammar-mistakes/', description: 'Avoid common grammar mistakes to improve your writing.' },
        { title: 'Understanding the Publishing Process', link: 'https://www.masterclass.com/articles/understanding-the-publishing-process', description: 'A detailed look into the steps involved in publishing.' },
    ];

    // Filter resources based on search term
    const handleSearch = () => {
        const filtered = resources.filter((resource) =>
            resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredResources(filtered);
    };

    return (
        <Paper className={classes.root}>
            <Typography variant="h5" gutterBottom>Explore Writing Resources</Typography>
            <Box className={classes.searchBox}>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    <SearchIcon />
                </Button>
            </Box>
            <List className={classes.list}>
                {(filteredResources.length > 0 ? filteredResources : resources).map((resource, index) => (
                    <ListItem key={index} className={classes.listItem}>
                        <Link href={resource.link} target="_blank" rel="noopener noreferrer" className={classes.link}>
                            <ListItemText primary={resource.title} secondary={resource.description} />
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default ResourcesTab;
