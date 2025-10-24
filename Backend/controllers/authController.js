import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateOTP } from "../Utils/otpGenerator.js";
import { sendSMS } from "../Utils/sendSMS.js";

let otpStore = {}; // temporary in-memory (can move to Redis later)

export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone number required" });

  const otp = generateOTP();
  otpStore[phone] = { otp, expires: Date.now() + 2 * 60 * 1000 }; // 2 minutes expiry

  await sendSMS(phone, otp);
  res.json({ success: true, message: "OTP sent successfully" });
};

export const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const record = otpStore[phone];
  if (!record) return res.status(400).json({ message: "OTP expired or not found" });
  if (record.otp !== Number(otp)) return res.status(400).json({ message: "Invalid OTP" });
  if (Date.now() > record.expires) return res.status(400).json({ message: "OTP expired" });

  // find or create user
  let user = await User.findOne({ phone });
  if (!user) user = await User.create({ phone });

  // mark as verified
  user.is_verified = true;
  await user.save();

  // generate JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  delete otpStore[phone]; // cleanup

  // check if user has details
  if (!user.full_name) {
    // first time signup, need details page
    res.json({ success: true, token, user, needDetails: true });
  } else {
    // existing user, account ready
    res.json({ success: true, token, user, needDetails: false });
  }
};

export const saveDetails =async(req,res) =>{
   try {
    const { full_name, email, gender } = req.body;
    if (!full_name || !email || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.full_name = full_name;
    user.email = email;
    user.gender = gender;
    await user.save();

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

