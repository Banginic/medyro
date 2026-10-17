import React from "react";

interface ErrorFallbackProps {
  error?: Error;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => (
  <div style={{ textAlign: "center", padding: "2rem" }}>
    <h2>Oops! Something went wrong.</h2>
    {error && <p style={{ color: "red" }}>{error.message}</p>}
    <button onClick={() => window.location.reload()}>Reload Page</button>
  </div>
);

export default ErrorFallback;
