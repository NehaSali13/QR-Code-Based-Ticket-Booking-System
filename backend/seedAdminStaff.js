// seedAdminStaff.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('./models/adminModel');
const Staff = require('./models/staffModel');

dotenv.config();

const connectAndSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ DB Connected');

    // Delete old users
    await Admin.deleteMany({});
    await Staff.deleteMany({});

    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    await Admin.create({ email: 'admin@example.com', password: hashedPassword });
    console.log('✅ Admin seeded');

    await Staff.create({ email: 'staff@example.com', password: hashedPassword, role: 'staff' });
    console.log('✅ Staff seeded');

    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  }
};

connectAndSeed();
