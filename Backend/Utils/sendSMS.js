import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (phone, otp) => {
  try {
    await client.messages.create({
      body: `Your OTP is ${otp}. It will expire in 2 minutes.`,
      from: process.env.TWILIO_PHONE,
      to: phone.startsWith("+91") ? phone : `+91${phone}`,
    });
    console.log("✅ OTP sent to", phone);
  } catch (err) {
    console.error("❌ SMS Error:", err.message);
  }
};
