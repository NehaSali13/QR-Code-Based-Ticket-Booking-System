// src/components/Location.js
import React from 'react';
import './Location.css';

const Location = () => {
  return (
    <div className="location-container">
      <h2 className="location-title">Visit Nrupatunga Betta</h2>
      <p className="location-address">
        📍 Rajnagar, Vidya Nagar, Hubballi, Karnataka 580032, India
      </p>
      <p className="location-hours">
        🕒 Open Daily: 5:00 AM – 7:00 PM
      </p>
      <p className="location-fee">
        🎟️ Entry Fee: ₹20 (Adults), ₹10 (Children)
      </p>
      <div className="location-map">
        <iframe
          title="Nrupatunga Betta Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.123456789!2d75.123456!3d15.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d123456789ab%3A0xabcdef1234567890!2sNrupatunga%20Betta!5e0!3m2!1sen!2sin!4v1611234567890"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Location;
