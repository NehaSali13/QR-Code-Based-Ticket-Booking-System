// const Staff = require('../models/staffModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.loginStaff = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const staff = await Staff.findOne({ email });
//     if (!staff) return res.status(400).json({ message: 'Staff not found' });

//     const isMatch = await bcrypt.compare(password, staff.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: staff._id, role: 'staff' }, process.env.JWT_SECRET, {
//       expiresIn: '1d',
//     });

//     res.json({ token, role: 'staff', email: staff.email });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// controllers/staffController.js
const Staff = require('../models/staffModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginStaff = async (req, res) => {
  let { email, password } = req.body;

  try {
    // normalize
    email = (email || '').toLowerCase().trim();

    console.log('📥 Staff login attempt:', email);

    const staff = await Staff.findOne({ email });
    if (!staff) {
      console.log('❌ Staff not found');
      return res.status(400).json({ message: 'Staff not found' });
    }

    const isMatch = await bcrypt.compare(password, staff.password);
    console.log('🔐 Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: staff._id, role: 'staff' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      role: staff.role,
      email: staff.email,
      name: staff.name || '',
    });
  } catch (err) {
    console.error('loginStaff error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
