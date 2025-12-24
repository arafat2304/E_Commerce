import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ManageProducts() {
  const navigate = useNavigate();
  const token = localStorage.getItem("shopkeeperToken");

  useEffect(() => {
    const checkBusinessType = async () => {
      try {
        if (!token) {
          toast.error("Please login to continue");
          return navigate("/shopkeeper/login");
        }

        const res = await axios.get("http://localhost:5000/api/shopkeeper/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const businessType = res.data?.businessType;

        if (businessType === "food") {
          navigate("/food/my-item");
        } else {
          navigate("/shopkeeper/my-product");
        }
      } catch (err) {
        toast.error("Failed to verify shopkeeper");
        navigate("/shopkeeper/login");
      }
    };

    checkBusinessType();
  }, [navigate, token]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600 bg-gray-50">
      Checking business type...
    </div>
  );
}
