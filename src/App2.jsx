import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ServicesProvider } from './contexts/ServicesContext';
import { Button } from './components/ui/button';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import Overview from './components/Overview';
import About from './components/About';
import AdminUserManager from './components/AdminUserManager';

const App = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <ServicesProvider>
      <Router>
        <div style={{ textAlign: 'center' }}>
          {!isAuthenticated && <h1>Status Page App</h1>}
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <ProtectedRoute>
                    <MainLayout>
                      <Dashboard user={user} />
                    </MainLayout>
                  </ProtectedRoute>
                ) : (
                  <Button onClick={() => loginWithRedirect()} variant="primary">
                    Login
                  </Button>
                )
              }
            />

            {/* Protect the routes with ProtectedRoute */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard user={user} />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Render Overview inside MainLayout */}
            <Route
              path="/overview"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Overview />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Render About inside MainLayout */}
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <About />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/owner"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <AdminUserManager />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ServicesProvider>
  );
};

export default App;
