import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const navigate = useNavigate();

  // Redirects the authorized user to the relevant dashboard page
  useEffect(() => {
    switch (currentUser?.role) {
      case 'ADMIN':
        navigate('/admin', { replace: true });
        break;
      case 'CONTROL_OFFICER':
        navigate('/control', { replace: true });
        break;
      case 'TICKETING_OFFICER':
        navigate('/ticketing', { replace: true });
        break;
      default:
        navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  async function login(email, password) {
    try {
      const res = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
      });
      setCurrentUser(res.data);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  function logout() {
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
