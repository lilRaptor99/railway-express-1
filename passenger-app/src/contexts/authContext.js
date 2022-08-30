import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import request, { setUserToken } from '../utils/request';

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);

  async function login(email, password) {
    try {
      const res = await request('post', '/login', {
        email,
        password,
      });
      // @ts-ignore
      await setCurrentUser(res.data);
      setUserToken(res.data.token);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async function logout() {
    // @ts-ignore
    await setCurrentUser(null);
  }

  const value = {
    currentUser,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
