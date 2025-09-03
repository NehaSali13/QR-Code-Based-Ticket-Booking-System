// src/pages/Admin/DeleteStaff.js
import React, { useState } from 'react';
import axios from 'axios';

import '././DeleteStaff.css'; // Custom CSS for better design

const DeleteStaff = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) return setError('Please enter staff email.');

    // Confirmation dialog
    const confirmDelete = window.confirm(
      `Are you sure you want to delete staff with email: ${email}?`
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.delete('http://localhost:5000/api/admins/delete-staff', {
        data: { email },
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(res.data.message);
      setEmail('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to delete staff');
    }
  };

  return (
    <div className="delete-staff-container">
      <h2 className="delete-staff-title">❌ Delete Staff</h2>
      <div className="delete-staff-card">
        <form onSubmit={handleDelete}>
          <input
            type="email"
            placeholder="Enter staff email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="delete-staff-input"
          />
          <button type="submit" className="delete-staff-btn">
            Delete Staff
          </button>
        </form>
        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
};

export default DeleteStaff;
