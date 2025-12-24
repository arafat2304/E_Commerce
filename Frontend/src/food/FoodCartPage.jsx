import React from "react";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FoodCartPage() {
  const { foodCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!foodCart?.length)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <img
          src="/empty-cart.svg"
          alt="Empty cart"
          className="w-48 h-48 mb-4 opacity-80"
        />
        <p className="text-lg">Your food cart is empty 🍽️</p>
      </div>
    );

  const total = foodCart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  console.log(foodCart)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-extrabold text-orange-500 mb-6 text-center">
        🍔 Food Cart
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-5 space-y-5 border border-gray-100">
        {foodCart.map((item) => (
          <div
            key={item.itemId}
            className="flex justify-between items-center border-b pb-4 last:border-none bg-white rounded-xl hover:shadow-md transition cursor-pointer"
          >
            {/* ✅ Clickable Section - navigates to Restaurant */}
            <div
              className="flex items-center gap-4 flex-1"
              onClick={() => navigate(`/food/restaurant/${item.restaurantId}`)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover shadow-sm hover:scale-105 transition-transform"
              />
              <div>
                <p className="font-semibold text-lg text-gray-800 hover:text-orange-500 transition">
                  {item.name}
                </p>
                <p className="text-gray-500 text-sm">
                  ₹{item.price} × {item.quantity}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  From: {item.restaurantName || "Restaurant"}
                </p>
              </div>
            </div>

            {/* Quantity + Remove */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-3 mt-2">
                <button
                  onClick={() => updateQuantity(item.itemId, "decrease", "food")}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.itemId, "increase", "food")}
                  className="p-1 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <p className="font-semibold text-orange-600 mt-2">
                ₹{item.price * item.quantity}
              </p>

              <button
                onClick={() => removeFromCart(item.itemId, "food")}
                className="text-red-500 hover:text-red-600 mt-2 flex items-center gap-1 text-sm transition"
              >
                <Trash2 className="w-4 h-4" /> Remove
              </button>
            </div>
          </div>
        ))}

        {/* Total + Checkout */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <p className="font-bold text-xl text-gray-800">Total:</p>
          <p className="font-extrabold text-2xl text-orange-600">₹{total}</p>
        </div>

        <button
          onClick={() => navigate("/food/checkout")}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all shadow-md"
        >
          🧾 Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
