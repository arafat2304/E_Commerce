import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  full_name: { type: String },       // first time signup के लिए
  email: { type: String },
  gender: { type: String },
  is_verified: { type: Boolean, default: false }, // OTP verify होने पर true
}, { timestamps: true });

export default mongoose.model("User", userSchema);
