import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/shoporder/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.error("Fetch orders error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (orders.length === 0) {
    return <div className="p-6 text-center">No orders found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-3">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>

      {orders.map(order => {
        const item = order.items?.[0];

        return (
          <div
            key={order._id}
            className="flex items-center justify-between gap-4 bg-white border rounded-lg p-3 hover:bg-gray-50 transition"
          >
            {/* LEFT: Image + Name */}
            <div className="flex items-center gap-4">
              {/* 🖼️ Image */}
              <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                {item?.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Package />
                  </div>
                )}
              </div>

              {/* 🏷️ Name */}
              <p className="font-medium text-gray-900">
                {item?.name}
              </p>
            </div>

            {/* RIGHT: Status + View more */}
            <div className="flex items-center gap-4">
              {/* 📦 Status */}
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "shipped"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {order.status}
              </span>

              {/* 👉 View more */}
              <button
                onClick={() => navigate(`/orders/${order._id}`)}
                className="text-sm text-[#FF6A00] font-medium hover:underline"
              >
                View more →
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
