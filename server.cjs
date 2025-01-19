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
