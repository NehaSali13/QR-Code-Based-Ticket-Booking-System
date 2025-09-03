const express = require('express');
const router = express.Router();
const { getTodayStatsForStaff } = require('../controllers/statsController');
const { loginStaff } = require('../controllers/staffController'); // ✅ Add this



// ✅ Cleaned Single Route for Staff Dashboard
router.post('/login', loginStaff);
router.get('/staff/today-summary', getTodayStatsForStaff);

module.exports = router;
