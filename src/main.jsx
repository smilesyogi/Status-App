import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App wrapped with Auth0Provider
root.render(
  <Auth0Provider
    domain="dev-sull3d56n40n7sxd.us.auth0.com"
    clientId="VHQ4oXOQkd49dCXPacj4ZubYT74Ne5SV"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);