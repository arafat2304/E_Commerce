import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2, CreditCard } from "lucide-react";
import axios from "axios";
import OrderSuccessPopup from "./OrderSuccessPopup";

export default function ProductCheckoutPage() {
  const { productCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const DELIVERY_CHARGE = 35;

  // Subtotal (all items total)
  const subtotal = productCart.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0
  );

  // Final total
  const total = subtotal + DELIVERY_CHARGE;

  // -----------------------------------------------
  // CREATE SINGLE ORDER (all cart items)
  // -----------------------------------------------
  const createOrder = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("User not logged in!");
        return;
      }

      // -----------------------------------------
      // 1️⃣ Prepare ORDER ITEMS ARRAY
      // -----------------------------------------
      const items = productCart.map((item) => ({
        productId: item.itemId,
        shopkeeperId: item.shopkeeperId,
        quantity: item.quantity,
        returnType: item.returnType,
        type: item.type,
        basePrice: item.basePrice,
        total: item.finalPrice * item.quantity,
        image: item.image,
        name: item.name,
      }));

      // -----------------------------------------
      // 2️⃣ Prepare FULL ORDER DATA
      // -----------------------------------------
      const orderData = {
        items,
        subtotal,
        deliveryCharge: DELIVERY_CHARGE,
        totalAmount: total,
        paymentMethod,
      };

      console.log("FINAL ORDER DATA -> ", orderData);

      // -----------------------------------------
      // 3️⃣ SEND ONE ORDER TO BACKEND
      // -----------------------------------------
      await axios.post(
        "http://localhost:5000/api/shoporder/create",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // -----------------------------------------
      // 4️⃣ Show success popup
      // -----------------------------------------
      setOrderSuccess(true);

      // -----------------------------------------
      // 5️⃣ Clear cart AFTER popup starts
      // -----------------------------------------
      setTimeout(async () => {
        await clearCart();
      }, 300);

      // -----------------------------------------
      // 6️⃣ Redirect home
      // -----------------------------------------
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.log(error);
      alert("Server error while placing order");
    }
  };

  // -----------------------------------------------
  // GOOGLE PAY HANDLER
  // -----------------------------------------------
  const handleGooglePay = () => {
    const upiId = "arafatmalek44@oksbi";
    const shopName = "raza";

    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      shopName
    )}&am=${total}&cu=INR&tn=${encodeURIComponent("Order Payment")}`;

    if (!/Android/i.test(navigator.userAgent)) {
      alert("Please open this page on Android phone with Google Pay installed.");
      return;
    }

    window.location.href = upiLink;

    setTimeout(() => {
      createOrder(); // Payment done → order confirm
    }, 1500);
  };

  // -----------------------------------------------
  if (!productCart.length)
    return (
      <div className="text-center py-24 text-gray-500 text-lg">
        🛒 Your cart is empty
      </div>
    );

  // -----------------------------------------------
  // FRONTEND UI BELOW
  // -----------------------------------------------
  return (
    <div className="max-w-4xl mx-auto my-6 px-3 grid md:grid-cols-3 gap-5">
      {/* Cart Items */}
      <div className="md:col-span-2 bg-white shadow-lg rounded-xl p-5 border border-gray-100">
        <h1 className="text-xl font-bold text-orange-600 mb-4">
          Order Summary
        </h1>

        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {productCart.map((item) => (
            <div
              key={item.itemId}
              className="flex items-center justify-between border rounded-lg p-3 hover:shadow transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-18 h-18 object-cover rounded-lg border"
                />

                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {item.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    ₹{item.finalPrice} × {item.quantity}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.itemId, "decrease", "product")
                      }
                      className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="text-sm font-medium">{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.itemId, "increase", "product")
                      }
                      className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <button
                  onClick={() => removeFromCart(item.itemId, "product")}
                  className="text-red-500 hover:text-red-600 mb-1"
                >
                  <Trash2 size={18} />
                </button>
                <p className="font-semibold text-gray-800">
                  ₹{item.finalPrice * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment & Summary */}
      <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Payment & Summary
        </h2>

        {/* Payment Method */}
        <div className="mt-5">
          <h3 className="font-semibold mb-2 text-sm">Select Payment Method</h3>

          <div className="flex flex-col gap-2">
            {[
              { id: "gpay", label: "Google Pay" },
              { id: "cod", label: "Cash on Delivery" },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-sm transition cursor-pointer ${
                  paymentMethod === method.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-orange-500"
                />

                <span>{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="mt-5 border-t pt-3 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery:</span>
            <span>₹{DELIVERY_CHARGE}</span>
          </div>

          <div className="flex justify-between text-lg font-bold text-orange-600 border-t pt-3">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Buttons */}
        {paymentMethod === "gpay" ? (
          <button
            onClick={handleGooglePay}
            className="w-full bg-[#4285F4] text-white py-3 mt-5 rounded-lg font-semibold text-base shadow-md hover:bg-[#2f6fe2] transition"
          >
            Pay with Google Pay (₹{total})
          </button>
        ) : (
          <button
            onClick={createOrder}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 mt-5 rounded-lg font-semibold text-base shadow-md transition"
          >
            <CreditCard className="inline mr-2 mb-1" size={18} />
            Place Order (COD)
          </button>
        )}
      </div>

      {/* Success Animation */}
      <OrderSuccessPopup show={orderSuccess} />
    </div>
  );
}
