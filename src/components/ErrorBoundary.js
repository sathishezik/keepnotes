import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fallback method when an error is thrown
  const onError = (error) => {
    setHasError(true);
    setErrorMessage(error.message);
  };

  useEffect(() => {
    const handleError = (error) => {
      onError(error);
    };

    // event listener to handle global error
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div className="error-boundary">
        <h2>Something went wrong.</h2>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
