import React from 'react';
import Header from '../components/Header';
import AppSidebar from '../components/AppSidebar';
import { Container, Row, Col } from 'react-bootstrap';
import '../layouts/MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <Container fluid className="content">
      {/* Header */}
      <Row className="header">
        <Col>
          <Header />
        </Col>
      </Row>

      {/* Main content area */}
      <Row className="h-100">
        {/* Sidebar */}
        <Col xs={2} className="sidebar">
          <AppSidebar />
        </Col>

        {/* Main content area */}
        <Col xs={10} className="dashboard">
          {children} {/* Render dynamic content (Dashboard, Overview, About) here */}
        </Col>
      </Row>
    </Container>
  );
};

export default MainLayout;
