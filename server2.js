const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');

    // Create the services table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serviceName TEXT NOT NULL,
        status TEXT NOT NULL,
        currentStatus TEXT NOT NULL,
        lastUpdated TEXT NOT NULL
      );
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Services table ensured.');
      }
    });
  }
});

// CRUD Operations

// Create
app.post('/services', (req, res) => {
  const { serviceName, status, currentStatus, lastUpdated } = req.body;
  db.run(
    `INSERT INTO services (serviceName, status, currentStatus, lastUpdated) VALUES (?, ?, ?, ?)`,
    [serviceName, status, currentStatus, lastUpdated],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Read
app.get('/services', (req, res) => {
  db.all(`SELECT * FROM services`, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Update
app.put('/services/:id', (req, res) => {
  const { id } = req.params;
  const { serviceName, status, currentStatus, lastUpdated } = req.body;
  db.run(
    `UPDATE services SET serviceName = ?, status = ?, currentStatus = ?, lastUpdated = ? WHERE id = ?`,
    [serviceName, status, currentStatus, lastUpdated, id],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.json({ updated: this.changes });
    }
  );
});

// Delete
app.delete('/services/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM services WHERE id = ?`, id, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ deleted: this.changes });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
