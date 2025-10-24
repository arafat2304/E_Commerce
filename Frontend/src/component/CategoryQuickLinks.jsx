// src/components/CategoryQuickLinks.jsx
import React from "react";

export default function CategoryQuickLinks() {
  const categories = [
    {
      title: "Shop Everything",
      icon: "🛍️",
      link: "/shopping",
      bg: "bg-gradient-to-r from-orange-100 to-pink-100",
    },
    {
      title: "Order Delicious Food",
      icon: "🍔",
      link: "/food",
      bg: "bg-gradient-to-r from-yellow-100 to-orange-100",
    },
    {
      title: "Quick Grocery Delivery",
      icon: "🥦",
      link: "/grocery",
      bg: "bg-gradient-to-r from-green-100 to-lime-100",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {categories.map((cat) => (
        <a
          key={cat.title}
          href={cat.link}
          className={`rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl transition ${cat.bg}`}
        >
          <div className="text-4xl mb-2">{cat.icon}</div>
          <h3 className="text-lg font-semibold">{cat.title}</h3>
        </a>
      ))}
    </div>
  );
}
