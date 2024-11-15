import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { CircularProgress } from "@mui/material";

export function PrivateRoute() {
    const { isLoggedIn } = useAuth();
    if (isLoggedIn === undefined) {
        return (
            <center>
                <CircularProgress color="inherit" />
            </center>
        );
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
