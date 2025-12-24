import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getShopkeeperToken } from "../utils/shopkeeperAuth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AddFoodItem from "../food/AddFoodItem";
import AddProductItem from "./AddProductItem";

export default function AddItem() {
  const navigate = useNavigate();
  const [businessType, setBusinessType] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getShopkeeperToken();
        const shopkeeperRes = await axios.get("http://localhost:5000/api/shopkeeper/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const business = shopkeeperRes.data?.businessType || "shopping";
        setBusinessType(business);

        if (business === "food") {
          const restRes = await axios.get(
            `http://localhost:5000/api/restaurant/by-shopkeeper/${shopkeeperRes.data._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setRestaurantId(restRes.data.restaurantId);
        }
      } catch (err) {
        toast.error("Failed to load shopkeeper info");
      }
    };
    fetchData();
  }, []);

  if (!businessType)
    return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <button
        onClick={() => navigate("/shopkeeper/home")}
        className="absolute top-4 left-4 flex items-center text-orange-600 hover:text-orange-700"
      >
        <ArrowLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow mt-12 ">
        <h2 className="text-2xl font-semibold text-center text-orange-600">
          {businessType === "food" ? "": "🛍️ Add New Product"}
        </h2>

        {businessType === "food" ? (
          <AddFoodItem restaurantId={restaurantId} />
        ) : (
          <AddProductItem />
        )}
      </div>
    </div>
  );
}
