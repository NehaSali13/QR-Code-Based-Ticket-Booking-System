const Admin = require('../models/adminModel');
const User = require('../models/userModel');
const Staff = require('../models/staffModel');
const Ticket = require('../models/Ticket');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ------------------------------------
// Admin Login (existing - untouched)
// ------------------------------------
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, email: admin.email });
  } catch (err) {
    console.error('loginAdmin error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ------------------------------------
// Simple dashboard metrics (optional)
// ------------------------------------
exports.getDashboardStats = async (req, res) => {
  try {
    const [users, staff, bookings, revenueAgg] = await Promise.all([
      User.countDocuments(),
      Staff.countDocuments(),
      Ticket.countDocuments(),
      Ticket.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }])
    ]);

    const revenue = revenueAgg?.[0]?.total || 0;

    res.json({
      users,
      staff,
      bookings,
      revenue
    });
  } catch (err) {
    console.error('getDashboardStats error:', err);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};

// ------------------------------------
// View All Users (with pagination + search)
// ------------------------------------
exports.viewUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;

    const q = search
      ? {
          $or: [
            { name:   { $regex: search, $options: 'i' } },
            { email:  { $regex: search, $options: 'i' } },
            { city:   { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      User.find(q).select('-password').sort({ createdAt: -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit),
      User.countDocuments(q),
    ]);

    res.json({
      data,
      total,
      page: +page,
      pages: Math.ceil(total / +limit),
    });
  } catch (err) {
    console.error('viewUsers error:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// ------------------------------------
// View All Staff (with pagination + search)
// ------------------------------------
exports.viewStaff = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;

    const q = search
      ? {
          $or: [
            { name:  { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { role:  { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      Staff.find(q).select('-password').sort({ createdAt: -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit),
      Staff.countDocuments(q),
    ]);

    res.json({
      data,
      total,
      page: +page,
      pages: Math.ceil(total / +limit),
    });
  } catch (err) {
    console.error('viewStaff error:', err);
    res.status(500).json({ message: 'Failed to fetch staff list' });
  }
};

// ------------------------------------
// View All Bookings (with pagination + search on email/name)
// ------------------------------------
exports.viewBookings = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;

    const q = search
      ? {
          $or: [
            { userEmail: { $regex: search, $options: 'i' } },
            { name:      { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      Ticket.find(q).sort({ createdAt: -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit),
      Ticket.countDocuments(q),
    ]);

    res.json({
      data,
      total,
      page: +page,
      pages: Math.ceil(total / +limit),
    });
  } catch (err) {
    console.error('viewBookings error:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

// ------------------------------------
// Add Staff
// ------------------------------------
   // adminController.js (snippet)
exports.addStaff = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const exists = await Staff.findOne({ email: email.toLowerCase().trim() });
    if (exists) return res.status(400).json({ message: 'Staff already exists' });

    const newStaff = new Staff({
      name,
      email,
      phone,
      password, // plain; pre('save') will hash
      role: 'staff'
    });

    await newStaff.save();
    res.status(201).json({ message: 'Staff added successfully', id: newStaff._id });
  } catch (err) {
    console.error('addStaff error:', err);
    res.status(500).json({ message: 'Error adding staff' });
  }
};

   
// ------------------------------------
// Delete Staff (by email)
// ------------------------------------
exports.deleteStaff = async (req, res) => {
  const { email } = req.body;
  try {
    const deleted = await Staff.findOneAndDelete({ email });
    if (!deleted) return res.status(404).json({ message: 'Staff not found' });

    res.json({ message: 'Staff deleted successfully' });
  } catch (err) {
    console.error('deleteStaff error:', err);
    res.status(500).json({ message: 'Error deleting staff' });
  }
};
