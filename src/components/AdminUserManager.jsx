import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Alert } from 'react-bootstrap';

const AdminUserManager = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch admin users on component mount
  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin_emails');
      setAdminUsers(response.data);
    } catch (err) {
      setError('Failed to fetch admin users.');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/admin_emails', { email: newUserEmail });
      setMessage('Admin user added successfully!');
      setError('');
      setNewUserEmail('');
      fetchAdminUsers(); // Refresh list
    } catch (err) {
      setError('Failed to add admin user. It might already exist.');
      setMessage('');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin_emails/${id}`);
      setMessage('Admin user deleted successfully!');
      setError('');
      fetchAdminUsers(); // Refresh list
    } catch (err) {
      setError('Failed to delete admin user.');
      setMessage('');
    }
  };

  return (
    <div className="admin-user-manager">
      <h2>Admin User Management</h2>

      {/* Display success or error messages */}
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Add new admin user */}
      <Form onSubmit={handleAddUser} className="mb-3">
        <Form.Group>
          <Form.Label>Add Admin User</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter admin user email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Add User
        </Button>
      </Form>

      {/* Admin Users Table */}
      <h3>Admin Users List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Added At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{new Date(user.added_at).toLocaleString()}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminUserManager;
