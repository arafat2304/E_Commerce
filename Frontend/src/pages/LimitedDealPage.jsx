import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const LimitedDealPage = () => {
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours timer
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  // 🧩 Dummy Data (with realistic IDs + ownerId)
  const limitedDeals = [
    {
      _id: "69032b33483c3efd6d3bdaf1",
      ownerId: "6901d02b96b996049ea20e1d",
      title: "Apple AirPods Pro (2nd Gen)",
      image: "https://images.unsplash.com/photo-1585386959984-a41552231693",
      oldPrice: 28999,
      newPrice: 24999,
      stockLeft: 2,
      totalStock: 10,
      rating: 4.8,
    },
    {
      _id: "69032b33483c3efd6d3bdaf2",
      ownerId: "6901d02b96b996049ea20e1d",
      title: "Samsung Galaxy Watch 6",
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c58d2a",
      oldPrice: 29999,
      newPrice: 25999,
      stockLeft: 1,
      totalStock: 8,
      rating: 4.6,
    },
    {
      _id: "69032b33483c3efd6d3bdaf3",
      ownerId: "6901d02b96b996049ea20e1d",
      title: "JBL Flip 6 Speaker",
      image: "https://images.unsplash.com/photo-1593032465171-d3379c6e193d",
      oldPrice: 9999,
      newPrice: 6999,
      stockLeft: 3,
      totalStock: 12,
      rating: 4.4,
    },
    {
      _id: "69032b33483c3efd6d3bdaf4",
      ownerId: "6901d02b96b996049ea20e1d",
      title: "Nike Air Max Shoes",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      oldPrice: 8999,
      newPrice: 4999,
      stockLeft: 2,
      totalStock: 15,
      rating: 4.7,
    },
    {
      _id: "69032b33483c3efd6d3bdaf5",
      ownerId: "6901d02b96b996049ea20e1d",
      title: "OnePlus Powerbank 10000mAh",
      image: "https://images.unsplash.com/photo-1606813902773-bfc3c6aa8d57",
      oldPrice: 1599,
      newPrice: 999,
      stockLeft: 1,
      totalStock: 20,
      rating: 4.3,
    },
    {
      _id: "69032b33483c3efd6d3bdaf6",
      ownerId: "6901d02b96b996049ea20e1d",
      title: "Casio Analog Watch",
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c58d2a",
      oldPrice: 3999,
      newPrice: 2999,
      stockLeft: 2,
      totalStock: 10,
      rating: 4.5,
    },
    {
      _id: "69032b33483c3efd6d3bdaf7",
      ownerId: "6901d02b96b996049ea20e1d",
      title: "Redmi Buds 5 Pro",
      image: "https://images.unsplash.com/photo-1593032465171-d3379c6e193d",
      oldPrice: 3999,
      newPrice: 2999,
      stockLeft: 1,
      totalStock: 15,
      rating: 4.4,
    },
    {
      _id: "69032b33483c3efd6d3bdaf8",
      ownerId: "6901d02b96b996049ea20e1d",
      title: "Sony WH-1000XM4 Headphones",
      image: "https://images.unsplash.com/photo-1616593989734-2b3a2b35e3b5",
      oldPrice: 29999,
      newPrice: 19999,
      stockLeft: 2,
      totalStock: 6,
      rating: 4.9,
    },
  ];

  // 🛒 Add to Cart Function
  const handleAddToCart = (item) => {
    const cartItem = {
      itemId: item._id,
      shopkeeperId: item.ownerId,
      name: item.title,
      image: item.image,
      price: item.newPrice,
      type: "product",
    };
    addToCart(cartItem);
  };

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <p className="text-sm text-gray-500">
            Hurry! These deals expire in{" "}
            <span className="text-orange-600 font-semibold">
              {formatTime(timeLeft)}
            </span>
          </p>

          <Link
            to="/"
            className="text-orange-500 hover:underline text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {limitedDeals.map((item) => {
            const progress =
              ((item.totalStock - item.stockLeft) / item.totalStock) * 100;

            return (
              <div
                key={item._id}
                onClick={() => handleCardClick(item._id)}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden relative cursor-pointer"
              >
                {/* 🖼️ Image Section */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-44 sm:h-48 object-cover"
                  />

                  {/* 🔥 Stock Badge */}
                  <span className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full animate-pulse shadow-sm">
                    🔥 Only {item.stockLeft} Left
                  </span>
                </div>

                {/* 📦 Product Info */}
                <div
                  className="p-3 sm:p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-[13px] sm:text-sm font-semibold text-gray-800 line-clamp-1 mb-1">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between mb-1">
                    <span className="text-orange-600 font-bold text-sm sm:text-base">
                      ₹{item.newPrice}
                    </span>
                    <span className="text-gray-400 text-[11px] sm:text-xs line-through">
                      ₹{item.oldPrice}
                    </span>
                  </div>

                  <div className="text-[11px] sm:text-xs text-gray-500 mb-2">
                    ⭐ {item.rating} / 5
                  </div>

                  {/* 📊 Stock Progress Bar */}
                  <div className="w-full bg-gray-200 h-2 rounded-full mb-2 overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-orange-500 to-red-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <p className="text-[11px] text-red-600 font-medium">
                    Hurry! {item.stockLeft} in stock
                  </p>

                  {/* 🛒 Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded-lg transition flex items-center justify-center gap-1"
                  >
                    <ShoppingCart size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LimitedDealPage;
