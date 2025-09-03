const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },          // ✅ new (optional)
    phone: { type: String, trim: true },         // ✅ new (optional)

    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: 'staff' }
  },
  { timestamps: true }                            // ✅ nice to have, won’t break anything
);

staffSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Staff', staffSchema);
