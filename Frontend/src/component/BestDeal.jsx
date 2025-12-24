// src/components/BestDealOfDay.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import  { useReturn } from "../context/ReturnContext"; // ✅ NEW

const bestDeals = [
  {
    _id: "69032b33483c3efd6d3bdaf1",
    ownerId: "6901d02b96b996049ea20e1d",
    name: "Apple iPhone 15",
    category: "Smartphone",
    image: "https://images.unsplash.com/photo-1695044374268-dfa8b67c0b9d",
    oldPrice: 159999,
    newPrice: 139999,
    rating: 4.9,
  },
  {
    _id: "69032b33483c3efd6d3bdaf2",
    ownerId: "6901d02b96b996049ea20e1d",
    name: "Sony WH-1000XM5 Headphones",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1580894908360-8687e4430eab",
    oldPrice: 29999,
    newPrice: 25999,
    rating: 4.8,
  },
  {
    _id: "69032b33483c3efd6d3bdaf3",
    ownerId: "6901d02b96b996049ea20e1d",
    name: "MacBook Air M2",
    category: "Laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    oldPrice: 119999,
    newPrice: 104999,
    rating: 4.7,
  },
];

export default function BestDealOfDay() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  

  const [timer, setTimer] = useState(24 * 60 * 60);
  const { openReturnModal } = useReturn(); // ⭐ NEW

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  const getDiscount = (oldPrice, newPrice) =>
    Math.round(((oldPrice - newPrice) / oldPrice) * 100);

  const handleAddToCart = (item) => {
    const cartItem = {
      itemId: item._id,
      shopkeeperId: item.ownerId,
      name: item.name,
      image: item.image,
      price: item.newPrice,
      type: "product",
    };
    addToCart(cartItem);
  };

  return (
    <section className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 px-4 mt-6 rounded-3xl shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">🔥 Best Deals of the Day</h2>
          <div className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
            ⏰ {hours}h {minutes}m {seconds}s left
          </div>
        </div>

        {/* Deals Cards */}
        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
          {bestDeals.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
              className="min-w-[250px] bg-white rounded-2xl text-gray-800 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 object-cover rounded-t-2xl"
                />

                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-md font-semibold shadow-sm">
                  {getDiscount(item.oldPrice, item.newPrice)}% OFF
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-3">
                <h3 className="text-base font-semibold truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">{item.category}</p>

                <div className="flex items-center justify-between mt-1">
                  <p className="text-orange-600 font-bold text-base">
                    ₹{item.newPrice}
                  </p>
                  <p className="text-gray-400 text-sm line-through">
                    ₹{item.oldPrice}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-gray-600 font-medium">
                    ⭐ {item.rating}
                  </span>

                  {/* Add to Cart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openReturnModal(item,"add")
                    }}
                    className="text-sm bg-orange-500 hover:bg-orange-600 text-white font-medium px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                  >
                    <ShoppingCart size={14} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-5">
          <button
            onClick={() => navigate("/bestdeal")}
            className="bg-white text-orange-600 px-5 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            View All Deals →
          </button>
        </div>
      </div>
    </section>
  );
}
