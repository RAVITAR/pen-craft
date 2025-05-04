import { CircularProgress } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Footer from './components/Footer'; // Ensure correct import
import Header from './components/Header'; // Ensure correct import


const Layout = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    const Navigate = useNavigate();
    
    // Define paths where the header and footer should not be displayed
    const noHeaderFooterPaths = ['/authorLogin', '/authorRegistration', '/'];

    // Check if the current path is one of the paths where no header/footer should be displayed
    const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);


    if (loading) {
        return <CircularProgress />;
    }

    if (!isAuthenticated && !noHeaderFooterPaths.includes(location.pathname)) {
        return <Navigate to="/authorLogin" replace />;
    }

    return (
        <>
        {showHeaderFooter && <Header />}
        {children}
        {showHeaderFooter && <Footer />}
        </>
    );
};

export default Layout;
