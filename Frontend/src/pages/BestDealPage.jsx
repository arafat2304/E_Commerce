import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext"; // 🧠 using your context
import toast from "react-hot-toast";

const bestDummy = [
  {
    _id: "69032b33483c3efd6d3bdaf1",
    shopkeeperId: "6901d02b96b996049ea20e1d",
    title: "JBL Bluetooth Speaker",
    newPrice: 2999,
    oldPrice: 4999,
    images:
      "https://cdn.pixabay.com/photo/2015/12/08/00/26/speaker-1080567_1280.jpg",
    rating: 4.9,
    reviews: 340,
  },
  {
    _id: "69032b33483c3efd6d3bdaf2",
    shopkeeperId: "6901d02b96b996049ea20e1d",
    title: "Lenovo Wireless Mouse",
    newPrice: 499,
    oldPrice: 899,
    images:
      "https://cdn.pixabay.com/photo/2014/12/16/22/25/mouse-570764_1280.jpg",
    rating: 4.7,
    reviews: 220,
  },
  {
    _id: "69032b33483c3efd6d3bdaf4",
    shopkeeperId: "6901d02b96b996049ea20e1d",
    title: "Roadster Denim Jacket",
    newPrice: 1499,
    oldPrice: 2499,
    images:
      "https://cdn.pixabay.com/photo/2016/03/31/20/11/jacket-1296087_1280.jpg",
    rating: 4.6,
    reviews: 130,
  },
  {
    _id: "69032b33483c3efd6d3bdaf6",
    shopkeeperId: "6901d02b96b996049ea20e1d",
    title: "Philips Hair Dryer",
    newPrice: 1299,
    oldPrice: 1999,
    images:
      "https://cdn.pixabay.com/photo/2016/11/29/11/08/hairdryer-1868723_1280.jpg",
    rating: 4.5,
    reviews: 88,
  },
  {
    _id: "69032b33483c3efd6d3bdaf5",
    shopkeeperId: "6901d02b96b996049ea20e1d",
    title: "4K Smart TV 55\"",
    newPrice: 59999,
    oldPrice: 74999,
    images:
      "https://cdn.pixabay.com/photo/2016/11/29/05/08/tv-1868749_1280.jpg",
    rating: 4.7,
    reviews: 64,
  },
];

export default function BestDealPage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    const cartItem = {
      itemId: item._id,
      shopkeeperId: item.shopkeeperId,
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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            🔥 Best Deals
          </h2>
          <Link
            to="/"
            className="text-orange-500 hover:text-orange-600 hover:underline text-sm sm:text-base"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {bestDummy.map((item) => (
            <div
              key={item._id}
              onClick={() => handleCardClick(item._id)}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100 group cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative w-full h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src={item.images}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info Section */}
              <div
                className="p-3 flex flex-col justify-between min-h-[140px]"
                onClick={(e) => e.stopPropagation()} // prevent navigation when clicking button
              >
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-1">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between mt-1">
                  <p className="text-orange-600 font-bold text-sm sm:text-base">
                    ₹{item.newPrice.toLocaleString()}
                  </p>
                  {item.oldPrice && (
                    <p className="text-xs text-gray-400 line-through">
                      ₹{item.oldPrice.toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs text-yellow-500 mt-1">
                  ⭐ {item.rating}{" "}
                  <span className="text-gray-500">
                    ({item.reviews} reviews)
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-3 flex items-center justify-center gap-2 bg-orange-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-orange-600 transition-colors w-full"
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
