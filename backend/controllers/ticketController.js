const QRCode = require('qrcode');
const Ticket = require('../models/Ticket');

// @desc    Create a new ticket (QR code will be generated only after payment verified)
// @route   POST /api/tickets/create
// @access  Public
exports.createTicket = async (req, res) => {
  try {
    const {
      userEmail,
      name,
      visitDate,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus,
    } = req.body;

    if (!userEmail || !name || !visitDate || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // ✅ Restrict past dates
    const selectedDate = new Date(visitDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset to midnight

    if (selectedDate < today) {
      return res.status(400).json({ message: '❌ Visit date cannot be in the past.' });
    }

    // Step 1: Create ticket (no QR code yet)
    const ticket = new Ticket({
      userEmail,
      name,
      visitDate,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus,
    });

    const savedTicket = await ticket.save();

    res.status(201).json({
      message: '🎟️ Ticket booked successfully! Awaiting verification.',
      ticket: savedTicket,
    });
  } catch (error) {
    console.error('❌ Error creating ticket:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Update ticket payment status to 'Paid' and generate QR if not already generated
// @route   PATCH /api/tickets/:id/status
// @access  Staff
exports.updateTicketStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Step 1: Mark ticket as Paid
    ticket.paymentStatus = 'Paid';

    // Step 2: Generate QR only if it doesn't exist
    if (!ticket.qrCode) {
      const qr = await QRCode.toDataURL(ticket._id.toString());
      ticket.qrCode = qr;
    }

    await ticket.save();

    res.status(200).json({ message: '✅ Ticket marked as Paid & QR generated', ticket });
  } catch (err) {
    console.error('❌ Error updating status:', err);
    res.status(500).json({ message: 'Server error while updating status' });
  }
};

// @desc    Get all tickets by user email
// @route   GET /api/tickets/user/:email
// @access  Public
exports.getTicketsByUser = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error('❌ Error fetching tickets:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a ticket by ID
// @route   GET /api/tickets/:id
// @access  Public
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (err) {
    console.error('❌ Error fetching ticket by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ NEW: Mark ticket as used
// @route   PATCH /api/tickets/:ticketId/use
// @access  Staff
exports.markTicketUsed = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.ticketId,
      { used: true },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json({ message: '✅ Ticket marked as used', ticket });
  } catch (err) {
    console.error('❌ Error marking ticket used:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
