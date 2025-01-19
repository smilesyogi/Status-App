// Function to fetch all services
export const fetchServices = () => {
    return fetch('http://localhost:5000/services') // Adjust backend port if needed
      .then((response) => response.json())
      .catch((error) => console.error('Error fetching services:', error));
  };
  
  // Function to add a new service
  export const addService = (serviceName, status, currentStatus) => {
    return fetch('http://localhost:5000/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceName,
        status,
        currentStatus,
        lastUpdated: new Date().toLocaleString(),
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error adding service:', error));
  };
  