// src/pages/User/UserDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
// eslint-disable-next-line no-unused-vars
import { FaTicketAlt, FaFileInvoice, FaMapMarkerAlt, FaInfoCircle, FaUserEdit, FaSignOutAlt } from 'react-icons/fa';

const UserDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'Guest',
    city: 'Unknown',
    email: 'guest@example.com'
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile-section">
          <div className="profile-pic" />
          <div className="user-info">
            <h3>{user.name}</h3>
            <p>{user.city}</p>
            <p>{user.email}</p>
            <span className="edit-profile" onClick={handleEditProfile}>✏️ Edit Profile</span>
          </div>

          <div className="progress-container">
            <p>Profile Completion</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div className="extra-info">
            <p><strong>Role:</strong> User</p>
            <p><strong>Since:</strong> 2024</p>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>🔒 Logout</button>
      </div>

      <div className="dashboard-main">
        <h2>👋 Welcome, {user.name}!</h2>
        <div className="dashboard-grid">
          <div className="card" onClick={() => navigate('/book-ticket')}>
            <FaTicketAlt size={40} />
            <p>Book Ticket</p>
          </div>
          <div className="card" onClick={() => navigate('/my-tickets')}>
            <FaFileInvoice size={40} />
            <p>My Tickets</p>
          </div>
          <div className="card" onClick={() => navigate('/location')}>
            <FaMapMarkerAlt size={40} />
            <p>Location</p>
          </div>
          <div className="card" onClick={() => navigate('/more-info')}>
            <FaInfoCircle size={40} />
            <p>More Info</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
