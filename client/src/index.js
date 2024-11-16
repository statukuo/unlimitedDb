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
import { LoginPage } from './pages/LoginPage';
import { UserPage } from './pages/UserPage';
import { CollectionProvider } from './contexts/CollectionContext';
import { CollectionPage } from './pages/CollectionPage';
import { CardListProvider } from './contexts/CardContex';
import { CardListPage } from './pages/CardListPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/cards",
    element: <CardListPage />,
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
        path: '/user',
        element: <UserPage />
      },
      {
        path: '/collection',
        element: <CollectionPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <AuthProvider>
        <CollectionProvider>
          <CardListProvider>
            <CssBaseline />
            <RouterProvider router={router} />
          </CardListProvider>
        </CollectionProvider>
      </AuthProvider>
    </React.StrictMode>
  </StyledEngineProvider>
);
