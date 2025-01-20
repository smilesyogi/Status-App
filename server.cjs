const express = require('express');
const Database = require('better-sqlite3');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new Database('./database.db');
console.log('Connected to SQLite database.');

// Ensure services table
db.prepare(`
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    serviceName TEXT NOT NULL,
    status TEXT NOT NULL,
    currentStatus TEXT NOT NULL,
    lastUpdated TEXT NOT NULL
  );
`).run();
console.log('Services table ensured.');

// // Drop the incidents table if it exists
// db.prepare(`DROP TABLE IF EXISTS incidents`).run();
// console.log('Incidents table dropped if it existed.');

// Recreate the incidents table with serviceId column
db.prepare(`
  CREATE TABLE IF NOT EXISTS incidents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Investigating',
    createdAt TEXT NOT NULL,
    lastUpdated TEXT NOT NULL,
    serviceId INTEGER,
    FOREIGN KEY (serviceId) REFERENCES services(id) ON DELETE SET NULL
  );
`).run();
console.log('Incidents table recreated with serviceId column.');

// Ensure admin_emails table
db.prepare(`
  CREATE TABLE IF NOT EXISTS admin_emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`).run();
console.log('Admin Emails table ensured.');

// Utility function for error handling
const handleDatabaseError = (res, err) => res.status(400).json({ error: err.message });
const handleNotFound = (res, changes, message) => {
  if (changes === 0) {
    return res.status(404).json({ error: message });
  }
};

// CRUD for Services
// Create Service
app.post('/services', (req, res) => {
  const { serviceName, status, currentStatus, lastUpdated } = req.body;
  try {
    const stmt = db.prepare(
      `INSERT INTO services (serviceName, status, currentStatus, lastUpdated) VALUES (?, ?, ?, ?)`
    );
    const info = stmt.run(serviceName, status, currentStatus, lastUpdated);
    res.status(201).json({ id: info.lastInsertRowid });
  } catch (err) {
    handleDatabaseError(res, err);
  }
});

// Read Services
app.get('/services', (req, res) => {
  try {
    const stmt = db.prepare(`SELECT * FROM services`);
    const services = stmt.all();
    res.json(services);
  } catch (err) {
    handleDatabaseError(res, err);
  }
});

// Update Service
app.put('/services/:id', (req, res) => {
  const { id } = req.params;
  const { serviceName, status, currentStatus, lastUpdated } = req.body;
  try {
    const stmt = db.prepare(
      `UPDATE services SET serviceName = ?, status = ?, currentStatus = ?, lastUpdated = ? WHERE id = ?`
    );
    const info = stmt.run(serviceName, status, currentStatus, lastUpdated, id);
    handleNotFound(res, info.changes, 'Service not found');
    res.json({ updated: info.changes });
  } catch (err) {
    handleDatabaseError(res, err);
  }
});

// Delete Service
app.delete('/services/:id', (req, res) => {
  const { id } = req.params;
  try {
    const stmt = db.prepare(`DELETE FROM services WHERE id = ?`);
    const info = stmt.run(id);
    handleNotFound(res, info.changes, 'Service not found');
    res.json({ deleted: info.changes });
  } catch (err) {
    handleDatabaseError(res, err);
  }
});

// CRUD for Incidents
// Create Incident
app.post('/incidents', (req, res) => {
  const { title, description, status, createdAt, lastUpdated, serviceId } = req.body;

  // Query to get the current status of the related service
  const serviceStmt = db.prepare(`SELECT currentStatus FROM services WHERE id = ?`);
  const service = serviceStmt.get(serviceId);

  // Set the incident status to the provided status, or default to 'Investigating'
  const incidentStatus = status || (service ? service.currentStatus : 'Investigating');

  // Start a transaction to ensure both the incident and service current status are updated together
  const transaction = db.transaction(() => {
    try {
      // Insert the incident into the incidents table
      const stmt = db.prepare(
        `INSERT INTO incidents (title, description, status, createdAt, lastUpdated, serviceId) VALUES (?, ?, ?, ?, ?, ?)`
      );
      const info = stmt.run(title, description, incidentStatus, createdAt, lastUpdated, serviceId);

      // Update the service currentStatus to match the incident status
      const updateServiceStmt = db.prepare(
        `UPDATE services SET currentStatus = ?, lastUpdated = ? WHERE id = ?`
      );
      updateServiceStmt.run(incidentStatus, lastUpdated, serviceId);

      // Commit the transaction (both the incident creation and service current status update)
      return { incidentId: info.lastInsertRowid };
    } catch (err) {
      throw new Error(err.message);
    }
  });

  try {
    const result = transaction();
    res.status(201).json({ incidentId: result.incidentId });
  } catch (err) {
    handleDatabaseError(res, err);
  }
});


// Read Incidents
app.get('/incidents', (req, res) => {
  try {
    const stmt = db.prepare(`SELECT * FROM incidents`);
    const incidents = stmt.all();
    res.json(incidents);
  } catch (err) {
    handleDatabaseError(res, err);
  }
});

// Update Incident
app.put('/incidents/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status, lastUpdated, serviceId } = req.body;

  // You can query the service status here
  const serviceStmt = db.prepare(`SELECT status FROM services WHERE id = ?`);
  const service = serviceStmt.get(serviceId); // Assuming serviceId is passed in the incident update

  const incidentStatus = status || (service ? service.status : 'Investigating');  // Default to service status if not provided

  try {
    const stmt = db.prepare(
      `UPDATE incidents SET title = ?, description = ?, status = ?, lastUpdated = ? WHERE id = ?`
    );
    const info = stmt.run(title, description, incidentStatus, lastUpdated, id);
    handleNotFound(res, info.changes, 'Incident not found');
    res.json({ updated: info.changes });
  } catch (err) {
    handleDatabaseError(res, err);
  }
});

// Delete Incident
app.delete('/incidents/:id', (req, res) => {
  const { id } = req.params;
  try {
    const stmt = db.prepare(`DELETE FROM incidents WHERE id = ?`);
    const info = stmt.run(id);
    handleNotFound(res, info.changes, 'Incident not found');
    res.json({ deleted: info.changes });
  } catch (err) {
    handleDatabaseError(res, err);
  }
});

// CRUD for Admin Emails
// Create Admin Email
app.post('/admin_emails', (req, res) => {
  const { email } = req.body;
  try {
    const stmt = db.prepare(`INSERT INTO admin_emails (email) VALUES (?)`);
    const info = stmt.run(email);
    res.status(201).json({ id: info.lastInsertRowid });
  } catch (err) {
    handleDatabaseError(res, err);
  }
});

// Read Admin Emails
app.get('/admin_emails', (req, res) => {
  try {
    const stmt = db.prepare(`SELECT * FROM admin_emails`);
    const emails = stmt.all();
    res.json(emails);
  } catch (err) {
    handleDatabaseError(res, err);
  }
});

// Delete Admin Email
app.delete('/admin_emails/:id', (req, res) => {
  const { id } = req.params;
  try {
    const stmt = db.prepare(`DELETE FROM admin_emails WHERE id = ?`);
    const info = stmt.run(id);
    handleNotFound(res, info.changes, 'Admin email not found');
    res.json({ deleted: info.changes });
  } catch (err) {
    handleDatabaseError(res, err);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
