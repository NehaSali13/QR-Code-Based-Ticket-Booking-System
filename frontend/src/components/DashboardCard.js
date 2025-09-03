// src/components/DashboardCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardCard.css';

const DashboardCard = ({ title, count, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div className="dashboard-card" onClick={handleClick}>
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  );
};

export default DashboardCard;
