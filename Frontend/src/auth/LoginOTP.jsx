// src/components/LoginModal.jsx
import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import UserDetailsForm from "../component/UserDetailsForm";

export default function LoginModal({ open, onClose }) {
  const [step, setStep] = useState("number"); // 'number' | 'otp' | 'details'
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // Send OTP
  const handleSendOtp = async () => {
    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/send-otp", {
        phone,
      });

      if (res.data.success) {
        toast.success("OTP sent successfully!");
        setStep("otp");
      } else {
        alert(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter OTP");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        phone,
        otp,
      });

      if (res.data.success) {
        localStorage.setItem("authToken", res.data.token); // optional
        if (res.data.needDetails) {
          // first-time signup
          setStep("details");
        } else {
          toast.success("Login successful!");
          onClose(); // existing user, close modal
        }
      } else {
        alert(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden flex shadow-lg">
        {/* Left Poster (like Flipkart) */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#2874f0] text-white w-1/2 p-8">
          {step === "details" ? (
            <>
              <h2 className="text-3xl font-bold mb-3">Almost there!</h2>
              <p className="text-sm opacity-90">
                Fill your details to complete signup.
              </p>
              <img
                src="https://i.imgur.com/3O1B7a0.png"
                alt="poster"
                className="mt-6 w-3/4"
              />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-3">Looks like you're new here!</h2>
              <p className="text-sm opacity-90">
                Sign up with your mobile number to get started.
              </p>
              <img
                src="https://i.imgur.com/R8C6xHD.png"
                alt="poster"
                className="mt-6 w-3/4"
              />
            </>
          )}
        </div>

        {/* Right Form */}
        <div className="flex-1 p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {step === "number" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Login or Signup</h2>
              <input
                type="number"
                placeholder="Enter Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-[#2874f0] outline-none"
              />
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full bg-[#fb641b] hover:bg-[#d65a14] text-white font-semibold py-3 rounded-lg disabled:opacity-50"
              >
                {loading ? "Sending..." : "Continue"}
              </button>
            </>
          )}

          {step === "otp" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Enter OTP</h2>
              <input
                type="number"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-[#2874f0] outline-none"
              />
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full bg-[#fb641b] hover:bg-[#d65a14] text-white font-semibold py-3 rounded-lg disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {step === "details" && <UserDetailsForm onComplete={onClose} />}

          <p className="text-xs text-gray-500 mt-4">
            By continuing, you agree to our{" "}
            <span className="text-[#2874f0] cursor-pointer">Terms of Use</span> and{" "}
            <span className="text-[#2874f0] cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
