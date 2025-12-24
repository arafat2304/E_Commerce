import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Star, CreditCard } from "lucide-react";
import RecommendedProducts from "../component/RecommendedProducts";
import AddReview from "../component/AddReview";
import ProductReviews from "../component/ProductReviews";
import toast from "react-hot-toast";
import  { useReturn } from "../context/ReturnContext"; // ✅ NEW

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { openReturnModal } = useReturn(); // ⭐ NEW

  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [zoom, setZoom] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);

  // Load product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/shopproduct/${id}`);
        const data = await res.json();
        setProduct(data);
        if (data.images && data.images.length > 0) setMainImg(data.images[0]);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading)
    return <div className="text-center py-20 text-gray-500">Loading product...</div>;

  if (!product)
    return <div className="text-center py-20 text-gray-500">Product not found</div>;

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const gallery = product.images?.length > 0 ? product.images : ["/placeholder.png"];


  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* ---------- Product Layout ---------- */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">

        {/* 🖼️ Image Gallery */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 justify-center md:justify-start overflow-x-auto">
            {gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setMainImg(img)}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                  mainImg === img
                    ? "border-orange-500 shadow-md"
                    : "border-gray-200"
                } transition`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-lg p-4">
            <img
              src={mainImg}
              alt={product.title}
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              className={`w-full max-w-md h-auto object-contain rounded-lg transition-transform duration-300 ${
                zoom ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        </div>

        {/* 🧾 Product Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            {product.title}
          </h2>
          <p className="text-sm text-gray-600 mb-1">
            Sold by:
            <span className="font-medium text-gray-800">
              {product.shopkeeperId?.name || "Shopkeeper"}
            </span>
          </p>

          <p className="text-lg text-gray-600 mb-1">
            Category:
            <span className="capitalize text-gray-800 font-medium">
              {product.category}
            </span>
          </p>

          <div className="text-3xl font-bold text-orange-600 mb-2">
            ₹{product.newPrice}
            <span className="text-lg line-through text-gray-400 ml-2">
              ₹{product.oldPrice}
            </span>
          </div>

          <div className="text-gray-500 mb-4 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`${
                  i < Math.floor(Math.random() * 2) + 4
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {Math.floor(Math.random() * 5000) + 300} ratings
            </span>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description || "No detailed description available."}
          </p>

          {/* 👕 Size Selector */}
          {product?.category?.toLowerCase() === "fashion" && (
            <div className="mb-6">
              <h4 className="font-medium mb-2">Select Size</h4>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-10 h-10 rounded-full border text-sm font-semibold ${
                      selectedSize === s
                        ? "bg-orange-600 text-white border-orange-600"
                        : "border-gray-300 text-gray-700 hover:border-orange-400"
                    } transition`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 🛒 Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
               onClick={() => openReturnModal(product, "add")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <button
               onClick={() => openReturnModal(product, "buy")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition"
            >
              <CreditCard size={20} />
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <hr className="my-6" />

      <AddReview productId={product._id} onReviewAdded={() => window.location.reload()} />
      <ProductReviews productId={product._id} />
      <RecommendedProducts category={product.category} currentId={product._id} />
    </div>
  );
}
