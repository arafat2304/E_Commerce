import React from "react";
import DealCard from "./DealCard";
import { useNavigate } from "react-router-dom";

const trendingDummy = [
  {
    _id: 1,
    name: "Nike Air Max 270",
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1606813902881-5bbd1b0d01e4",
    oldPrice: 8999,
    newPrice: 6999,
    rating: 4.6,
    discount: "22% OFF",
  },
  {
    _id: 2,
    name: "Apple Watch Series 9",
    category: "Smartwatch",
    image: "https://images.unsplash.com/photo-1603791452906-bbb4caa1b22e",
    oldPrice: 41999,
    newPrice: 38999,
    rating: 4.8,
    discount: "7% OFF",
  },
  {
    _id: 3,
    name: "Sony WH-1000XM5",
    category: "Headphones",
    image: "https://images.unsplash.com/photo-1580894908360-8687e4430eab",
    oldPrice: 29999,
    newPrice: 25999,
    rating: 4.9,
    discount: "13% OFF",
  },
  {
    _id: 4,
    name: "HP Omen Laptop",
    category: "Gaming Laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    oldPrice: 149999,
    newPrice: 124999,
    rating: 4.8,
    discount: "17% OFF",
  },
  {
    _id: 5,
    name: "Puma Running Shoes",
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    oldPrice: 5999,
    newPrice: 3999,
    rating: 4.4,
    discount: "33% OFF",
  },
];

export default function TrendingDeal() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 pt-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Trending </h2>
        <button
          onClick={() => navigate("/trending")}
          className="text-orange-600 hover:text-orange-700 font-medium text-sm"
        >
          View More →
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {trendingDummy.map((item) => (
          <DealCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
}
