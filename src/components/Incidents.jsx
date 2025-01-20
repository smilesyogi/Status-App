import React, { useState, useEffect, useContext } from "react";
import { Table, Badge, Form, Alert, Button } from "react-bootstrap";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { ServicesContext } from "../contexts/ServicesContext";

const Incidents = () => {
    const { user } = useAuth0(); // Get Auth0 user
    const { services, setServices } = useContext(ServicesContext);
    const [incidents, setIncidents] = useState([]);
    const [newIncident, setNewIncident] = useState({ title: "", description: "", serviceId: "" });
    const [isAdmin, setIsAdmin] = useState(false);
  
    const incidentsApiUrl = "http://localhost:5000/incidents";
    const adminCheckUrl = "http://localhost:5000/admin_emails";
  
    const incidentStatusOptions = [
      { label: "Investigating", color: "warning", icon: <FaExclamationTriangle /> },
      { label: "Identified", color: "danger", icon: <FaTimesCircle /> },
      { label: "Resolved", color: "success", icon: <FaCheckCircle /> },
    ];
  
    // Check admin status
    useEffect(() => {
      if (user?.email) {
        axios
          .get(`${adminCheckUrl}?email=${encodeURIComponent(user.email)}`)
          .then((response) => {
            setIsAdmin(response.data.some((admin) => admin.email === user.email));
          })
          .catch((error) => console.error("Error checking admin status:", error));
      }
    }, [user]);
  
    // Fetch incidents
    useEffect(() => {
      axios
        .get(incidentsApiUrl)
        .then((response) => setIncidents(response.data))
        .catch((error) => console.error("Error fetching incidents:", error));
    }, []);
  
    const handleAddIncident = () => {
      if (newIncident.title && newIncident.description && newIncident.serviceId) {
        axios
          .post(incidentsApiUrl, {
            ...newIncident,
            status: "Investigating",
            createdAt: new Date().toLocaleString(),
            lastUpdated: new Date().toLocaleString(),
          })
          .then(() => {
            axios
              .get(incidentsApiUrl)
              .then((response) => {
                setIncidents(response.data);
                setNewIncident({ title: "", description: "", serviceId: "" });
              })
              .catch((error) => console.error("Error refreshing incidents:", error));
          })
          .catch((error) => console.error("Error adding incident:", error));
      }
    };
  
    const handleStatusChange = (id, newStatus) => {
      const incidentToUpdate = incidents.find((incident) => incident.id === id);
  
      if (incidentToUpdate) {
        axios
          .put(`${incidentsApiUrl}/${id}`, {
            ...incidentToUpdate,
            status: newStatus,
            lastUpdated: new Date().toLocaleString(),
          })
          .then(() => {
            setIncidents((prevIncidents) =>
              prevIncidents.map((incident) =>
                incident.id === id ? { ...incident, status: newStatus, lastUpdated: new Date().toLocaleString() } : incident
              )
            );
          })
          .catch((error) => console.error("Error updating status:", error));
      }
    };
  
    const handleDeleteIncident = (id) => {
      axios
        .delete(`${incidentsApiUrl}/${id}`)
        .then(() => {
          setIncidents((prevIncidents) => prevIncidents.filter((incident) => incident.id !== id));
        })
        .catch((error) => console.error("Error deleting incident:", error));
    };
  
    const renderStatus = (status) => {
      const option = incidentStatusOptions.find((opt) => opt.label === status) || incidentStatusOptions[0];
      return (
        <Badge bg={option.color} className="d-flex align-items-center gap-2">
          {option.icon} {status || "Investigating"} {/* Fallback to 'Investigating' */}
        </Badge>
      );
    };
  
    return (
      <div style={{ textAlign: "center" }}>
        <Alert variant="info">
          <strong>Incidents Management</strong>
        </Alert>
        {isAdmin && (
          <div>
            <input
              type="text"
              value={newIncident.title}
              onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
              placeholder="Incident Title"
            />
            <input
              type="text"
              value={newIncident.description}
              onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
              placeholder="Incident Description"
            />
            <Form.Select
              value={newIncident.serviceId}
              onChange={(e) => setNewIncident({ ...newIncident, serviceId: e.target.value })}
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.serviceName}
                </option>
              ))}
            </Form.Select>
            <Button onClick={handleAddIncident}>Add Incident</Button>
          </div>
        )}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Last Updated</th>
              {isAdmin && <th>Update Status</th>}
              {isAdmin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.title}</td>
                <td>{incident.description}</td>
                <td>{renderStatus(incident.status)}</td>
                <td>{incident.createdAt}</td>
                <td>{incident.lastUpdated}</td>
                {isAdmin && (
                  <td>
                    <Form.Select
                      value={incident.status}
                      onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                    >
                      {incidentStatusOptions.map((option) => (
                        <option key={option.label} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                )}
                {isAdmin && (
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteIncident(incident.id)}>
                      <FaTrash />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };
  

export default Incidents;
