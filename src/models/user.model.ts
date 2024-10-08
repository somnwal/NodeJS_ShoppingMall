import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  name: { type: String, required: false, default: "" },
  mobile: { type: String, required: false, default: "" },
  mobile_code: { type: String, required: false, default: "" },
  created_date: { type: Date, required: false, default: Date.now() },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const User = mongoose.model('User', userSchema);
