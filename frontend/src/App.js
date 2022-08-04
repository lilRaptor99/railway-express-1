import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import { theme } from './material.theme';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/authContext';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './utils/RequireAuth';

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
                element={
                  <RequireAuth authorizedUserRole="ADMIN">
                    <h1>Admin dashboard page</h1>
                  </RequireAuth>
                }
              />
              <Route
                path="/control"
                element={
                  <RequireAuth authorizedUserRole="CONTROL_OFFICER">
                    <h1>Control Officer dashboard page</h1>
                  </RequireAuth>
                }
              />
              <Route
                path="/ticketing"
                element={
                  <RequireAuth authorizedUserRole="TICKETING_OFFICER">
                    <h1>Ticketing Officer dashboard page</h1>
                  </RequireAuth>
                }
              />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
