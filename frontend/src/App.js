import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import { theme } from './material.theme';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/authContext';
function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Login />
          </AuthProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
