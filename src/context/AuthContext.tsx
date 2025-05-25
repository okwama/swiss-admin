import React, { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email: string, password: string) => {
    // This is a demo login - in a real app, this would be an API call
    if (email === 'admin@swisslife.com' && password === 'demo123') {
      const user = {
        id: '1',
        name: 'Admin User',
        email: 'admin@swisslife.com',
        role: 'Administrator',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return Promise.resolve();
    }
    return Promise.reject('Invalid credentials');
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  return <AuthContext.Provider value={{
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export const ProtectedRoute: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const {
    isAuthenticated,
    isLoading
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', {
        state: {
          from: location
        },
        replace: true
      });
    }
  }, [isAuthenticated, isLoading, navigate, location]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? <>{children}</> : null;
};