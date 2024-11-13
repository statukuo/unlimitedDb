import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { AuthProvider } from './contexts/AuthContext';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto';
import './styles/index.css';

import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { PrivateRoute } from './utils/privateRoute';
import { AdminBatchUpdate } from './pages/AdminBatchUpdate';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
  <React.StrictMode>
    <AuthProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
