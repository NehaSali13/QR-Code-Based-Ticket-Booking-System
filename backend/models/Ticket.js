// backend/models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  name: { type: String, required: true },
  visitDate: { type: Date, required: true },

  items: [
    {
      type: { type: String, required: true },   // e.g., 'Adult', 'Child'
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],

  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'Cash' },
  paymentStatus: { type: String, default: 'Pending' },
  qrCode: { type: String },

  used: { type: Boolean, default: false } // true = verified

}, { timestamps: true }); // ⏱️ adds createdAt and updatedAt

module.exports = mongoose.model('Ticket', ticketSchema);
