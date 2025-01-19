import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import './Sidebar.css'; // Import custom styles

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Card className="space-y-4 border-0">
        <Link
          to="/dashboard"
          className="sidebar-link block px-4 py-2 my-2 rounded"
        >
          Dashboard
        </Link>
        <Link
          to="/overview"
          className="sidebar-link block px-4 py-2 my-2 rounded"
        >
          Overview
        </Link>
        <Link
          to="/about"
          className="sidebar-link block px-4 py-2 my-2 rounded"
        >
          About
        </Link>
      </Card>
    </aside>
  );
};

export default Sidebar;
