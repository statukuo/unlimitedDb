import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './contexts/AuthContext';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import '@fontsource/roboto';
import './styles/index.css';
import { PrivateRoute } from './utils/privateRoute';

import { LandingPage } from './pages/LandingPage';
import { AdminBatchUpdate } from './pages/AdminBatchUpdate';
import { LoginPage } from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <LoginPage registerMode />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/batchUpdate',
        element: <AdminBatchUpdate />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <AuthProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  </StyledEngineProvider>
);
