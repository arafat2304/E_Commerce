import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Minus, Plus, CreditCard } from "lucide-react";
import OrderSuccessPopup from "../seller/OrderSuccessPopup";

export default function BuyNowPage() {
  const { state: product } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!product)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        ❌ No product found
      </div>
    );
    console.log(product)

  const DELIVERY_CHARGE = 35;

  const subtotal = product.finalPrice * quantity;
  const total = subtotal + DELIVERY_CHARGE;

  // ORDER CREATE
  const createOrder = async () => {
    try {
      if (!token) return alert("Please login first!");

      const orderData = {
        productId: product._id,
        shopkeeperId: product.shopkeeperId,
        totalAmount: total,
        quantity,
        returnType: product.returnType,
        type:product.type
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/shoporder/create",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setOrderSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        alert("❌ Order failed!");
      }
    } catch (err) {
      alert("❌ Server error");
      console.log(err);
    }
  };

  // GOOGLE PAY HANDLER
  const handleGooglePay = () => {
    const upiId = "arafatmalek44@oksbi";
    const shopName = "raza";

    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      shopName
    )}&am=${total}&cu=INR&tn=${encodeURIComponent("Order Payment")}`;

    if (!/Android/i.test(navigator.userAgent)) {
      alert("Please open on Android with Google Pay installed.");
      return;
    }

    window.location.href = upiLink;

    setTimeout(() => {
      createOrder();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto my-6 px-3 grid md:grid-cols-3 gap-5">

      {/* Product Summary */}
      <div className="md:col-span-2 bg-white shadow-lg rounded-xl p-5 border">
        <h1 className="text-xl font-bold text-orange-600 mb-4">Order Summary</h1>

        <div className="border rounded-lg p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-20 h-20 object-cover rounded-lg border"
            />

            <div>
              <p className="font-semibold text-gray-900 text-sm">{product.title}</p>
              <p className="text-gray-500 text-xs">
                ₹{product.finalPrice} × {quantity}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Minus size={14} />
                </button>

                <span className="text-sm font-medium">{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          <p className="font-semibold text-gray-800">
            ₹{product.finalPrice * quantity}
          </p>
        </div>
      </div>

      {/* Payment & Summary */}
      <div className="bg-white shadow-xl rounded-xl p-5 border">
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
            ].map((pm) => (
              <label
                key={pm.id}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-sm cursor-pointer ${
                  paymentMethod === pm.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={pm.id}
                  checked={paymentMethod === pm.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-orange-500"
                />
                <span>{pm.label}</span>
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
            className="w-full bg-[#4285F4] text-white py-3 mt-5 rounded-lg font-semibold text-base shadow-md hover:bg-[#2f6fe2]"
          >
            Pay with Google Pay (₹{total})
          </button>
        ) : (
          <button
            onClick={createOrder}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 mt-5 rounded-lg font-semibold text-base shadow-md hover:from-orange-600 hover:to-orange-700"
          >
            <CreditCard className="inline mr-2 mb-1" size={18} />
            Place Order (COD)
          </button>
        )}
      </div>

      <OrderSuccessPopup show={orderSuccess} />
    </div>
  );
}
