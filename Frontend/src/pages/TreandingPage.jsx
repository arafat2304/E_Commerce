import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const trendingDummy = [
  {
    _id: "69032b33483c3efd6d3bdaf1",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Wireless Headphones",
    newPrice: 1299,
    oldPrice: 1999,
    images:
      "https://cdn.pixabay.com/photo/2016/11/29/05/08/adult-1868750_1280.jpg",
    rating: 4.5,
    reviews: 120,
  },
  {
    _id: "69032b33483c3efd6d3bdaf2",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Smartwatch Series 5",
    newPrice: 1799,
    oldPrice: 2599,
    images:
      "https://cdn.pixabay.com/photo/2018/11/29/21/51/smartwatch-3842632_1280.jpg",
    rating: 4.6,
    reviews: 98,
  },
  {
    _id: "69032b33483c3efd6d3bdaf3",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Bluetooth Speaker",
    newPrice: 999,
    oldPrice: 1499,
    images:
      "https://cdn.pixabay.com/photo/2016/03/31/20/11/speaker-1296082_1280.png",
    rating: 4.2,
    reviews: 64,
  },
  {
    _id: "69032b33483c3efd6d3bdaf4",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Wireless Mouse",
    newPrice: 499,
    oldPrice: 899,
    images:
      "https://cdn.pixabay.com/photo/2014/12/16/22/25/mouse-570764_1280.jpg",
    rating: 4.1,
    reviews: 40,
  },
  {
    _id: "69032b33483c3efd6d3bdaf5",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Portable SSD 1TB",
    newPrice: 4899,
    oldPrice: 6999,
    images:
      "https://cdn.pixabay.com/photo/2014/04/05/11/39/ssd-316683_1280.jpg",
    rating: 4.7,
    reviews: 210,
  },
  {
    _id: "69032b33483c3efd6d3bdaf6",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Gaming Keyboard",
    newPrice: 2499,
    oldPrice: 3999,
    images:
      "https://cdn.pixabay.com/photo/2014/11/21/23/03/keyboard-540209_1280.jpg",
    rating: 4.4,
    reviews: 88,
  },
  {
    _id: "69032b33483c3efd6d3bdaf7",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Action Camera",
    newPrice: 7199,
    oldPrice: 9999,
    images:
      "https://cdn.pixabay.com/photo/2016/08/31/11/54/camera-1630699_1280.jpg",
    rating: 4.3,
    reviews: 54,
  },
  {
    _id: "69032b33483c3efd6d3bdaf8",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Fitness Band",
    newPrice: 999,
    oldPrice: 1499,
    images:
      "https://cdn.pixabay.com/photo/2015/01/09/02/37/fitness-593610_1280.jpg",
    rating: 4.0,
    reviews: 76,
  },
  {
    _id: "69032b33483c3efd6d3bdaf9",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Noise Cancelling Earbuds",
    newPrice: 1999,
    oldPrice: 2999,
    images:
      "https://cdn.pixabay.com/photo/2015/12/08/00/26/headphones-1080567_1280.jpg",
    rating: 4.5,
    reviews: 180,
  },
  {
    _id: "69032b33483c3efd6d3bdafa",
    ownerId: "6901d02b96b996049ea20e1d",
    title: "Portable Charger 20000mAh",
    newPrice: 1299,
    oldPrice: 1899,
    images:
      "https://cdn.pixabay.com/photo/2016/11/29/11/08/powerbank-1868723_1280.jpg",
    rating: 4.4,
    reviews: 95,
  },
];

export default function TrendingPage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

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
          <h2 className="text-xl font-bold text-gray-800">🔥 Trending Deals</h2>
          <Link to="/" className="text-orange-500 hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingDummy.map((item) => {
            const discount = Math.round(
              ((item.oldPrice - item.newPrice) / item.oldPrice) * 100
            );

            return (
              <div
                key={item._id}
                onClick={() => handleCardClick(item._id)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-3 flex flex-col relative overflow-hidden cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative mb-3">
                  <img
                    src={item.images}
                    alt={item.title}
                    className="w-full h-36 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                  />
                  {item.oldPrice && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-orange-500 font-bold text-base">
                    ₹{item.newPrice}
                  </span>
                  <span className="text-gray-400 text-xs line-through">
                    ₹{item.oldPrice}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-3">
                  ⭐ {item.rating} ({item.reviews} reviews)
                </div>

                {/* Add to Cart */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                  className="mt-auto bg-orange-500 text-white text-sm font-medium py-1.5 rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-1"
                >
                  <ShoppingCart size={14} /> Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
