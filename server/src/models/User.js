import mongoose from "mongoose";
import bcrypt from "brcypt";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default UserSchema;
