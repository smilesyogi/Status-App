import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'; // For user icon

const Header = () => {
  const { user, logout } = useAuth0();

  return (
    <Navbar expand="lg" className="header">
      <Navbar.Brand href="/">
        <img
          src="https://cdn.prod.website-files.com/6565737286e587567248583f/658bda1ae4a7e50a9a49ce74_ic-backup-encryption.svg" // Placeholder for the logo
          alt="Logo"
          className="logo"
        />
      </Navbar.Brand>
      <Navbar.Text className="app-name">Status Page App</Navbar.Text>
      
      <Nav className="ms-auto align-items-center">
        {user ? (
          <>
            <Nav.Item className="d-flex align-items-center position-relative">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="rounded-circle me-2"
                  style={{ width: '24px', height: '24px' }}
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title={user.name}
                />
              ) : (
                <FaUserCircle
                  size={24}
                  className="me-2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title={user.name}
                />
              )}
            </Nav.Item>
            <Nav.Item>
              <Button
                variant="outline-danger"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log Out
              </Button>
            </Nav.Item>
          </>
        ) : (
          <Nav.Item>
            <Button variant="outline-primary">Log In</Button>
          </Nav.Item>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;