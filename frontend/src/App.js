import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import { theme } from './material.theme';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/authContext';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './utils/RequireAuth';
import ManageUsers from 'pages/admin/ManageUsers';
import Statistics from 'pages/admin/Statistics';

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/admin"
                element={<RequireAuth authorizedUserRole="ADMIN" />}
              >
                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="stats" element={<Statistics />} />
              </Route>
              <Route
                path="/control"
                element={<RequireAuth authorizedUserRole="CONTROL_OFFICER" />}
              >
                <Route
                  path="index"
                  element={<h1>Control Officer dashboard page</h1>}
                />
              </Route>
              <Route
                path="/ticketing"
                element={<RequireAuth authorizedUserRole="TICKETING_OFFICER" />}
              >
                <Route
                  path="index"
                  element={<h1>Ticketing Officer dashboard page</h1>}
                />
              </Route>
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
