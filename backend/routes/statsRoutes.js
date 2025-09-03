const express = require('express');
const router = express.Router();


const { getTodayStatsForStaff } = require('../controllers/statsController');

router.get('/staff/today-summary', getTodayStatsForStaff);

module.exports = router;
