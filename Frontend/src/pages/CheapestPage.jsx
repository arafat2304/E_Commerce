import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const cheapestDummy = [
  {
    _id: "69032b33483c3efd6d3bdaf1",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "USB Type-C Cable",
    newPrice: 149,
    oldPrice: 299,
    images: "https://cdn.pixabay.com/photo/2016/03/31/19/58/usb-1296088_1280.jpg",
    rating: 4.1,
    reviews: 32,
    stock: 12,
  },
  {
    _id: "69032b33483c3efd6d3bdaf2",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Plain Cotton Socks (Pack of 3)",
    newPrice: 99,
    oldPrice: 199,
    images: "https://cdn.pixabay.com/photo/2016/03/31/20/11/socks-1296083_1280.jpg",
    rating: 4.0,
    reviews: 14,
    stock: 5,
  },
  {
    _id: "69032b33483c3efd6d3bdaf3",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Coffee Mug",
    newPrice: 299,
    oldPrice: 599,
    images: "https://cdn.pixabay.com/photo/2015/04/08/13/13/coffee-712665_1280.jpg",
    rating: 4.5,
    reviews: 120,
    stock: 20,
  },
  {
    _id: "69032b33483c3efd6d3bdaf4",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Keychain Combo",
    newPrice: 99,
    oldPrice: 199,
    images: "https://cdn.pixabay.com/photo/2014/09/11/18/40/key-441992_1280.jpg",
    rating: 4.2,
    reviews: 20,
    stock: 2,
  },
  {
    _id: "69032b33483c3efd6d3bdaf5",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Notepad",
    newPrice: 59,
    oldPrice: 129,
    images: "https://cdn.pixabay.com/photo/2017/08/10/03/48/notebook-2618159_1280.jpg",
    rating: 4.0,
    reviews: 8,
    stock: 18,
  },
  {
    _id: "69032b33483c3efd6d3bdaf6",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Phone Stand",
    newPrice: 149,
    oldPrice: 249,
    images: "https://cdn.pixabay.com/photo/2016/03/31/20/11/phone-1296084_1280.jpg",
    rating: 4.1,
    reviews: 22,
    stock: 8,
  },
];

const priceRanges = [
  { label: "Under ₹199", max: 199 },
  { label: "Under ₹299", max: 299 },
  { label: "Under ₹499", max: 499 },
  { label: "Under ₹999", max: 999 },
];

export default function CheapestPage() {
  const [selectedRange, setSelectedRange] = useState(199);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const filteredProducts = cheapestDummy.filter(
    (p) => p.newPrice <= selectedRange
  );

  const handleAddToCart = (item) => {
    const cartItem = {
      itemId: item._id,
      shopkeeperId: item.ownerId,
      name: item.title,
      image: item.images,
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            💰 Cheapest Deals
          </h2>
          <Link
            to="/shopping"
            className="text-orange-600 hover:text-orange-700 font-medium text-sm"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Price Range Tabs */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-6">
          {priceRanges.map((range) => (
            <button
              key={range.max}
              onClick={() => setSelectedRange(range.max)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedRange === range.max
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white border text-gray-700 hover:bg-orange-100"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((item) => {
            const discount = Math.round(
              ((item.oldPrice - item.newPrice) / item.oldPrice) * 100
            );

            const stockColor =
              item.stock < 5
                ? "text-red-500"
                : item.stock < 10
                ? "text-orange-500"
                : "text-green-600";

            return (
              <div
                key={item._id}
                onClick={() => handleCardClick(item._id)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 p-3 flex flex-col relative overflow-hidden cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative mb-3">
                  <img
                    src={item.images}
                    alt={item.title}
                    className="w-full h-44 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                  />

                  {/* Limited Offer Badge */}
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-md font-semibold shadow-sm animate-pulse">
                    ⏰ Limited Offer
                  </span>

                  {/* Discount Tag */}
                  <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg shadow-md">
                    {discount}% OFF
                  </span>
                </div>

                {/* Product Info */}
                <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-orange-600 font-bold text-lg">
                    ₹{item.newPrice}
                  </span>
                  <span className="text-gray-400 text-xs line-through">
                    ₹{item.oldPrice}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-1">
                  ⭐ {item.rating} ({item.reviews} reviews)
                </div>

                {/* Stock Info */}
                <p className={`text-[11px] font-medium ${stockColor} mb-3`}>
                  {item.stock <= 5
                    ? `⚠️ Only ${item.stock} left in stock!`
                    : `${item.stock} in stock`}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                  className="mt-auto bg-orange-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-orange-600 transition-all"
                >
                  <ShoppingCart size={14} className="inline mr-1" />
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
