import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './contexts/AuthContext';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import '@fontsource/roboto';
import './styles/index.css';
import { PrivateRoute } from './utils/privateRoute';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { UserPage } from './pages/UserPage';
import { CollectionProvider } from './contexts/CollectionContext';
import { CollectionPage } from './pages/CollectionPage';
import { CardListProvider } from './contexts/CardContext';
import { CardListPage } from './pages/CardListPage';
import { DeckDetails } from './pages/DeckDetails';
import { CardViewPage } from './pages/CardViewPage';
import { DeckCreatorPage } from './pages/DeckCreatorPage';
import { DeckEditorPage } from './pages/DeckEditorPage';

const router = createBrowserRouter([
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
      },
      {
        path: '/deck/create',
        element: <DeckCreatorPage />
      },
      {
        path: '/deck/edit/:deckId',
        element: <DeckEditorPage />
      }
    ]
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/cards",
    element: <CardListPage />,
  },
  {
    path: "/cards/:id",
    element: <CardViewPage />,
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
    path: "/deck/:deckId",
    element: <DeckDetails />,
  },
]);

let theme = createTheme();
theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  </StyledEngineProvider>
);
