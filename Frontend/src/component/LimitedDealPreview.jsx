import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import  { useReturn } from "../context/ReturnContext"; // ✅ NEW

// 🧩 Updated Dummy Data with _id & ownerId
const limitedDeals = [
  {
    _id: "69032b33483c3efd6d3bd551",
    ownerId: "6901d02b96b996049ea20e1d",
    name: "Apple AirPods Pro (2nd Gen)",
    image: "https://images.unsplash.com/photo-1585386959984-a41552231693",
    oldPrice: 28999,
    newPrice: 24999,
    stockLeft: 2,
    totalStock: 10,
    rating: 4.8,
  },
  {
    _id: "69032b33483c3efd6d3bd552",
    ownerId: "6901d02b96b996049ea20e1d",
    name: "Samsung Galaxy Watch 6",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c58d2a",
    oldPrice: 29999,
    newPrice: 25999,
    stockLeft: 1,
    totalStock: 8,
    rating: 4.6,
  },
  {
    _id: "69032b33483c3efd6d3bd553",
    ownerId: "6901d02b96b996049ea20e1d",
    name: "JBL Flip 6 Speaker",
    image: "https://images.unsplash.com/photo-1585386959984-a41552231693",
    oldPrice: 9999,
    newPrice: 6999,
    stockLeft: 3,
    totalStock: 12,
    rating: 4.4,
  },
  {
    _id: "69032b33483c3efd6d3bd554",
    ownerId: "6901d02b96b996049ea20e1d",
    name: "Nike Air Max Shoes",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    oldPrice: 8999,
    newPrice: 4999,
    stockLeft: 2,
    totalStock: 15,
    rating: 4.7,
  },
  {
    _id: "69032b33483c3efd6d3bd555",
    ownerId: "6901d02b96b996049ea20e1d",
    name: "OnePlus Powerbank 10000mAh",
    image: "https://images.unsplash.com/photo-1606813902773-bfc3c6aa8d57",
    oldPrice: 1599,
    newPrice: 999,
    stockLeft: 1,
    totalStock: 20,
    rating: 4.3,
  },
  {
    _id: "69032b33483c3efd6d3bd556",
    ownerId: "6901d02b96b996049ea20e1d",
    name: "Casio Analog Watch",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c58d2a",
    oldPrice: 3999,
    newPrice: 2999,
    stockLeft: 2,
    totalStock: 10,
    rating: 4.5,
  },
];

export default function LimitedDealPreview() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { openReturnModal } = useReturn(); // ⭐ NEW

  const handleAddToCart = (e, item) => {
    e.stopPropagation(); // Prevent card navigation

    const cartItem = {
      itemId: item._id,
      shopkeeperId: item.ownerId,
      name: item.name,
      price: item.newPrice,
      image: item.image,
      type: "product",
    };

    addToCart(cartItem);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-3xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Limited Stock Deal
        </h2>
        <button
          onClick={() => navigate("/shopping/limited-deals")}
          className="text-orange-600 hover:text-orange-700 font-medium text-sm"
        >
          View More →
        </button>
      </div>

      {/* Scroll Cards */}
      <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
        {limitedDeals.slice(0, 6).map((item) => {
          const progress =
            ((item.totalStock - item.stockLeft) / item.totalStock) * 100;

          return (
            <div
              key={item._id}
              className="min-w-[230px] bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 relative cursor-pointer"
            >
              <div className="relative"
              onClick={() => navigate(`/product/${item._id}`)}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 object-cover rounded-t-2xl"
                />

                {/* Stock Badge */}
                <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full animate-pulse shadow-sm">
                  🔥 Only {item.stockLeft} Left
                </span>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                  {item.name}
                </h3>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-orange-600 font-bold text-base">
                    ₹{item.newPrice}
                  </span>
                  <span className="text-gray-400 text-xs line-through">
                    ₹{item.oldPrice}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <p className="text-[11px] text-red-600 font-medium mt-1">
                  Hurry! {item.stockLeft} left in stock
                </p>

                {/* Add to Cart */}
                <button
                  onClick={() => openReturnModal(item, "add")}
                  className="mt-2 w-full flex items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded-lg transition"
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
