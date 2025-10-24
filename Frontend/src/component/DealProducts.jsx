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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.slice(0, limit).map((p) => (
        <div
          key={p.id}
          className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition p-3 cursor-pointer group"
        >
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <div className="mt-3">
            <p className="font-medium text-gray-900">{p.name}</p>
            <p className="text-orange-600 font-semibold">{p.price}</p>
            <p className="text-xs text-gray-500">{p.category}</p>
          </div>
          <button className="mt-2 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition">
            <ShoppingCart size={18} /> Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default DealProducts;
