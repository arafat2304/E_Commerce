// src/components/UserDetailsForm.jsx
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserDetailsForm({ onComplete }) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    full_name: "",
    email: "",
    gender: "",
  });

  const handleSubmit = async () => {
    if (!details.full_name || !details.email || !details.gender) {
      return alert("Please fill all details");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        "http://localhost:5000/api/auth/save-details",
        details,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        toast.success("Details saved! Welcome!");
        onComplete(); // notify parent
      } else {
        alert(res.data.message || "Failed to save details");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Details</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={details.full_name}
        onChange={(e) => setDetails({ ...details, full_name: e.target.value })}
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-[#2874f0] outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        value={details.email}
        onChange={(e) => setDetails({ ...details, email: e.target.value })}
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-[#2874f0] outline-none"
      />
      <select
        value={details.gender}
        onChange={(e) => setDetails({ ...details, gender: e.target.value })}
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-[#2874f0] outline-none"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#fb641b] hover:bg-[#d65a14] text-white font-semibold py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save & Continue"}
      </button>
    </div>
  );
}
