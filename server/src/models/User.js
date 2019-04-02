import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: String },
  googleProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
});

export default mongoose.model('User', UserSchema);
