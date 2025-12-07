import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import { useColorMode } from '@docusaurus/theme-common';

// Simple in-memory storage for development
// In production, this would be replaced with proper authentication state management
let authState = {
  isAuthenticated: false,
  user: null,
  accessToken: null
};

const LoginButton = ({ children, ...props }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authState.isAuthenticated);
  const [user, setUser] = useState(authState.user);
  const location = useLocation();
  const history = useHistory();
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(false);

  // Check for OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');

    if (code) {
      // Remove the code and state from the URL without page reload
      params.delete('code');
      params.delete('state');
      const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}${window.location.hash}`;
      window.history.replaceState({}, document.title, newUrl);

      // Exchange code for token (in a real implementation, this would be done server-side)
      // For this static site implementation, we'll simulate the process
      handleTokenExchange(code, state);
    }
  }, [location]);

  const handleTokenExchange = async (code, state) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would be a server-side call
      // For static site, we'll simulate authentication
      const userData = {
        id: 'test-user-id',
        username: 'testuser',
        email: 'test@example.com',
        avatarUrl: 'https://github.com/avatars/u/1', // Placeholder
      };

      authState = {
        isAuthenticated: true,
        user: userData,
        accessToken: 'fake-token-for-demo' // In real app, this would come from server
      };

      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('authState', JSON.stringify(authState));

      // Redirect to remove OAuth parameters
      history.replace(location.pathname);
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    // Generate a random state for CSRF protection
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Save state in localStorage for validation after redirect
    localStorage.setItem('oauthState', state);

    // Redirect to GitHub OAuth
    // Note: In a real implementation, CLIENT_ID would be configured properly
    const clientId = process.env.GITHUB_CLIENT_ID || 'your-client-id-here';
    const redirectUri = encodeURIComponent(window.location.origin + window.location.pathname);

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email%20gist&state=${state}`;
  };

  const handleLogout = () => {
    authState = {
      isAuthenticated: false,
      user: null,
      accessToken: null
    };

    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authState');
  };

  // Check for stored auth state on initial load
  useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      const parsedState = JSON.parse(storedAuthState);
      authState = parsedState;
      setIsAuthenticated(parsedState.isAuthenticated);
      setUser(parsedState.user);
    }
  }, []);

  if (isLoading) {
    return (
      <button
        className={`button button--${props.type || 'primary'} button--outline`}
        disabled
      >
        Loading...
      </button>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="dropdown dropdown--hoverable dropdown--right">
        <button
          className={`button button--${props.type || 'primary'} button--outline dropdown__trigger`}
          aria-label="User menu"
        >
          <img
            src={user.avatarUrl}
            alt={user.username}
            style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px' }}
          />
          {user.username}
        </button>
        <ul className="dropdown__menu">
          <li>
            <a
              className="dropdown__link"
              href="/dashboard"
            >
              Dashboard
            </a>
          </li>
          <li>
            <button
              className="dropdown__link"
              onClick={handleLogout}
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <button
      className={`button button--${props.type || 'primary'} button--outline`}
      onClick={handleLogin}
      {...props}
    >
      {children || 'Sign in with GitHub'}
    </button>
  );
};

export default LoginButton;