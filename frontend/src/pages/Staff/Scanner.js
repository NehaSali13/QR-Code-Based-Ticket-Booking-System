// src/pages/Staff/Scanner.js
import React, { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import './Scanner.css';

const Scanner = () => {
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');
  const scannerRef = useRef(null); // prevent reinitializing

  useEffect(() => {
    if (scannerRef.current) return; // avoid re-render

    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scannerRef.current.render(
      async (decodedText) => {
        try {
          const res = await axios.get(`http://localhost:5000/api/tickets/${decodedText}`);
          setTicket(res.data);
          setError('');

          // Optional: auto mark as used after scan
          if (!res.data.used) {
            await axios.patch(`http://localhost:5000/api/tickets/${decodedText}/mark-used`);
          }

        } catch (err) {
          console.error('❌ Ticket fetch failed:', err);
          setError('❌ Invalid or already used ticket.');
          setTicket(null);
        }
      },
      (errMsg) => console.warn('Scan Error:', errMsg)
    );

    return () => {
      scannerRef.current?.clear().catch(err => console.error('❌ Scanner cleanup error:', err));
      scannerRef.current = null;
    };
  }, []);

  return (
    <div className="scanner-page">
      <h2>📸 QR Code Scanner</h2>
      <div id="qr-reader" style={{ width: '300px', margin: 'auto' }}></div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {ticket && (
        <div className="invoice-box">
          <h3>🧾 Ticket Invoice</h3>
          <p><strong>ID:</strong> {ticket._id}</p>
          <p><strong>Name:</strong> {ticket.name}</p>
          <p><strong>Email:</strong> {ticket.userEmail}</p>
          <p><strong>Visit Date:</strong> {new Date(ticket.visitDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {ticket.paymentStatus} {ticket.used ? '✅ Used' : '🕒 Not Used'}</p>
          <hr />
          <h4>🛒 Ticket Items:</h4>
          <ul>
            {ticket.items?.map((item, i) => (
              <li key={i}>{item.quantity} × {item.type} = ₹{item.quantity * item.price}</li>
            ))}
          </ul>
          <hr />
          <h4>💰 Total: ₹{ticket.totalAmount}</h4>
        </div>
      )}
    </div>
  );
};

export default Scanner;
