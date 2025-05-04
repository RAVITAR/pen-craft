import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

    const WritingCard = ({ title, description, banner, link }) => {
    return (
        <Card>
        {/* Display the banner image if available */}
        {banner && (
            <CardMedia
            style={{ height: 200 }} // Set the height of the banner image
            image={banner}
            title={title}
            />
        )}
        <CardContent>
            {/* Title of the writing */}
            <Typography gutterBottom variant="h5" component="h2">
            {title}
            </Typography>
            {/* Short description of the writing */}
            <Typography variant="body2" color="textSecondary" component="p">
            {description}
            </Typography>
            {/* Button to view the full writing */}
            <Button variant="contained" color="primary" href={link} target="_blank" rel="noopener noreferrer">
            View Writing
            </Button>
        </CardContent>
        </Card>
    );
    };

    export default WritingCard;
