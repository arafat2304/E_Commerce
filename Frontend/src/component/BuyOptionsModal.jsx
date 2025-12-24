import React, { useState } from "react";
import { X } from "lucide-react";

export default function BuyReturnOptionsModal({
  basePrice,
  onClose,
  onBuyNow,
  onAddToCart,
}) {
  const [selectedOption, setSelectedOption] = useState("no");

  const easyReturnCharge = 15;

  const finalAmount =
    basePrice + (selectedOption === "yes" ? easyReturnCharge : 0);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50">
      <div className="bg-white w-full rounded-t-3xl p-4 animate-slide-up">
        
        {/* Close Button */}
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Select Options</h2>
          <button onClick={onClose}>
            <X size={22} className="text-gray-600" />
          </button>
        </div>

        {/* RETURN OPTIONS */}
        <p className="text-sm text-gray-700 mb-2">Do you want Easy Returns?</p>

        <div className="grid grid-cols-2 gap-3">
          {/* YES option */}
          <div
            onClick={() => setSelectedOption("yes")}
            className={`border rounded-xl p-3 cursor-pointer transition ${
              selectedOption === "yes"
                ? "border-purple-600 bg-purple-50"
                : "border-gray-300"
            }`}
          >
            <p className="text-xs font-semibold text-white bg-purple-600 px-2 py-0.5 rounded w-fit">
              YES
            </p>
            <p className="text-sm text-gray-600 mt-2">All issue easy returns</p>
            <p className="text-base font-bold mt-3">₹{basePrice + easyReturnCharge}</p>
            <p className="text-green-600 text-xs mt-1">+₹15 Easy Return Charge</p>
          </div>

          {/* NO option */}
          <div
            onClick={() => setSelectedOption("no")}
            className={`border rounded-xl p-3 cursor-pointer transition ${
              selectedOption === "no"
                ? "border-purple-600 bg-purple-50"
                : "border-gray-300"
            }`}
          >
            <p className="text-xs font-semibold bg-gray-200 px-2 py-0.5 rounded w-fit">
              NO
            </p>
            <p className="text-sm text-gray-600 mt-2">Only wrong/defect returns</p>
            <p className="text-base font-bold mt-3">₹{basePrice}</p>
            <p className="text-green-600 text-xs mt-1">Save ₹15</p>
          </div>
        </div>

        {/* FINAL TOTAL */}
        <div className="bg-gray-100 mt-4 p-3 rounded-xl text-sm text-gray-700">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{finalAmount}</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => onAddToCart(finalAmount, selectedOption)}
            className="flex-1 border border-purple-600 text-purple-600 py-2 rounded-xl font-semibold"
          >
            Add to Cart
          </button>

          <button
            onClick={() => onBuyNow(finalAmount, selectedOption)}
            className="flex-1 bg-purple-600 text-white py-2 rounded-xl font-semibold"
          >
            Buy Now
          </button>
        </div>
      </div>

      <style>{`
        .animate-slide-up {
          animation: slideUp 0.28s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
