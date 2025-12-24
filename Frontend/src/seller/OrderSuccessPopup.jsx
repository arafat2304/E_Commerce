// components/OrderSuccessPopup.jsx
import React from "react";

export default function OrderSuccessPopup({ show }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 text-center animate-bounce">
        <div className="text-green-600 text-6xl mb-3">✔</div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Order Confirmed!
        </h2>
        <p className="text-gray-500 text-sm">Redirecting...</p>
      </div>
    </div>
  );
}
