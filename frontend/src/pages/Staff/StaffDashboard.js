import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffDashboard.css';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts';

const StaffDashboard = () => {
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('staffToken');

    // 🔐 Redirect if token is missing
    if (!token) {
      navigate('/staff/login');
      return;
    }

    const fetchSummary = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/stats/staff/today-summary', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();

        console.log("✅ Raw API data:", data);

        const formatted = [
          { type: 'Adult', count: data.ticketTypes.Adult || 0 },
          { type: 'Child', count: data.ticketTypes.Child || 0 },
          { type: 'Bike', count: data.ticketTypes.Bike || 0 },
          { type: 'Car', count: data.ticketTypes.Car || 0 }
        ];

        console.log("📊 Formatted chart data:", formatted);
        setChartData(formatted);
      } catch (err) {
        console.error("❌ Error fetching summary:", err);

        // 👇 Optional: redirect to login if token is expired/invalid
        if (err.message.includes('401')) {
          localStorage.removeItem('staffToken');
          navigate('/staff/login');
        }
      }
    };

    fetchSummary();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('staffToken');
    localStorage.removeItem('role');
    window.location.href = '/staff/login';
  };

  return (
    <div className="staff-dashboard-container">
      <h2>👨‍💼 Welcome to the Staff Dashboard</h2>

      <div className="staff-dashboard-cards">
        {/* ✅ Ticket Verification Section */}
        <div className="card verify-card">
          <h3>🧾 Verify Tickets</h3>
          <p>Choose how you want to verify:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
            <button onClick={() => navigate('/staff/scan')}>📷 Scan QR</button>
            <button onClick={() => navigate('/staff/search')}>🔎 Search by ID</button>
          </div>
        </div>

        {/* ✅ Visitor Bar Chart */}
        <div className="card visitor-card">
          <h3>📊 Today's Visitor Summary</h3>
          <div style={{ height: 250, marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ✅ Logout */}
        <div className="card logout-card" onClick={handleLogout}>
          <h3>🚪 Logout</h3>
          <p>Safely end your session.</p>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
