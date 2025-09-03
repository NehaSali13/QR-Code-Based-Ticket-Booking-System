// src/pages/User/MyTickets.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyTickets.css';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserEmail(JSON.parse(storedUser).email);
    }
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    const fetchTickets = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tickets/user/${userEmail}`);
        setTickets(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch tickets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
    const interval = setInterval(fetchTickets, 5000);
    return () => clearInterval(interval);
  }, [userEmail]);

  useEffect(() => {
    if (!userEmail && !loading) {
      window.location.href = '/login';
    }
  }, [userEmail, loading]);

  const handlePrint = (ticketId) => {
    const printWindow = window.open('', '_blank');
    const ticket = tickets.find(t => t._id === ticketId);
    if (!ticket) return;

    const htmlContent = `
      <html>
        <head><title>Ticket</title></head>
        <body>
          <img src="${ticket.qrCode}" width="200" style="display: block; margin: 40px auto;" />
          <p style="text-align: center;">📍 Scan this QR at park entrance</p>
          <script>window.print();</script>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const today = new Date().setHours(0, 0, 0, 0);

  const upcomingTickets = tickets.filter(ticket => {
    const visitDay = new Date(ticket.visitDate).setHours(0, 0, 0, 0);
    return visitDay >= today && !ticket.used;
  });

  return (
    <div className="my-tickets-container">
      <h2>🎫 My Tickets</h2>

      {loading ? (
        <p>Loading...</p>
      ) : upcomingTickets.length === 0 ? (
        <p>No active tickets.</p>
      ) : (
        <div className="ticket-list">
          {upcomingTickets.map((ticket) => (
            <div key={ticket._id} className="ticket-card">
              <h4>🎟️ Ticket ID: {ticket._id}</h4>
              <p><strong>Name:</strong> {ticket.name}</p>
              <p><strong>Visit Date:</strong> {new Date(ticket.visitDate).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ₹{ticket.totalAmount}</p>
              <p><strong>Payment:</strong> {ticket.paymentMethod}</p>

              {ticket.paymentMethod === 'Cash' && ticket.paymentStatus === 'Pending' ? (
                <p style={{ color: 'orange' }}>⏳ Waiting for staff payment confirmation</p>
              ) : ticket.paymentStatus === 'Paid' && !ticket.used ? (
                <div className="qr-code-section-only">
                  <img src={ticket.qrCode} alt="QR Code" width="180" />
                  <p style={{ fontSize: '12px', marginTop: '5px' }}>📍 Scan this QR at park entrance</p>
                  <button onClick={() => handlePrint(ticket._id)}>🖨️ Print Ticket</button>
                </div>
              ) : ticket.used ? (
                <p style={{ color: 'gray' }}>✅ Ticket already used</p>
              ) : (
                <p style={{ color: 'red' }}>⚠️ Payment not completed</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
