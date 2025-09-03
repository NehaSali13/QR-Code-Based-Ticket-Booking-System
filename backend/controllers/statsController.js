const Ticket = require('../models/Ticket');
const moment = require('moment');

// GET /api/stats/staff/today-summary
const getTodayStatsForStaff = async (req, res) => {
  try {
    const todayStart = moment().startOf('day').toDate();
    const todayEnd = moment().endOf('day').toDate();

    const ticketsToday = await Ticket.find({
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });

    const verified = ticketsToday.filter(t => t.used === true).length;
    const unverified = ticketsToday.filter(t => !t.used).length;

    // Combine item quantities: Adult, Child, Bike, Car
    const ticketTypes = {
      Adult: 0,
      Child: 0,
      Bike: 0,
      Car: 0
    };

    ticketsToday.forEach(ticket => {
      ticket.items.forEach(item => {
        const type = item.type || 'Unknown';
        if (ticketTypes.hasOwnProperty(type)) {
          ticketTypes[type] += item.quantity;
        } else {
          ticketTypes[type] = item.quantity;
        }
      });
    });

    res.json({
      totalTickets: ticketsToday.length,
      verified,
      unverified,
      ticketTypes
    });

  } catch (error) {
    console.error("Error in today-summary:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getTodayStatsForStaff
};
