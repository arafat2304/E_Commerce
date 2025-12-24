import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return navigate("/login");

    axios
      .get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCart(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  if (!cart) return <p className="text-center text-gray-500">Loading...</p>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.foodId.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">🛒 Your Cart</h1>
      {cart.items.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <div className="max-w-2xl mx-auto">
          {cart.items.map((item) => (
            <div
              key={item.foodId._id}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <p className="font-medium">{item.foodId.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{item.foodId.price} × {item.quantity}
                </p>
              </div>
              <p className="font-semibold">
                ₹{item.foodId.price * item.quantity}
              </p>
            </div>
          ))}
          <div className="mt-6 text-right font-bold text-lg">
            Total: ₹{total}
          </div>
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full md:w-auto mx-auto block"
      >
        ← Back
      </button>
    </div>
  );
}
