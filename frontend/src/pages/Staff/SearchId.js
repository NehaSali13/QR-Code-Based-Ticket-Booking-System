// src/pages/Staff/SearchId.js
import React, { useState } from 'react';
import axios from 'axios';


const SearchId = () => {
  const [ticketId, setTicketId] = useState('');
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');

  const fetchTicket = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tickets/${ticketId}`);
      setTicket(res.data);
      setError('');
    } catch (err) {
      setTicket(null);
      setError('❌ Invalid or missing ticket.');
    }
  };

  const markAsPaid = async () => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/tickets/${ticket._id}/status`);
      setTicket(res.data.ticket);
      alert('✅ Marked as Paid!');
    } catch {
      alert('❌ Failed to mark as Paid.');
    }
  };

  return (
    <div className="verify-ticket-page">
      <h2>🔎 Search Ticket by ID</h2>
      <input
        type="text"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
        placeholder="Enter Ticket ID"
        style={{ padding: '8px', width: '260px' }}
      />
      <button onClick={fetchTicket} style={{ marginLeft: '10px' }}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ticket && (
        <div className="ticket-info">
          <p><strong>Name:</strong> {ticket.name}</p>
          <p><strong>Email:</strong> {ticket.userEmail}</p>
          <p><strong>Date:</strong> {new Date(ticket.visitDate).toLocaleDateString()}</p>
          <p><strong>Total:</strong> ₹{ticket.totalAmount}</p>
          <p><strong>Status:</strong> {ticket.paymentStatus}</p>

          {ticket.paymentStatus === 'Pending' && (
            <button onClick={markAsPaid}>💵 Mark as Paid</button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchId;
