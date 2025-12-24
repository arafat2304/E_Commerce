import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, XCircle } from "lucide-react";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("shopkeeperToken");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/shoporder/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
      navigate("/shopkeeper/login");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/shoporder/update-status/${orderId}`,
        { status: "cancelled" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order Cancelled!");

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "cancelled" } : o
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    }
  };
console.log(orders)
  useEffect(() => {
    if (!token) {
      toast.error("Please login to continue");
      navigate("/shopkeeper/login");
    } else {
      fetchOrders();
    }
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading orders...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate("/shopkeeper/home")}
        className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        📦 Your Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders received yet.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow p-5 border border-gray-100"
            >
              {/* Order Header */}
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <p className="text-sm text-gray-500">
                    Buyer: {order.userId?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>

              {/* Items List */}
              <div className="mt-4 border-t pt-3 space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                      <p className="text-sm font-semibold text-orange-600">
                        Total: ₹{item.total}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ONLY CANCEL BUTTON */}
              {order.status === "pending" && (
                <div className="mt-4 flex">
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                  >
                    <XCircle size={16} /> Cancel Order
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
