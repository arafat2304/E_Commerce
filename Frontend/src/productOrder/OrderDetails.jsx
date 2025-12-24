import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RotateCcw, PackageCheck } from "lucide-react";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/shoporder/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setOrder(res.data.order);
        }
      } catch (err) {
        console.error("Order details error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

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
              Ordered on{" "}
              {new Date(order.createdAt).toDateString()}
            </p>
          </div>

          {/* Status Badge */}
          <span
            className={`px-4 py-1 text-sm rounded-full font-medium capitalize ${
              order.status === "delivered"
                ? "bg-green-100 text-green-700"
                : order.status === "shipped"
                ? "bg-blue-100 text-blue-700"
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
            key={item.productId}
            className="flex gap-5 bg-white border rounded-xl p-4 shadow-sm"
          >
            {/* Image */}
            <div className="w-28 h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <p className="font-medium text-lg">{item.name}</p>

              <p className="text-sm text-gray-500 mt-1">
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
            </div>

            {/* Action */}
            {order.status === "delivered" &&
              item.returnType === "YES" && (
                <button className="self-center text-orange-600 font-medium flex items-center gap-1 hover:underline">
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
