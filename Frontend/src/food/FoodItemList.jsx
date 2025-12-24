import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import ShopkeeperNavbar from "../seller/ShopkeeperNavbar";

export default function FoodItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("shopkeeperToken");
  const shopkeeperId = localStorage.getItem("shopkeeperId");

  const fetchItems = async () => {
    try {
      const restaurantRes = await axios.get(
        `http://localhost:5000/api/restaurant/by-shopkeeper/${shopkeeperId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const restaurantId = restaurantRes.data?.restaurantId;

      const res = await axios.get(
        `http://localhost:5000/api/food/${restaurantId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setItems(Array.isArray(res.data.data) ? res.data.data : res.data.items || []);
    } catch (err) {
      toast.error("Failed to fetch food items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <ShopkeeperNavbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          🍽️ Manage Your Food Items
        </h1>

        {items.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No food items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow p-4 border flex flex-col justify-between"
              >
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="h-44 w-full object-cover rounded-xl mb-3"
                />
                <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-orange-600 font-semibold mt-2">
                  ₹{item.price}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() =>
                      navigate(`/shopkeeper/edit-food/${item._id}`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => toast("Delete endpoint not added yet")}
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
