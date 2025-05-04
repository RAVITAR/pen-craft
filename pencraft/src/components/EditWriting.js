import { Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from './background.jpg';

const Background = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 20px;
`;

const EditWriting = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [writing, setWriting] = useState({
        title: '',
        description: '',
        content: '',
        tags: [],
        status: '',
        categoryId: ''
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        let active = true;
    
        const fetchDetails = async () => {
            try {
                const [writingRes, categoriesRes] = await Promise.all([
                    axios.get(`/api/writings/${id}`),
                    axios.get('/api/categories')
                ]);
    
                if (active) {
                    const categoriesData = categoriesRes.data;
                    setCategories(categoriesData);
    
                    const categoryIds = writingRes.data.categoryId;
                    // Check if the current categoryId is valid or set a default
                    const validCategoryId = categoriesData.some(cat => categoryIds.includes(cat._id)) ? categoryIds[0] : '';
    
                    setWriting({
                        ...writingRes.data,
                        tags: writingRes.data.tags.join(', '),
                        categoryId: validCategoryId
                    });
                }
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };
    
        fetchDetails();
    
        // Cleanup function to prevent setting state on an unmounted component
        return () => {
            active = false;
        };
    }, [id]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWriting(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedWriting = {
            ...writing,
            tags: writing.tags.split(',').map(tag => tag.trim())
        };
        axios.put(`http://localhost:5000/api/writings/${id}`, updatedWriting)
            .then(() => {
                setSuccessMessage('Changes saved successfully!');
                // Optionally navigate after a delay
                setTimeout(() => navigate('/AuthorDashboard'), 2000);
            })
            .catch(error => {
                console.error('Error updating writing:', error);
                setSuccessMessage('Failed to save changes.');
            });
    };
    

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/api/writings/${id}`)
            .then(() => {
                setSuccessMessage('Writing deleted successfully!');
                navigate('/AuthorDashboard');
            })
            .catch(error => console.error('Error deleting writing:', error));
    };

    return (
        <Background>
            <Container component="main" maxWidth="md">
                <Paper elevation={6} sx={{ p: 4, mt: 8 }}>
                    <Typography component="h1" variant="h5" marginBottom={2}>
                        Edit Writing
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Title"
                            name="title"
                            value={writing.title}
                            onChange={handleChange}
                            autoFocus
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Description"
                            name="description"
                            value={writing.description}
                            onChange={handleChange}
                            multiline
                            rows={2}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Content"
                            name="content"
                            value={writing.content}
                            onChange={handleChange}
                            multiline
                            rows={8}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Tags (comma-separated)"
                            name="tags"
                            value={writing.tags}
                            onChange={handleChange}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="categoryId"
                                value={writing.categoryId}
                                label="Category"
                                onChange={handleChange}
                                multiple={false} // Set to true if multiple selection is required
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Stack direction="row" spacing={1} mb={2}>
                            <Button variant="contained" color="primary" type="submit">
                                Save Changes
                            </Button>
                            <Button variant="outlined" color="error" onClick={handleDelete}>
                                Delete Writing
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Background>
    );
};

export default EditWriting;
