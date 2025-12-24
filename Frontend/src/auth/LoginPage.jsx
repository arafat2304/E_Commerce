// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import UserDetailsForm from "../component/UserDetailsForm";

export default function LoginPage() {
  const [step, setStep] = useState("number"); // 'number' | 'otp' | 'details'
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // 1️⃣ Send OTP
  const handleSendOtp = async () => {
    if (!phone || phone.length !== 10) return alert("Enter valid 10-digit phone");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/send-otp", { phone });
      if (res.data.success) {
        toast.success("OTP sent!");
        setStep("otp");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter OTP");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { phone, otp });
      if (res.data.success) {
        localStorage.setItem("authToken", res.data.token); // save JWT
        if (res.data.needDetails) {
          setStep("details");
        } else {
          toast.success("Login successful!");
          window.location.href = "/account"; // redirect existing user
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

  // 3️⃣ Handle first-time details completion
  const handleDetailsComplete = () => {
    toast.success("Signup complete!");
    window.location.href = "/account"; // redirect to account page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-8 flex flex-col md:flex-row overflow-hidden">
        {/* Left Poster */}
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
              <h2 className="text-3xl font-bold mb-3">Welcome!</h2>
              <p className="text-sm opacity-90">
                Sign in with your mobile number to continue.
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
        <div className="flex-1 p-8">
          {step === "number" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Login / Signup</h2>
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

          {step === "details" && <UserDetailsForm onComplete={handleDetailsComplete} />}
        </div>
      </div>
    </div>
  );
}
