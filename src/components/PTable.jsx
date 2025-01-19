import React, { useState, useEffect, useContext } from "react";
import { Table, Badge, Form, Alert, Button } from "react-bootstrap";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaPauseCircle, FaSearch, FaTools, FaCheck, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { ServicesContext } from "../contexts/ServicesContext";

const PTable = () => {
  const { user } = useAuth0(); // Get Auth0 user
  const { services, setServices } = useContext(ServicesContext);
  const [newServiceName, setNewServiceName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const apiUrl = "http://localhost:5000/services";
  const adminCheckUrl = "http://localhost:5000/admin_emails";

  // Check if the current user is an admin by querying the admin_emails table
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${adminCheckUrl}?email=${encodeURIComponent(user.email)}`)
        .then((response) => {
          setIsAdmin(response.data.some(admin => admin.email === user.email));
        })
        .catch((error) => console.error("Error checking admin status:", error));
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const statusOptions = [
    { label: "Operational", color: "success", icon: <FaCheckCircle />, value: 1 },
    { label: "Degraded Performance", color: "warning", icon: <FaExclamationTriangle />, value: 0.8 },
    { label: "Partial Outage", color: "danger", icon: <FaTimesCircle />, value: 0.5 },
    { label: "Major Outage", color: "dark", icon: <FaPauseCircle />, value: 0 },
  ];

  const currentStatusOptions = [
    { label: "Resolved", color: "success", icon: <FaCheck /> },
    { label: "Identified", color: "warning", icon: <FaTools /> },
    { label: "Investigating", color: "warning", icon: <FaSearch /> }

  ];

  const calculateStatusCounts = () => {
    return services.reduce(
      (acc, service) => {
        if (service && service.status) { 
          acc[service.status.replace(" ", "").toLowerCase()]++;
        }
        return acc;
      },
      { operational: 0, degradedperformance: 0, partialoutage: 0, majoroutage: 0 }
    );
  };

  const calculatePercentage = () => {
    const totalServices = services.length;
    if (totalServices === 0) return 0;

    const weightedSum = services.reduce((sum, service) => {
      const statusValue = statusOptions.find((opt) => opt.label === service.status)?.value || 0;
      return sum + statusValue;
    }, 0);

    return ((weightedSum / totalServices) * 100).toFixed(2);
  };

  const getAverageStatus = () => {
    const { majoroutage, degradedperformance, partialoutage, operational } = calculateStatusCounts();
    if (majoroutage > 0) return "Site is Down";
    if (degradedperformance > 0 || partialoutage > 0) return "Some features not working";
    return "All services operational";
  };

  const renderStatus = (status) => {
    const option = statusOptions.find((opt) => opt.label === status) || statusOptions[0];  // Default to 'Operational' if status is empty or invalid
    return (
      <Badge bg={option.color} className="d-flex align-items-center gap-2">
        {option.icon} {status || "Operational"}  {/* Fallback to 'Operational' if status is empty */}
      </Badge>
    );
  };
  
  const renderCurrentStatus = (currentStatus) => {
    const option = currentStatusOptions.find((opt) => opt.label === currentStatus) || currentStatusOptions[0]; // Default to 'Resolved' if currentStatus is empty or invalid
    return (
      <Badge bg={option.color} className="d-flex align-items-center gap-2">
        {option.icon} {currentStatus || "Resolved"}  {/* Fallback to 'Resolved' if currentStatus is empty */}
      </Badge>
    );
  };

  const handleStatusChange = (id, newStatus) => {
    const serviceToUpdate = services.find((service) => service.id === id);

    if (serviceToUpdate) {
      axios
        .put(`${apiUrl}/${id}`, {
          ...serviceToUpdate,
          status: newStatus,
          lastUpdated: new Date().toLocaleString(),
        })
        .then(() => {
          setServices((prevServices) =>
            prevServices.map((service) =>
              service.id === id ? { ...service, status: newStatus, lastUpdated: new Date().toLocaleString() } : service
            )
          );
        })
        .catch((error) => console.error("Error updating status:", error));
    }
  };

  const handleCurrentStatusChange = (id, newCurrentStatus) => {
    const serviceToUpdate = services.find((service) => service.id === id);

    if (serviceToUpdate) {
      axios
        .put(`${apiUrl}/${id}`, {
          ...serviceToUpdate,
          currentStatus: newCurrentStatus,
          lastUpdated: new Date().toLocaleString(),
        })
        .then(() => {
          setServices((prevServices) =>
            prevServices.map((service) =>
              service.id === id
                ? { ...service, currentStatus: newCurrentStatus, lastUpdated: new Date().toLocaleString() }
                : service
            )
          );
        })
        .catch((error) => console.error("Error updating current status:", error));
    }
  };

  const handleAddService = () => {
    if (newServiceName) {
      axios
        .post(apiUrl, {
          serviceName: newServiceName,
          status: "",  // Can be left empty in the request, since we'll reload data
          currentStatus: "",  // Can be left empty in the request, since we'll reload data
          lastUpdated: new Date().toLocaleString(),
        })
        .then(() => {
          // Reload services from the API to ensure the data is up to date
          axios
            .get(apiUrl)
            .then((response) => {
              setServices(response.data);
              setNewServiceName("");  // Clear the input field after adding
            })
            .catch((error) => console.error("Error fetching updated services:", error));
        })
        .catch((error) => console.error("Error adding service:", error));
    }
  };

  const handleDeleteService = (id) => {
    axios
      .delete(`${apiUrl}/${id}`)
      .then(() => {
        setServices((prevServices) => prevServices.filter((service) => service.id !== id));
      })
      .catch((error) => console.error("Error deleting service:", error));
  };

  const statusCounts = calculateStatusCounts();
  const percentage = calculatePercentage();

  return (
    <div>
      <Alert variant={getAverageStatus() === "All services operational" ? "success" : getAverageStatus() === "Site is Down" ? "danger" : "warning"}>
        <strong>{getAverageStatus()} {`(${percentage}%)`}</strong> | 
        Operational: {statusCounts.operational}, 
        Degraded: {statusCounts.degradedperformance}, 
        Partial Outage: {statusCounts.partialoutage}, 
        Major Outage: {statusCounts.majoroutage}
      </Alert>
      {isAdmin && (
        <div>
          <input 
            type="text" 
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)} 
            placeholder="New Service Name" 
          />
          <Button onClick={handleAddService}>Add New Service</Button>
        </div>
      )}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Current Status</th>
            <th>Overall Status</th>
            <th>Last Updated</th>
            <th>Update Overall Status</th>
            {isAdmin && <th>Update Current Status</th>}
            {isAdmin && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.serviceName}</td>
              <td>{renderCurrentStatus(service.currentStatus)}</td>
              <td>{renderStatus(service.status)}</td>
              <td>{service.lastUpdated}</td>
              <td>
                <Form.Select
                  value={service.status}
                  onChange={(e) => handleStatusChange(service.id, e.target.value)}
                >
                  {statusOptions.map((option) => (
                    <option key={option.label} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </td>
              {isAdmin && (
                <td>
                  <Form.Select
                    value={service.currentStatus}
                    onChange={(e) => handleCurrentStatusChange(service.id, e.target.value)}
                  >
                    {currentStatusOptions.map((option) => (
                      <option key={option.label} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </td>
              )}
              {isAdmin && (
                <td>
                  <Button variant="danger" onClick={() => handleDeleteService(service.id)}>
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

export default PTable;
