// src/pages/User/PayOnline.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './PayOnline.css';
import QRImage from '../../assets/img/qr.png';

const PayOnline = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const handlePaymentDone = async () => {
    try {
      // ✅ Update ticket status to "Paid" and generate QR
      const res = await axios.patch(`http://localhost:5000/api/tickets/${ticketId}/status`);

      if (res.data.ticket.paymentStatus === 'Paid') {
        alert('✅ Payment successful! Your ticket is ready.');
        navigate('/my-tickets'); // ✅ Redirect to see QR in MyTickets
      } else {
        alert('❌ Payment failed or not confirmed.');
      }
    } catch (err) {
      console.error('❌ Payment status update failed:', err);
      alert('⚠️ Server error while confirming payment.');
    }
  };

  return (
    <div className="pay-online">
      <h2>📱 Scan to Pay</h2>
      <img src={QRImage} alt="QR Code" className="qr-img" />
      <p>Use any UPI app to scan and pay.</p>
      <button onClick={handlePaymentDone}>✅ I’ve Paid</button>
    </div>
  );
};

export default PayOnline;
