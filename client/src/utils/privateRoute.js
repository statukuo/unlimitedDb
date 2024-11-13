
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function PrivateRoute() {
    const { isLoggedIn } = useAuth();
    if (isLoggedIn === undefined) {
        return <p>
            Loading ...
        </p>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
