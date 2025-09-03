const express = require('express');
const router = express.Router();

const {
  createTicket,
  updateTicketStatus,
  getTicketsByUser,
  getTicketById,
  markTicketUsed, // ✅ Add this line
} = require('../controllers/ticketController');

// POST - Book a ticket
router.post('/create', createTicket);

// PATCH - Update ticket payment status
router.patch('/:id/status', updateTicketStatus);

// GET - Get all tickets by user email
router.get('/user/:email', getTicketsByUser);

// GET - Get a single ticket by ID
router.get('/:id', getTicketById);

// ✅ NEW ROUTE
router.patch('/:ticketId/mark-used', markTicketUsed);

module.exports = router;



