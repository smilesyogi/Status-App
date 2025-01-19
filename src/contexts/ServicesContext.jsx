import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);

  const apiUrl = "http://localhost:5000/services";

  // Fetch services from the server
  useEffect(() => {
    axios.get(apiUrl)
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  return (
    <ServicesContext.Provider value={{ services, setServices }}>
      {children}
    </ServicesContext.Provider>
  );
};
