import React, { useState, useEffect, useContext } from "react";
import { Card, Badge, Container, Row, Col, Alert } from "react-bootstrap";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaPauseCircle } from "react-icons/fa";
import axios from "axios";
import { ServicesContext } from "../contexts/ServicesContext";

const Overview = () => {
  const { services, setServices } = useContext(ServicesContext);

  const apiUrl = "http://localhost:5000/services";

  useEffect(() => {
    axios.get(apiUrl)
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const statusOptions = [
    { label: "Operational", color: "success", icon: <FaCheckCircle />, value: 1 },
    { label: "Degraded Performance", color: "warning", icon: <FaExclamationTriangle />, value: 0.8 },
    { label: "Partial Outage", color: "danger", icon: <FaTimesCircle />, value: 0.5 },
    { label: "Major Outage", color: "dark", icon: <FaPauseCircle />, value: 0 },
  ];

    const renderStatus = (status) => {
      const option = statusOptions.find((opt) => opt.label === status) || statusOptions[0];  // Default to 'Operational' if status is empty or invalid
      return (
        <Badge bg={option.color} className="d-flex align-items-center gap-2">
          {option.icon} {status || "Operational"}  {/* Fallback to 'Operational' if status is empty */}
        </Badge>
      );
    };

  const getAverageStatus = () => {
    const majorOutages = services.filter(service => service.status === "Major Outage").length;
    const degraded = services.filter(service => service.status === "Degraded Performance" || service.status === "Partial Outage").length;
    if (majorOutages > 0) return "Site is Down";
    if (degraded > 0) return "Some features not working";
    return "All services operational";
  };

  const percentageOperational = () =>  {
    const totalServices = services.length;
    if (totalServices === 0) return 0;

    const weightedSum = services.reduce((sum, service) => {
      const statusValue = statusOptions.find((opt) => opt.label === service.status)?.value || 0;
      return sum + statusValue;
    }, 0);

    return ((weightedSum / totalServices) * 100).toFixed(2);
  };

  return (
    <Container>
      <Alert variant={getAverageStatus() === "All services operational" ? "success" : getAverageStatus() === "Site is Down" ? "danger" : "warning"}>
        <strong>{getAverageStatus()} ({percentageOperational()}%)</strong>
      </Alert>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {services.map((service) => (
          <Col key={service.id}>
            <Card>
              <Card.Body>
                <Card.Title>{service.serviceName}</Card.Title>
                <Card.Text>
                  <strong>Status: </strong>
                  {renderStatus(service.status)}
                </Card.Text>
                <Card.Text>
                  <strong>Last Updated: </strong>
                  {service.lastUpdated}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Overview;
