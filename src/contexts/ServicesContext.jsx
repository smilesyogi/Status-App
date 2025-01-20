import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [incidents, setIncidents] = useState([]);

  const apiUrl = "http://localhost:5000/services";
  const incidentsApiUrl = "http://localhost:5000/incidents";

  // Fetch services from the server
  useEffect(() => {
    axios.get(apiUrl)
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  // Fetch incidents from the server
  useEffect(() => {
    axios.get(incidentsApiUrl)
      .then((response) => setIncidents(response.data))
      .catch((error) => console.error("Error fetching incidents:", error));
  }, []);

  return (
    <ServicesContext.Provider value={{ services, setServices, incidents, setIncidents }}>
      {children}
    </ServicesContext.Provider>
  );
};
