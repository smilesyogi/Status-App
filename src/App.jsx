import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ServicesProvider } from './contexts/ServicesContext';
import LoginButton from './components/LoginButton';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Overview from './components/Overview';
import About from './components/About';
import AdminUserManager from './components/AdminUserManager';

// New imports
import Teams from './components/Teams';
import Settings from './components/Settings';
import Maintenance from './components/Maintenance';
import Incidents from './components/Incidents';

const App = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <ServicesProvider>
      <Router>
        <div>
          {isAuthenticated ? '' : <h1 style={{ textAlign: 'center' }}>Status Page App</h1>}
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
                  <div style={{ textAlign: 'center' }}>
                    <LoginButton />
                  </div>
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

            {/* Render Admin User Manager inside MainLayout */}
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

            {/* New Routes */}
            <Route
              path="/teams"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Teams />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/maintenance"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Maintenance />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/incidents"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Incidents />
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
