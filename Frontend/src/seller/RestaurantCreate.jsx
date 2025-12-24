import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RestaurantCreate({ ownerId }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    cuisineType: "",
    address: "",
    phone: "",
    deliveryTime: "30 mins",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please select an image!");

    const token = localStorage.getItem("authToken");
    if (!token) return toast.error("You must be logged in to create a restaurant!");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("cuisineType", form.cuisineType);
    formData.append("address", form.address);
    formData.append("phone", form.phone);
    formData.append("deliveryTime", form.deliveryTime);
    formData.append("ownerId", ownerId);
    formData.append("image", image);

    try {
      setUploading(true);

      await axios.post("http://localhost:5000/api/restaurant/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Restaurant created successfully!");
      navigate("/shopkeeper/home"); // 👈 redirect on success

      // reset form
      setForm({
        name: "",
        description: "",
        cuisineType: "",
        address: "",
        phone: "",
        deliveryTime: "30 mins",
      });
      setImage(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create restaurant");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Create Your Restaurant
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Restaurant Name"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            name="cuisineType"
            value={form.cuisineType}
            onChange={handleChange}
            placeholder="Cuisine Type (e.g. Indian, Chinese)"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Upload Restaurant Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-full h-48 object-cover rounded-lg border"
              />
            )}
          </div>

          <input
            name="deliveryTime"
            value={form.deliveryTime}
            onChange={handleChange}
            placeholder="Delivery Time"
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600"
            disabled={uploading}
          >
            {uploading ? "Creating..." : "Create Restaurant"}
          </button>
        </form>
      </div>
    </div>
  );
}
