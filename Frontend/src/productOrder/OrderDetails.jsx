import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RotateCcw, PackageCheck } from "lucide-react";

const RETURN_REASONS = [
  "DAMAGED",
  "DEFECTIVE",
  "WRONG_ITEM",
  "SIZE_ISSUE",
  "NOT_AS_EXPECTED",
  "OTHER",
];

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/shoporder/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setOrder(res.data.order);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  /* ---------------- CANCEL ORDER ---------------- */
  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.patch(
        `http://localhost:5000/api/shoporder/cancel/${order._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Order cancelled successfully");
      fetchOrder();
    } catch (err) {
      alert("Cancel failed");
    }
  };

  /* ---------------- RETURN ITEM ---------------- */
  const handleReturn = async (item) => {
    let reason = null;
    let customReason = null;

    // 🔹 Decide allowed reasons
    const allowedReasons =
      item.returnType === "YES"
        ? RETURN_REASONS
        : ["DAMAGED", "DEFECTIVE", "WRONG_ITEM"];

    reason = prompt(
      `Select return reason:\n${allowedReasons.join(", ")}`
    );

    if (!allowedReasons.includes(reason)) {
      alert("Invalid return reason");
      return;
    }

    if (reason === "OTHER") {
      customReason = prompt("Please write your return reason");
      if (!customReason) {
        alert("Custom reason is required");
        return;
      }
    }

    try {
      await axios.patch(
        `http://localhost:5000/api/shoporder/return/${order._id}/${item._id}`,
        { reason, customReason },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Return request submitted");
      fetchOrder();
    } catch (err) {
      alert("Return request failed");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading order details...</div>;
  }

  if (!order) {
    return <div className="p-6 text-center">Order not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* 🔝 Order Summary */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold mb-1">Order Details</h1>
            <p className="text-sm text-gray-500">
              Order ID: {order._id}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Ordered on {new Date(order.createdAt).toDateString()}
            </p>

            {/* ❌ Cancel Order */}
            {["pending", "confirmed"].includes(order.status) && (
              <button
                onClick={handleCancelOrder}
                className="mt-3 text-red-600 font-medium hover:underline"
              >
                Cancel Order
              </button>
            )}
          </div>

          {/* Status Badge */}
          <span
            className={`px-4 py-1 text-sm rounded-full font-medium capitalize ${
              order.status === "delivered"
                ? "bg-green-100 text-green-700"
                : order.status === "shipped"
                ? "bg-blue-100 text-blue-700"
                : order.status === "cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 text-lg font-semibold">
          <PackageCheck className="w-5 h-5 text-green-600" />
          Total Paid: ₹{order.totalAmount}
        </div>
      </div>

      {/* 🛍️ Items */}
      <div className="space-y-4">
        {order.items.map(item => (
          <div
            key={item._id}
            className="flex gap-5 bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="w-28 h-28 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <p className="font-medium text-lg">{item.name}</p>
              <p className="text-sm text-gray-500">
                Quantity: {item.quantity}
              </p>
              <p className="mt-2 text-lg font-semibold">
                ₹{item.total}
              </p>

              {item.returnType === "YES" && (
                <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  Return Protection Applied
                </span>
              )}

              {item.returnRequested && (
                <p className="mt-2 text-sm text-orange-600">
                  Return requested
                </p>
              )}
            </div>

            {/* 🔄 Return Button */}
            {order.status === "delivered" &&
              !item.returnRequested && (
                <button
                  onClick={() => handleReturn(item)}
                  className="self-center text-orange-600 font-medium flex items-center gap-1 hover:underline"
                >
                  <RotateCcw className="w-4 h-4" />
                  Request Return
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
