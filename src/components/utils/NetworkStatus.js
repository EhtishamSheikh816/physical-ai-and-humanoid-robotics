import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionSpeed, setConnectionSpeed] = useState('unknown');

  useEffect(() => {
    // Check network connection type
    const checkConnection = () => {
      if ('connection' in navigator) {
        const connection = navigator.connection;
        setConnectionSpeed(connection.effectiveType || 'unknown');
      } else {
        setConnectionSpeed('unknown');
      }
    };

    // Event listeners for online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      checkConnection();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial connection status
    setIsOnline(navigator.onLine);
    checkConnection();

    // Cleanup event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && connectionSpeed === 'slow-2g') {
    return (
      <div className="alert alert--warning" role="alert">
        <div className="alert__content">
          <h5>Slow Connection Detected</h5>
          <p>Your connection appears to be slow. Some features may load slowly.</p>
        </div>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="alert alert--danger" role="alert">
        <div className="alert__content">
          <h5>Offline Mode</h5>
          <p>You are currently offline. Some features may not be available.</p>
        </div>
      </div>
    );
  }

  return null;
};

export default NetworkStatus;