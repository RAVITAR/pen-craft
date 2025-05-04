import { Button, CircularProgress, Link, TextField, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import backgroundImage from './background.jpg';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00bcd4', // Cyan color
        },
        error: {
            main: '#ff1744', // Error color
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    formContainer: {
        maxWidth: 400,
        width: '100%',
        padding: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[5],
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        width: '100%',
        marginBottom: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(2),
        width: '100%',
        maxWidth: 200,
        backgroundColor: '#FF8C00',
        padding: theme.spacing(1.5),
    },
    title: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(3),
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    },
    error: {
        marginTop: theme.spacing(2),
        color: theme.palette.error.main,
        textAlign: 'center',
    },
    link: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
}));

const AuthorRegistration = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/author/register', formData);
            if (response.status === 201) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                window.location.href = '/authorDashboard'; // Navigate after successful registration
            } else {
                throw new Error('Unexpected response status: ' + response.status);
            }
        } catch (error) {
            if (error.response) {
                // Check if the response has a specific error message
                const errorMessage = error.response.data.message || error.response.data;
                console.error('Registration error:', error.response.status, errorMessage);
                switch (error.response.status) {
                    case 400:
                        // Check for specific error messages
                        if (errorMessage.toLowerCase().includes('email already exists')) {
                            setError('Email already exists. Please use a different email.');
                        } else {
                            setError(errorMessage || 'Please check your input.'); // Use the server's message or a generic message
                        }
                        break;
                    default:
                        setError('An error occurred during registration. Please try again later.'); // Other unknown errors
                }
            } else {
                console.error('Error:', error.message);
                setError('Network error, please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };
    
    
    

    return (
        <div className={classes.root}>
            <Fade in={true} timeout={1500}>
                <div className={classes.formContainer}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h1" className={classes.title}>
                            Author Registration
                        </Typography>
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <TextField
                                type="text"
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                variant="outlined"
                                className={classes.textField}
                                required
                                placeholder="Enter your name"
                            />
                            <TextField
                                type="email"
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                variant="outlined"
                                className={classes.textField}
                                required
                                placeholder="Enter your email"
                            />
                            <TextField
                                type="password"
                                label="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                variant="outlined"
                                className={classes.textField}
                                required
                                placeholder="Enter your password"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                            </Button>
                            {error && <Typography variant="body2" className={classes.error}>{error}</Typography>}
                        </form>
                        <Typography variant="body2" className={classes.link}>
                            Already have an account?{' '}
                            <Link component={RouterLink} to="/AuthorLogin">
                                Sign in
                            </Link>
                        </Typography>
                    </ThemeProvider>
                </div>
            </Fade>
        </div>
    );
};

export default AuthorRegistration;
