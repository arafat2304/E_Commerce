import React from "react";
import { useNavigate } from "react-router-dom";
import  { useReturn } from "../context/ReturnContext"; // ✅ NEW

const cheapestDummy = [
  {
    _id: 1,
    name: "USB Type-C Cable",
    category: "Accessories",
    image: "https://cdn.pixabay.com/photo/2016/03/31/19/58/usb-1296088_1280.jpg",
    oldPrice: 299,
    newPrice: 149,
    rating: 4.1,
  },
  {
    _id: 2,
    name: "Plain Cotton Socks (Pack of 3)",
    category: "Clothing",
    image: "https://cdn.pixabay.com/photo/2016/03/31/20/11/socks-1296083_1280.jpg",
    oldPrice: 199,
    newPrice: 99,
    rating: 4.0,
  },
  {
    _id: 3,
    name: "Coffee Mug",
    category: "Home",
    image: "https://cdn.pixabay.com/photo/2015/04/08/13/13/coffee-712665_1280.jpg",
    oldPrice: 599,
    newPrice: 299,
    rating: 4.5,
  },
  {
    _id: 4,
    name: "Keychain Combo",
    category: "Accessories",
    image: "https://cdn.pixabay.com/photo/2014/09/11/18/40/key-441992_1280.jpg",
    oldPrice: 199,
    newPrice: 99,
    rating: 4.2,
  },
  {
    _id: 5,
    name: "Phone Stand",
    category: "Gadgets",
    image: "https://cdn.pixabay.com/photo/2016/03/31/20/11/phone-1296084_1280.jpg",
    oldPrice: 249,
    newPrice: 149,
    rating: 4.1,
  },
];

export default function CheapestDeal() {
  const navigate = useNavigate();
  const { openReturnModal } = useReturn(); // ⭐ NEW

  const addToCart = () =>{
    alert("cart")
  }

  const getDiscount = (oldPrice, newPrice) =>
    Math.round(((oldPrice - newPrice) / oldPrice) * 100);

  return (
    <section className="max-w-7xl mx-auto px-4 pt-5 pb-7">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Cheapest Deals
        </h2>

        <button
          onClick={() => navigate("/cheapest")}
          className="text-sm font-semibold text-white bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-xl transition shadow-md"
        >
          View More →
        </button>
      </div>

      {/* Cards */}
      <div 
      className="flex gap-5 overflow-x-auto scrollbar-hide pb-3">
        {cheapestDummy.map((item) => (
          <div
          
            key={item._id}
            className="min-w-[260px] sm:min-w-[300px] bg-white rounded-3xl 
            shadow-[0_4px_12px_rgba(0,0,0,0.08)] 
            hover:shadow-[0_6px_20px_rgba(0,150,0,0.18)]
            transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-green-50"
          >

            {/* Image */}
            <div className="relative"
            onClick={()=>navigate(`/product/${item._id}`)}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-3xl"
              />

              {/* Discount Badge */}
              <span className="absolute top-3 left-3 bg-green-600 text-white text-[11px] px-2.5 py-1 rounded-full font-semibold shadow">
                {getDiscount(item.oldPrice, item.newPrice)}% OFF
              </span>

              {/* Category Badge */}
              <span className="absolute bottom-3 right-3 bg-white/90 text-green-700 text-[11px] px-2 py-0.5 rounded-md shadow">
                {item.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 truncate">
                {item.name}
              </h3>

              {/* Prices */}
              <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-bold text-green-700">₹{item.newPrice}</p>
                <p className="text-gray-400 text-sm line-through">₹{item.oldPrice}</p>
              </div>

              {/* Rating */}
              <div className="mt-2 bg-green-100 text-green-700 text-sm px-2 py-1 rounded-md inline-block">
                ⭐ {item.rating}
              </div>

              {/* Add to Cart */}
              <button
                 onClick={() => openReturnModal(item, "add")}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white 
                text-sm font-semibold py-2 rounded-xl shadow-md transition"
              >
                Add to Cart
              </button>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
