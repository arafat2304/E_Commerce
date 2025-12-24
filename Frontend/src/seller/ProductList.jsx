import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import ShopkeeperNavbar from "./ShopkeeperNavbar";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("shopkeeperToken");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/shopproduct/my-products",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(Array.isArray(res.data) ? res.data : res.data.products || []);
    } catch (err) {
      toast.error("Failed to fetch products");
      navigate("/shopkeeper/login");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/shopproduct/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <ShopkeeperNavbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          🛍️ Manage Your Products
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow p-4 border flex flex-col justify-between"
              >
                <img
                  src={p.images?.[0] || "/placeholder.png"}
                  alt={p.title}
                  className="h-44 w-full object-cover rounded-xl mb-3"
                />
                <h3 className="font-semibold text-lg truncate">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.category}</p>
                <p className="text-orange-600 font-semibold mt-2">
                  ₹{p.newPrice}{" "}
                  <span className="text-gray-400 line-through text-sm">
                    ₹{p.oldPrice}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">Stock: {p.stock}</p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() =>
                      navigate(`/shopkeeper/edit-product/${p._id}`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
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
