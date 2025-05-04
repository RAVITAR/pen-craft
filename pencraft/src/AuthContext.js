import { jwtDecode } from 'jwt-decode';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const getToken = () => localStorage.getItem('token');

const saveToken = (token) => localStorage.setItem('token', token);

const clearToken = () => localStorage.removeItem('token');

const isValidToken = (token) => {
    // Check if the token has three parts, implying a well-formed JWT
    return token && token.split('.').length === 3;
};

const decodeToken = (token) => {
    if (!isValidToken(token)) {
        throw new Error('Invalid token: Token does not have the expected format.');
    }
    const decoded = jwtDecode(token);
    if (!decoded.userId) {  // Ensure userId is present
        console.error('Decoded token is missing the userId:', decoded);
        throw new Error('Decoded token payload is missing the userId');
    }
    return decoded;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = getToken();
        if (isValidToken(token)) {
            try {
                const decoded = decodeToken(token);
                // Map 'userId' to 'authorId' when setting the author state
                setAuthor({ ...decoded, authorId: decoded.userId, token });
                setIsAuthenticated(true);
            } catch (error) {
                setError(error.message);
                console.error('Error setting the author:', error);
            }
        }
        setLoading(false);
    }, []);

    const login = useCallback(async (credentials, navigate) => {
        setLoading(true);
        try {
            // Clear any existing token before making a new login request
            clearToken();
    
            const response = await fetch('http://localhost:5000/api/author/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(credentials)
            });
    
            const data = await response.json();
            if (response.ok) {
                saveToken(data.token); // Save the new token
                const decoded = decodeToken(data.token);
                // Map 'userId' to 'authorId' when setting the author state
                setAuthor({ ...decoded, authorId: decoded.userId, token: data.token });
                setIsAuthenticated(true);
                setError(null);
                navigate('/writingPortfolio');
            } else {
                setError(data.message || 'Failed to log in with provided credentials.');
            }
        } catch (error) {
            setError('Network error, unable to connect.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    }, []);
    

    const logout = useCallback(() => {
        clearToken();
        setAuthor(null);
        setIsAuthenticated(false);
        console.log('Logged out successfully.');
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            authorId: author ? author.authorId : null, // Provide authorId for consistent naming across components
            author, // Provide full author object if needed
            loading,
            error,
            setIsAuthenticated,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
