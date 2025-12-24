import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { User, Mail, Store, CalendarDays, LogOut } from "lucide-react";
import ShopkeeperNavbar from "./ShopkeeperNavbar";

export default function SellerProfile() {
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const token = localStorage.getItem("shopkeeperToken");

  // 🧠 Fetch seller details
  const fetchSellerDetails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/shopkeeper/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSeller(res.data);
      console.log(seller)
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile details");
      navigate("/shopkeeper/login");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/shopkeeper/login");
    } else {
      fetchSellerDetails();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("shopkeeperToken");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  if (!seller)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );

  return (
    <>
      <ShopkeeperNavbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 text-center">
          {/* 🧑 Seller Avatar */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-[#FF6A00]/10 text-[#FF6A00] flex items-center justify-center rounded-full text-3xl font-bold">
              {seller?.name?.charAt(0)?.toUpperCase() || "S"}
            </div>
          </div>

          {/* 👤 Seller Info */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">{seller?.name}</h2>
          <p className="text-sm text-gray-500 mb-6">
            Shopkeeper since {new Date(seller?.createdAt).toLocaleDateString()}
          </p>

          <div className="space-y-3 text-left text-gray-700 mb-6">
            <div className="flex items-center gap-2">
              <Store className="text-[#FF6A00]" size={18} />
              <span>
                <strong>Shop Name:</strong> {seller?.businessName || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-[#FF6A00]" size={18} />
              <span>
                <strong>Email:</strong> {seller?.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="text-[#FF6A00]" size={18} />
              <span>
                <strong>Joined:</strong>{" "}
                {new Date(seller?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* 🔘 Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-[#FF6A00] hover:bg-[#e85a00] text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
