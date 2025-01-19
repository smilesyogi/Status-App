import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'react-bootstrap';
import PTable from '../components/PTable';
import Overview from '../components/Overview';
const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* <Overview/> */}
      <PTable />
    </div>
  );
};

export default Dashboard;
