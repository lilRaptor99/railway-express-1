import React, { useContext } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);

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
