import React from 'react';
import { Redirect, useLocation } from '@docusaurus/router';
import { useColorMode } from '@docusaurus/theme-common';

// AuthMiddleware component to protect premium content
const AuthMiddleware = ({ children, requireAuth = true, fallbackUrl = '/login' }) => {
  const location = useLocation();
  const { colorMode } = useColorMode();

  // Check authentication status
  const isAuthenticated = () => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      const authState = JSON.parse(storedAuthState);
      return authState.isAuthenticated && authState.user;
    }
    return false;
  };

  const authStatus = isAuthenticated();

  // If the page requires authentication and user is not authenticated
  if (requireAuth && !authStatus) {
    // Store the current location to redirect back after login
    localStorage.setItem('redirectAfterLogin', location.pathname + location.search);
    return <Redirect to={fallbackUrl} />;
  }

  // If the page requires the user to NOT be authenticated (e.g., login page)
  if (!requireAuth && authStatus) {
    return <Redirect to="/dashboard" />;
  }

  return <>{children}</>;
};

// Higher-order component for protecting routes
export const withAuthProtection = (Component, options = {}) => {
  const { requireAuth = true, fallbackUrl = '/login' } = options;

  return (props) => (
    <AuthMiddleware requireAuth={requireAuth} fallbackUrl={fallbackUrl}>
      <Component {...props} />
    </AuthMiddleware>
  );
};

// Hook for checking authentication status in functional components
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      const authState = JSON.parse(storedAuthState);
      setIsAuthenticated(authState.isAuthenticated);
      setUser(authState.user || null);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    const authState = {
      isAuthenticated: true,
      user: userData,
      accessToken: token
    };
    localStorage.setItem('authState', JSON.stringify(authState));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authState');
    localStorage.removeItem('oauthState');

    // Clear all progress data
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('progress_')) {
        localStorage.removeItem(key);
      }
    });

    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, user, loading, login, logout };
};

export default AuthMiddleware;