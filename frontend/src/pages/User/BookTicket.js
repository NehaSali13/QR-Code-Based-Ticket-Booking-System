// src/pages/User/BookTicket.js
import React, { useState } from 'react';
import './BookTicket.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const rates = { adult: 10, child: 5, bike: 10, car: 20 };

const BookTicket = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user?.name || '';
  const userEmail = user?.email || '';

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    adult: 0,
    child: 0,
    bike: 0,
    car: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = name === 'name' || name === 'date' ? value : parseInt(value) || 0;
    setFormData({ ...formData, [name]: val });
  };

  const total =
    formData.adult * rates.adult +
    formData.child * rates.child +
    formData.bike * rates.bike +
    formData.car * rates.car;

  const prepareTicketData = (method) => {
    const items = [];
    if (formData.adult > 0) items.push({ type: 'Adult', quantity: formData.adult, price: 10 });
    if (formData.child > 0) items.push({ type: 'Child', quantity: formData.child, price: 5 });
    if (formData.bike > 0) items.push({ type: 'Bike', quantity: formData.bike, price: 10 });
    if (formData.car > 0) items.push({ type: 'Car', quantity: formData.car, price: 20 });

    return {
      userEmail,
      name: formData.name,
      visitDate: formData.date,
      items,
      totalAmount: total,
      paymentMethod: method,
      paymentStatus: 'Pending',
    };
  };

  const handlePayment = async (method) => {
    if (!formData.name || !formData.date || !userEmail) {
      alert('Please enter name, visit date, and ensure you are logged in.');
      return;
    }

    // ✅ Restrict children-only entry
    if (formData.child > 0 && formData.adult === 0) {
      alert('❌ Children must be accompanied by at least one adult.');
      return;
    }

    const ticketData = prepareTicketData(method);

    try {
      const response = await axios.post('http://localhost:5000/api/tickets/create', ticketData);
      const ticketId = response.data.ticket._id;

      if (method === 'Cash') {
        navigate('/my-tickets');
      } else {
        navigate(`/pay-online/${ticketId}`);
      }
    } catch (error) {
      console.error('Booking failed:', error);
      alert('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="ticket-container">
      {userName && <h3 className="welcome-msg">👋 Welcome, {userName}!</h3>}
      <h2>🎟️ Book Your Ticket</h2>
      <div className="ticket-form">
        <div className="ticket-row">
          <label>Visitor Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="ticket-row">
          <label>Date of Visit:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]} // 👈 Prevent past dates
          />
        </div>
        {['adult', 'child', 'bike', 'car'].map((type) => (
          <div key={type} className="ticket-row">
            <label>{type.charAt(0).toUpperCase() + type.slice(1)} (₹{rates[type]} each):</label>
            <input type="number" name={type} min="0" value={formData[type]} onChange={handleChange} />
          </div>
        ))}
      </div>
      <h3>Total Amount: ₹{total}</h3>
      <div className="button-group">
        <button onClick={() => handlePayment('Cash')} className="proceed-btn">💵 Pay with Cash</button>
        <button onClick={() => handlePayment('Online')} className="proceed-btn online">🌐 Pay Online</button>
      </div>
    </div>
  );
};

export default BookTicket;
 