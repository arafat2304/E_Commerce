// src/shopkeeper/AddProductItem.jsx
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getShopkeeperToken } from "../utils/shopkeeperAuth";

export default function AddProductItem() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    oldPrice: "",
    newPrice: "",
    stock: "",
    images: [],
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) return toast.error("Max 4 images allowed");
    setForm({ ...form, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getShopkeeperToken();
      const data = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (key === "images") val.forEach((f) => data.append("images", f));
        else data.append(key, val);
      });

      const res = await axios.post(
        "http://localhost:5000/api/shopproduct/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message || "Product added successfully!");
      setForm({
        title: "",
        description: "",
        category: "",
        tags: "",
        oldPrice: "",
        newPrice: "",
        stock: "",
        images: [],
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Product Title"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Product Description"
        className="w-full border p-2 rounded"
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full border p-2 rounded"
      />
      <input
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="Tags (comma separated)"
        className="w-full border p-2 rounded"
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          name="oldPrice"
          type="number"
          value={form.oldPrice}
          onChange={handleChange}
          placeholder="Old Price ₹"
          className="w-full border p-2 rounded"
        />
        <input
          name="newPrice"
          type="number"
          value={form.newPrice}
          onChange={handleChange}
          placeholder="New Price ₹"
          className="w-full border p-2 rounded"
        />
      </div>
      <input
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock Quantity"
        className="w-full border p-2 rounded"
      />
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
      >
        Add Product
      </button>
    </form>
  );
}
