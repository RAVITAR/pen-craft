import { Alert, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import spaceBackground from './background.jpg';

const CustomCard = styled(Card)({
    background: `url(${spaceBackground}) no-repeat center center`,
    backgroundSize: 'cover',
    color: '#FFFFFF',
    borderRadius: 0,
    padding: '20px',
    backdropFilter: 'blur(8px)'
});

const CustomTextField = styled(TextField)({
    '& label': {
        color: '#FFFFFF',
    },
    '& label.Mui-focused': {
        color: '#90CAF9',
    },
    '& .MuiInputBase-root': {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: '#FFFFFF',
        borderColor: '#FFFFFF'
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 0.7)'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#90CAF9',
    }
});

const CustomFormControl = styled(FormControl)({
    '& .MuiInputBase-root': {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: '#FFFFFF',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiInputLabel-root': {
        color: '#FFFFFF',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#90CAF9',
    }
});

const CustomButton = styled(Button)({
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white',
    '&:hover': {
        backgroundColor: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)'
    }
});

const WritingForm = () => {
    const { authorId } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');
    const [tags, setTags] = useState('');
    const [status, setStatus] = useState('draft');
    const [categoryId, setCategoryId] = useState([]);
    const [categories, setCategories] = useState({}); // Holds category objects
// Holds selected category IDs



useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
        .then(response => {
            const categoriesObject = response.data.reduce((acc, category) => {
                acc[category._id] = category; // Store category objects by their ID
                return acc;
            }, {});
            setCategories(categoriesObject); // Set the categories object
        })
        .catch(error => console.log('Error fetching categories:', error));
}, []);

    
const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
        title,
        description,
        content,
        categoryId: categoryId,  // Send the array of selected category IDs
        tags,
        status,
        author: authorId
    };

    const apiUrl = 'http://localhost:5000/api/writings';

    axios.post(apiUrl, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        setMessage('Writing created successfully!');
        setSeverity('success');
        setOpen(true);
    })
    .catch(error => {
        setMessage('Error creating writing: ' + (error.response?.data?.message || error.message));
        setSeverity('error');
        setOpen(true);
    });

    console.log('Form submitted:', data);
};


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    
    return (
        <CustomCard>
            <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color: '#FFFFFF' }}>
                    Create New Writing
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomTextField
                                fullWidth
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                fullWidth
                                label="Description"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                fullWidth
                                label="Content"
                                multiline
                                rows={6}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <CustomFormControl fullWidth variant="outlined">
                            <InputLabel>Category</InputLabel>
                            <Select
                                multiple
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                label="Category"
                                renderValue={(selected) => selected.map(id => categories[id].name).join(', ')}
                            >
                                {Object.keys(categories).map(id => (
                                    <MenuItem key={id} value={id}>
                                        {categories[id].name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </CustomFormControl>

                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                fullWidth
                                label="Tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                variant="outlined"
                                placeholder="Comma-separated"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomFormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    label="Status"
                                >
                                    <MenuItem value="draft">Draft</MenuItem>
                                    <MenuItem value="published">Published</MenuItem>
                                    <MenuItem value="private">Private</MenuItem>
                                </Select>
                            </CustomFormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomButton type="submit">
                                Submit
                            </CustomButton>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </CardContent>
        </CustomCard>
    );
};

export default WritingForm;
