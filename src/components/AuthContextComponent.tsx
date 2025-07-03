import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import {getMe, loginAccount, logoutAccount } from '../services/AccountService';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* function to return authentication state and functions {isAuthenticated, login, logout};
 components that call useAuth can access these;
 useAuth should be used, so that multiple components can get access to variables and funtions at the same state */
 export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* check Auth-Status at start time; useEffect is only executed once */
  useEffect(() => {
      /* get request checks if there is a valid token and return current username */
      getMe().then((response) => {
        setIsAuthenticated(true);
        setUsername(response.data.username);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUsername(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  /* login request: cookie is set from server; 
  useCallback prevents new declaration of function when rendering, if nothing has changed */
  const login = useCallback(async (username: string, password: string) => {
    try {
      await loginAccount({ username, password });
      /* check for valid token and return username */
      const res = await getMe();
      setIsAuthenticated(true);
      setUsername(res.data.username);
    } catch (err: any) {
      /* pass error to LoginComponent */
      throw err;
    }
  }, []);

  /* logout request: cookie is deleted */
  const logout = useCallback(async () => {
    try {
      await logoutAccount();
      
      /* reset status in frontend */
      setIsAuthenticated(false);
      setUsername(null);
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    username,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
