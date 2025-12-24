import React from "react";
import { useCart } from "../context/CartContext";
import { Plus, Minus, Trash2, ShoppingBag, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCartPage() {
  const navigate = useNavigate();
  const { productCart, updateQuantity, removeFromCart } = useCart();

  if (!productCart?.length)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <ShoppingBag className="w-16 h-16 mb-3 text-gray-400" />
        <p className="text-lg font-medium">Your cart is empty 🛍️</p>
      </div>
    );

  const total = productCart.reduce(
    (sum, i) => sum + i.finalPrice * i.quantity,
    0
  );

  return (
    <div className="max-w-xl mx-auto px-3 py-6">
      <h1 className="text-2xl font-bold text-[#FF6A00] mb-4 text-center">
        Your Cart
      </h1>

      <div className="space-y-4">
        {productCart.map((item) => (
          <div
            key={item.itemId}
            className="bg-white rounded-xl shadow-sm border p-3 flex gap-3"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-contain rounded-lg bg-gray-50 flex-shrink-0"
              onClick={() => navigate(`/product/${item.itemId}`)}
            />

            {/* DETAILS */}
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <p
                  onClick={() => navigate(`/product/${item.itemId}`)}
                  className="font-semibold text-gray-800 text-sm leading-tight mb-1"
                >
                  {item.name}
                </p>

                {/* Return Policy */}
                {item.returnType === "YES" ? (
                  <p className="flex items-center gap-1 text-purple-600 text-xs font-medium">
                    <ShieldCheck className="w-3 h-3" /> Return Included (+₹15)
                  </p>
                ) : (
                  <p className="text-green-600 text-xs font-medium">
                    No Return (Saved ₹15)
                  </p>
                )}

                <p className="text-[11px] text-gray-500">
                  Base Price: ₹{item.basePrice}
                </p>
                {item.extraCharge > 0 && (
                  <p className="text-[11px] text-purple-600">
                    Return Charge: +₹{item.extraCharge}
                  </p>
                )}
              </div>

              {/* BOTTOM ROW */}
              <div className="flex items-center justify-between mt-2">
                {/* Qty Control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.itemId, "decrease", "product")
                    }
                    className="w-7 h-7 flex items-center justify-center border rounded-md bg-gray-50"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>

                  <span className="font-semibold text-sm">{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.itemId, "increase", "product")
                    }
                    className="w-7 h-7 flex items-center justify-center border rounded-md bg-gray-50"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.itemId, "product")}
                  className="text-red-500 text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
            </div>

            {/* PRICE */}
            <p className="font-bold text-gray-900 text-sm self-start">
              ₹{(item.finalPrice * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER TOTAL */}
      <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t shadow-md mt-6 rounded-t-xl">
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-semibold">Total</p>
          <p className="text-xl font-bold text-[#FF6A00]">
            ₹{total.toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => navigate("/shopping/checkout")}
          className="w-full py-3 bg-[#FF6A00] text-white rounded-xl font-semibold text-center text-base shadow-lg active:scale-[0.98] transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
