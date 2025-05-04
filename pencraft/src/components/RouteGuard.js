    import React from 'react';
import { Navigate, Route } from 'react-router-dom';

    const ProtectedRoute = ({ element, isAuthenticated, ...rest }) => {
    return (
        <Route
        {...rest}
        element={isAuthenticated ? element : <Navigate to="/authorLogin" replace />}
        />
    );
    };

    export default ProtectedRoute;
