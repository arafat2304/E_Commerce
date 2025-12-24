import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getShopkeeperToken } from "../utils/shopkeeperAuth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AddFoodItem({ restaurantId }) {
  const navigate = useNavigate();
  const [foodForm, setFoodForm] = useState({
    name: "",
    description: "",
    price: "",
    portionSize: "", // 👈 new field
    category: "Main Course",
    isAvailable: true,
    image: null,
  });

  const categories = [
    "Starters",
    "Main Course",
    "Desserts",
    "Beverages",
    "Snacks",
    "Soups",
    "Salads",
    "Breakfast",
  ];

  const handleChange = (e) =>
    setFoodForm({ ...foodForm, [e.target.name]: e.target.value });

  const handleImageChange = (e) =>
    setFoodForm({ ...foodForm, image: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getShopkeeperToken();
      if (!restaurantId) return toast.error("Restaurant not found!");

      const data = new FormData();
      Object.entries(foodForm).forEach(([key, val]) => data.append(key, val));
      data.append("restaurantId", restaurantId);

      const res = await axios.post("http://localhost:5000/api/food", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message || "Dish added successfully!");
      setFoodForm({
        name: "",
        description: "",
        price: "",
        portionSize: "",
        category: "Main Course",
        isAvailable: true,
        image: null,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add dish");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center">
      {/* Top Header */}
      <div className="w-full bg-orange-500 py-4 px-6 flex items-center justify-between shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-gray-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
        <h1 className="text-white text-lg md:text-2xl font-semibold">
          Add New Dish
        </h1>
        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Form Section */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 mt-8 mb-10">
        <h2 className="text-xl font-semibold text-orange-600 mb-4 text-center">
          Enter Dish Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={foodForm.name}
            onChange={handleChange}
            placeholder="Dish Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />

          <textarea
            name="description"
            value={foodForm.description}
            onChange={handleChange}
            placeholder="Dish Description"
            rows={3}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          {/* Quantity / Portion Field */}
          <input
            name="portionSize"
            value={foodForm.portionSize}
            onChange={handleChange}
            placeholder="Portion / Quantity (e.g. 1 Plate, 250g, 1kg)"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />

          <input
            name="price"
            type="number"
            value={foodForm.price}
            onChange={handleChange}
            placeholder="Price ₹"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />

          {/* Category Dropdown */}
          <select
            name="category"
            value={foodForm.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Availability */}
          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              checked={foodForm.isAvailable}
              onChange={(e) =>
                setFoodForm({ ...foodForm, isAvailable: e.target.checked })
              }
              className="h-5 w-5 accent-orange-500"
            />
            <label className="text-gray-700 font-medium">
              Available for Order
            </label>
          </div>

          {/* Image Upload */}
          <div className="border border-dashed border-orange-300 p-4 rounded-lg text-center">
            <label className="text-gray-700 font-medium block mb-2">
              Upload Dish Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-gray-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Add Dish
          </button>
        </form>
      </div>
    </div>
  );
}
