import React from 'react';
import './MoreInfo.css';

const MoreInfo = () => {
  return (
    <div className="more-info-page">
      <h2>ℹ️ Park Information</h2>

      <div className="section">
        <h3>🎟️ Ticket Prices</h3>
        <ul>
          <li>Adult – ₹10</li>
          <li>Child – ₹5</li>
          <li>Bike – ₹10</li>
          <li>Car – ₹20</li>
        </ul>
      </div>

      <div className="section">
        <h3>📋 Park Rules</h3>
        <ul>
          <li>No littering inside the park.</li>
          <li>Pets are not allowed.</li>
          <li>Maintain silence and hygiene.</li>
          <li>Use dustbins for waste.</li>
        </ul>
      </div>

      <div className="section">
        <h3>🧾 Services</h3>
        <ul>
          <li>Washrooms available</li>
          <li>Parking for bikes and cars</li>
          <li>Refreshment stalls inside</li>
        </ul>
      </div>

      <div className="section info">
        <h3>📍 Address & Contact</h3>
        <p><strong>📌 Address:</strong> Nrupatunga Betta, Unkal, Hubli, Karnataka 580021</p>
        <p><strong>⏰ Timings:</strong> 6:00 AM – 8:00 PM</p>
        <p><strong>📞 Contact:</strong> +91 98765 43210</p>
      </div>
    </div>
  );
};

export default MoreInfo;
