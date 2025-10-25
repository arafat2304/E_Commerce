import React from "react";
import { ShoppingCart } from "lucide-react";

const DealProducts = ({ limit = 6 }) => {
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: "₹1,29,999",
      img: "/images/products/iphone15pro.png",
      category: "Mobiles",
    },
    {
      id: 2,
      name: "Sony WH-1000XM5 Headphones",
      price: "₹29,990",
      img: "/images/products/sonyheadphones.png",
      category: "Audio",
    },
    {
      id: 3,
      name: "Nike Air Max Shoes",
      price: "₹8,499",
      img: "/images/products/nikeairmax.png",
      category: "Fashion",
    },
    {
      id: 4,
      name: "Apple Watch SE",
      price: "₹27,999",
      img: "/images/products/applewatch.png",
      category: "Wearables",
    },
    {
      id: 5,
      name: "Samsung 55” Smart TV",
      price: "₹54,990",
      img: "/images/products/samsungtv.png",
      category: "Electronics",
    },
    {
      id: 6,
      name: "HP Laptop 15s",
      price: "₹45,499",
      img: "/images/products/hplaptop.png",
      category: "Computers",
    },
    {
      id: 7,
      name: "Echo Dot (5th Gen)",
      price: "₹4,999",
      img: "/images/products/echodot.png",
      category: "Smart Home",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.slice(0, limit).map((p) => (
        <div
          key={p.id}
          className="flex flex-col justify-between bg-white rounded-2xl border border-gray-200 hover:border-orange-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 cursor-pointer"
        >
          {/* Product Image */}
          <div className="w-full h-44 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={p.img}
              alt={p.name}
              className="max-h-36 object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="mt-4 flex flex-col flex-grow justify-between">
            <div>
              <p className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                {p.name}
              </p>
              <p className="text-orange-600 font-bold text-lg">{p.price}</p>
              <p className="text-xs text-gray-500">{p.category}</p>
            </div>

            <button className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DealProducts;
