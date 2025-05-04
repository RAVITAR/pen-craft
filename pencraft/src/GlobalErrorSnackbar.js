import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useAuth } from './AuthContext';

const GlobalErrorSnackbar = () => {
    const { error, setError } = useAuth();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(null); // Reset error state when the snackbar is closed
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    );
};

export default GlobalErrorSnackbar;
