import React from 'react';
import Dashtop from './Dashtop';
import Dashbot from './Dashbot';
import Dashmain from './Dashmain';
import '../../style/dashboard.css';
import { DashboardProvider } from '../../context/DashboardContext';

const Dashboard = () => {
  return (
    <DashboardProvider>
      <div className="dashboard">
        <Dashtop />
        <Dashbot />
        <Dashmain />
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
