import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      style={{ padding: '10px 20px', fontSize: '16px' }}
    >
      Log In
    </button>
  );
};

export default LoginButton;