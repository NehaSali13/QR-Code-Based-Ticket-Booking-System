// src/pages/User/Invoice.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import './Invoice.css';

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (location.state && location.state.ticketData) {
      setTicket(location.state.ticketData);
    } else {
      // Redirect to MyTickets if no ticket data is passed
      navigate('/my-tickets');
    }
  }, [location, navigate]);

  if (!ticket) return <div>Loading ticket...</div>;

  return (
    <div className="invoice-container">
      <h2>🎟️ Ticket Invoice</h2>
      <div className="ticket-box">
        <p><strong>Visitor:</strong> {ticket.name}</p>
        <p><strong>Email:</strong> {ticket.userEmail}</p>
        <p><strong>Date of Visit:</strong> {new Date(ticket.visitDate).toLocaleDateString()}</p>

        <div className="ticket-items">
          <h4>Details:</h4>
          <ul>
            {ticket.items.map((item, idx) => (
              <li key={idx}>
                {item.type} × {item.quantity} = ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
        </div>

        <p><strong>Total:</strong> ₹{ticket.totalAmount}</p>
        <p><strong>Payment Mode:</strong> {ticket.paymentMethod}</p>
        <p><strong>Status:</strong> {ticket.paymentStatus === 'Paid' ? '✅ Paid' : '⏳ Pending'}</p>

        <div className="qr-section">
          <h4>🎫 Your Ticket QR:</h4>
          <QRCode value={ticket._id} size={160} />
          <p className="qr-id">Ticket ID: {ticket._id}</p>
        </div>
      </div>

      <button className="btn-home" onClick={() => navigate('/user/dashboard')}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default Invoice;
