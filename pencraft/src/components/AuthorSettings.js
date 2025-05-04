import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button, CircularProgress, Container, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useAuth } from '../AuthContext'; // Adjust path as necessary
import backgroundImage from './background.jpg'; // Ensure the path is correct

const CarouselContainer = styled('div')(({ theme }) => `
    margin-top: 20px;
    .slick-slide > div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 250px; // Fixed height for all slides
    }
    .slick-slide img {
        max-width: 100%;
        max-height: 100%;
        display: block;
    }
    .slick-prev, .slick-next {
        z-index: 1;
        top: 50%;
        transform: translateY(-50%);
    }
    .slick-prev:before, .slick-next:before {
        font-size: 30px;
    }
    .slick-dots {
        bottom: -35px;
    }
    .slick-dots li button:before {
        font-size: 12px;
    }
    .slick-dots li.slick-active button:before {
        color: ${theme.palette.primary.main};
    }
`);

    const Background = styled('div')(({ theme }) => ({
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: theme.spacing(2.5),
    }));

    function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <NavigateNextIcon
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
        />
    );
    }

    function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <NavigateBeforeIcon
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
        />
    );
    }


    const profilePics = [
        'profile.1.jpeg',
        'profile.2.jpeg',
        'profile.3.jpeg',
        'profile.4.jpeg',
        'profile.5.jpeg',
        'profile.6.jpeg',
        'profile.7.jpeg',
        'profile.8.jpeg',
        'profile.9.jpeg',
        'profile.10.jpeg',
    ];

    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
    };

    const AuthorSettings = () => {
        const { authorId } = useAuth();
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            bio: '',
            website: '',
            contactEmail: '',
            phoneNumber: '',
            profilePicture: ''
        });
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState('');
        const [profilePictures, setProfilePictures] = useState([]);

        useEffect(() => {
            const fetchAuthorDetails = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`http://localhost:5000/api/author/${authorId}`);
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.message || 'Failed to fetch author details');
                    setFormData(data); // Assumes API response keys perfectly match the formData state
                    setLoading(false);
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            };

            const fetchProfilePictures = async () => {
                try {
                    const response = await fetch('/public/Images/profile_pics');
                    const data = await response.json(); // Make sure the server sends data in a way that the client expects
                    setProfilePictures(data.map(pic => ({ url: `/public/Images/profile_pics/${pic.filename}` })));
                } catch (error) {
                    console.error('Failed to fetch profile pictures:', error);
                }
            };

            fetchAuthorDetails();
            fetchProfilePictures();
        }, [authorId]);

        const handleChange = (event) => {
            const { name, value } = event.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        const handleSubmit = async (event) => {
            event.preventDefault();
            if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
                setError("Please provide a valid email.");
                return;
            }
            
            setLoading(true);
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
        
            try {
                const response = await fetch(`http://localhost:5000/api/author/${authorId}`, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Failed to update author.');
                alert('Author updated successfully!');
                setError('');
            } catch (error) {
                setError(`Failed to update author: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        

        if (loading) return <CircularProgress />;

        return (
            <Background>
                <Container component="main" maxWidth="md">
                    <Paper elevation={6} sx={{ p: 4, mt: 8 }}>
                        <Typography component="h1" variant="h5" marginBottom={2}>
                            Update Author Profile
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Bio"
                                variant="outlined"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                            />
                            <TextField
                                label="Website"
                                variant="outlined"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Contact Email"
                                variant="outlined"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        <CarouselContainer>
                            <Slider {...settings}>
                                {profilePics.map((pic, index) => (
                                    <div
                                    key={index}
                                    className={formData.profilePicture === `/Images/profile_pics/${pic}` ? 'active' : ''}
                                    onClick={() => setFormData(prev => ({...prev, profilePicture: `/Images/profile_pics/${pic}`}))}
                                    >
                                        <img src={`/Images/profile_pics/${pic}`} alt={`Profile ${index}`} style={{ width: "100%", height: "auto", border: formData.profilePicture === `/Images/profile_pics/${pic}` ? '2px solid blue' : '' }} />
                                    </div>
                                ))}
                            </Slider>
                        </CarouselContainer>
                            {error && <Typography color="error">{error}</Typography>}
                            <Button type="submit" color="primary" variant="contained" style={{ marginTop: 20 }}>Save Changes</Button>
                        </form>
                    </Paper>
                </Container>
            </Background>
        );
    };

    export default AuthorSettings;
