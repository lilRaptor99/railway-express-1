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
import TrainLocation from 'pages/controlOfficer/TrainLocation';
import AddTurn from 'pages/controlOfficer/AddTurn';
import NormalTickets from 'pages/ticketingOfficer/NormalTickets';
import SeasonTickets from 'pages/ticketingOfficer/SeasonTickets';
import AddAccounts from 'pages/admin/AddAccounts';
import Tickets from 'pages/admin/Tickets';

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
                <Route path="stats" element={<Statistics />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="add-account" element={<AddAccounts />} />
                <Route path="manage-users" element={<ManageUsers />} />
              </Route>
              <Route
                path="/control"
                element={<RequireAuth authorizedUserRole="CONTROL_OFFICER" />}
              >
                <Route path="train-location" element={<TrainLocation />} />
                <Route path="add-turn" element={<AddTurn />} />
              </Route>
              <Route
                path="/ticketing"
                element={<RequireAuth authorizedUserRole="TICKETING_OFFICER" />}
              >
                <Route path="normal" element={<NormalTickets />} />
                <Route path="season" element={<SeasonTickets />} />
              </Route>
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
