import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function FoodCheckoutPage() {
  const { foodCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [returnPolicy, setReturnPolicy] = useState(false);
  const deliveryCharge = 35;

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

  const subtotal = foodCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + deliveryCharge + (returnPolicy ? 15 : 0);

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully 🎉");
    clearCart("food");
    navigate("/food/orders");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-extrabold text-orange-500 mb-6 text-center">
        🍔 Food Checkout
      </h1>

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-6 border border-gray-100">
        {/* Cart Items */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Order Summary
          </h2>
          <div className="divide-y">
            {foodCart.map((item) => (
              <div
                key={item.itemId}
                className="flex justify-between py-3 items-center"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-orange-600">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Charges */}
        <div className="border-t pt-4 space-y-2 text-gray-700">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery Charge</p>
            <p>₹{deliveryCharge}</p>
          </div>
          <div className="flex justify-between">
            <p>Return Policy Fee</p>
            <p>{returnPolicy ? "₹15" : "₹0"}</p>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <p>Total Amount</p>
            <p className="text-orange-600">₹{total}</p>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all shadow-md mt-6"
        >
          ✅ Place Order
        </button>

        {/* Back to Restaurant */}
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition-all"
        >
          ← Back to Restaurant
        </button>
      </div>
    </div>
  );
}
