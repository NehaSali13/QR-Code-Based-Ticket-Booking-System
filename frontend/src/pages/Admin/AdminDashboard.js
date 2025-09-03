// export default AdminDashboard;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState('');

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleSearch = (e) => setSearch(e.target.value);

  const features = [
    { title: 'View Users', path: '/admin/view-users', icon: '👥' },
    { title: 'View Staff', path: '/admin/view-staff', icon: '🧑‍💼' },
    { title: 'Booking Overview', path: '/admin/bookings', icon: '📅' },
    { title: 'Add Staff', path: '/admin/add-staff', icon: '➕' },
    { title: 'Delete Staff', path: '/admin/delete-staff', icon: '🗑️' },
    { title: 'Logout', path: '/login', icon: '🚪', logout: true },
  ];

  const filteredFeatures = features.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`admin-dashboard ${darkMode ? 'dark-mode' : ''}`}>
      {/* Top bar */}
      <div className="top-bar">
        <div className="admin-profile">
          <img src="https://i.pravatar.cc/150?img=68" alt="Admin Avatar" />
        <div>
            <h3>Admin Name</h3>
            <p>admin@example.com</p>
          </div>
        </div>

        <div className="top-controls">
          <input
            type="text"
            placeholder="Search Dashboard..."
            value={search}
            onChange={handleSearch}
          />
          <button onClick={toggleDarkMode}>
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage all system features from here</p>
      </div>

      {/* Feature list */}
      <div className="dashboard-grid-vertical">
        {filteredFeatures.map((feature, index) => (
          <div
            key={index}
            className={`dashboard-card ${feature.logout ? 'logout' : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => navigate(feature.path)}
            onKeyDown={(e) => e.key === 'Enter' && navigate(feature.path)}
          >
            <div className="icon">{feature.icon || '📌'}</div>
            <h2>{feature.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
