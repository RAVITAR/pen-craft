import {
    Card,
    CardContent,
    CardMedia,
    CircularProgress, Grid,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const CategoriesTab = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/categories'); // Update with the correct API endpoint
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error" style={{ padding: 16 }}>{error}</Typography>;
    if (categories.length === 0) return <Typography style={{ padding: 16 }}>No categories available.</Typography>;

    return (
        <Grid container spacing={2} style={{ padding: 16 }}>
            {categories.map((category) => (
                <Grid item xs={12} sm={6} md={4} key={category._id}>
                    <Card>
                        {category.imageUrl && (
                            <CardMedia
                                component="img"
                                height="140"
                                image={category.imageUrl}
                                alt={category.name}
                            />
                        )}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {category.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {category.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CategoriesTab;
