const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  loginAdmin,
  viewUsers,
  viewStaff,
  viewBookings,
  addStaff,
  deleteStaff,
  getDashboardStats,
} = require('../controllers/adminController');

// Public
router.post('/login', loginAdmin);

// Protected
router.get('/stats', adminAuth, getDashboardStats);
router.get('/view-users', adminAuth, viewUsers);
router.get('/view-staff', adminAuth, viewStaff);
router.get('/view-bookings', adminAuth, viewBookings);
router.post('/add-staff', adminAuth, addStaff);
router.delete('/delete-staff', adminAuth, deleteStaff);

module.exports = router;
