import React from 'react';

const LoadingSpinner = ({ message = 'Loading...', showSlowConnectionMessage = false }) => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-message">{message}</p>
      {showSlowConnectionMessage && (
        <p className="slow-connection-message">
          This is taking longer than expected. Please check your internet connection.
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;