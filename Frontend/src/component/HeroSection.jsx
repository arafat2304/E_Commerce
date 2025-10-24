import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Shop Everything You Love",
      desc: "Mobiles, Fashion, Electronics & more",
      img: "src/assets/shopping.png",
      btn: "Shop Now",
      link: "/shopping",
    },
    {
      title: "Order Delicious Food",
      desc: "Restaurants, fast delivery & great offers",
      img: "src/assets/food.png",
      btn: "Order Now",
      link: "/food",
    },
    {
      title: "Groceries in Minutes",
      desc: "Fruits, Vegetables, Snacks — quick delivery",
      img:"src/assets/grosery.png",
      btn: "Buy Groceries",
      link: "/grocery",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4 py-6 px-4 max-w-7xl mx-auto">
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
  );
}
