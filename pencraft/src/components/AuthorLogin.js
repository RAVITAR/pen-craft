import {
    Button,
    CircularProgress,
    Fade,
    Link as MuiLink,
    TextField,
    ThemeProvider,
    Typography,
    createTheme
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import backgroundImage from './background.jpg';

    const theme = createTheme({
    palette: {
        primary: {
        main: '#00bcd4',
        },
        error: {
        main: '#ff1744',
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
        // This ensures the error is contained within the formContainer
        position: 'relative', // Override any potential absolute positioning
        width: '100%', // Keep it within the confines of its parent
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2), // Add some space below the error message
        color: theme.palette.error.main,
        textAlign: 'center',
        zIndex: 2, // Ensure it's above other elements within the formContainer
    },
    link: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
    }));

const AuthorLogin = ({ }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { login, error } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        await login(formData, navigate);
        setLoading(false);
    };

    return (
        <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <Fade in={true} timeout={1500}>
            <div className={classes.formContainer}>
                <Typography variant="h1" className={classes.title}>
                Author Login
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
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
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                </Button>
                {error && <Typography variant="body2" className={classes.error}>{error}</Typography>}
                </form>
                <Typography variant="body2" className={classes.link}>
                Don't have an account?{' '}
                <MuiLink component={RouterLink} to="/AuthorRegistration">
                    Sign up
                </MuiLink>
                </Typography>
            </div>
            </Fade>
        </div>
        </ThemeProvider>
    );
    };


    export default AuthorLogin;
