import React, { useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { productsData } from "../Data.js";
import { ShoppingCart, Star, CreditCard } from "lucide-react";
import RecommendedProducts from "../component/RecommendedProducts";

export default function ProductDetail() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === Number(id));
  const [mainImg, setMainImg] = useState();
  const [zoom, setZoom] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  // ✅ Scroll to top when product changes
  // ✅ Reset gallery & scroll top when product changes
   const gallery = [
        product.img,
        "https://source.unsplash.com/random/600x600?clothes",
        "https://source.unsplash.com/random/600x600?apparel",
        "https://source.unsplash.com/random/600x600?fashion",
      ];
  useEffect(() => {
    if (product) {
      setMainImg(gallery[0]);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedSize(""); // reset selected size
  }, [id, product]);

  if (!product)
    return (
      <div  className="text-center py-20 text-gray-500">Product not found</div>
    );

  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div key={id} className="max-w-6xl mx-auto px-4 py-10">
      {/* ---------- Product Layout ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        {/* 🖼️ Image Gallery */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 justify-center md:justify-start">
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
          <p className="text-lg text-gray-600 mb-1">
            Category:{" "}
            <span className="capitalize text-gray-800 font-medium">
              {product.category}
            </span>
          </p>

          <div className="text-3xl font-bold text-orange-600 mb-2">
            {product.price}
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
            This premium-quality {product.category} product offers unmatched
            durability, style, and comfort. Whether for work or daily use, it’s
            designed to fit seamlessly into your lifestyle.
          </p>

          {/* 👕 Size Selector — visible for fashion items */}
          {product.category.toLowerCase() === "fashion" && (
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
              {selectedSize && (
                <p className="text-sm text-gray-500 mt-1">
                  Selected size:{" "}
                  <span className="font-semibold">{selectedSize}</span>
                </p>
              )}
            </div>
          )}

          {/* 🛒 Buttons */}
          <div className="flex gap-3">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition">
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition">
              <CreditCard size={20} />
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Reviews Section ---------- */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

        {/* Mock Reviews */}
        <div className="space-y-6">
          {[
            {
              name: "Ravi Kumar",
              rating: 5,
              comment:
                "Excellent quality and fast delivery! The product looks even better than pictures.",
            },
            {
              name: "Sneha Patel",
              rating: 4,
              comment:
                "Very comfortable and stylish. Worth the price. Would definitely recommend!",
            },
          ].map((r, i) => (
            <div key={i} className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-800">{r.name}</h4>
                <div className="flex">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className={`${
                        j < r.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{r.comment}</p>
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Write a Review</h4>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-3 max-w-md"
          >
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              placeholder="Share your experience..."
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg font-medium"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>

      {/* ---------- Recommended Products ---------- */}
      <RecommendedProducts category={product.category} currentId={product.id} />
    </div>
  );
}
