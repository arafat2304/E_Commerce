import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PackageCheck, Clock, Truck, XCircle } from "lucide-react";
import ShopkeeperNavbar from "./ShopkeeperNavbar";

export default function SellerDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("shopkeeperToken");

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/shoporder/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data.stats);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard stats");
      navigate("/shopkeeper/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please login to continue");
      navigate("/shopkeeper/login");
    } else {
      fetchStats();
    }
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/shopkeeper/home")}
        className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <h1 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        📦 Seller Order Dashboard
      </h1>

      {/* ✅ Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-5 text-center flex flex-col items-center">
          <PackageCheck className="text-blue-600 mb-2" size={28} />
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-2xl font-bold text-gray-800">
            {stats?.total || 0}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5 text-center flex flex-col items-center">
          <Clock className="text-yellow-600 mb-2" size={28} />
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-2xl font-bold text-gray-800">
            {stats?.pending || 0}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5 text-center flex flex-col items-center">
          <Truck className="text-green-600 mb-2" size={28} />
          <p className="text-gray-500 text-sm">Delivered</p>
          <h2 className="text-2xl font-bold text-gray-800">
            {stats?.delivered || 0}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5 text-center flex flex-col items-center">
          <XCircle className="text-red-600 mb-2" size={28} />
          <p className="text-gray-500 text-sm">Cancelled</p>
          <h2 className="text-2xl font-bold text-gray-800">
            {stats?.cancelled || 0}
          </h2>
        </div>
      </div>

      {/* 🔘 View Orders Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/shopkeeper/orders")}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium shadow hover:bg-orange-700 transition"
        >
          View All Orders
        </button>
      </div>
    </div>
  );
}
