// src/components/HeroSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Shop Fashion Trends",
      desc: "Latest clothing, footwear & accessories",
      img: "src/assets/shopping.png",
      btn: "Explore Fashion",
      link: "/shopping",
    },
    {
      title: "Order Delicious Food",
      desc: "Restaurants, fast delivery & great offers",
      img: "/src/assets/food.png",
      btn: "Order Now",
      link: "/food",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Mobile scroll (1 row horizontally) */}
      <div className="flex md:hidden gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
        {cards.map((item, i) => (
          <div
            key={i}
            className="min-w-[85%] relative rounded-2xl overflow-hidden shadow-lg snap-center cursor-pointer"
            onClick={() => navigate(item.link)}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0  flex flex-col justify-end p-5 text-white">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-sm opacity-90">{item.desc}</p>
              <button className="mt-3 bg-orange-500 px-4 py-2 rounded-lg font-medium hover:bg-orange-600">
                {item.btn}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop / Laptop grid view */}
      <div className="hidden md:grid grid-cols-2 gap-4">
        {cards.map((item, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
            onClick={() => navigate(item.link)}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-end p-5 text-white">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="text-sm opacity-90">{item.desc}</p>
              <button className="mt-3 bg-orange-500 px-4 py-2 rounded-lg font-medium hover:bg-orange-600">
                {item.btn}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
