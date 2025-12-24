import React from "react";
import DealCard from "./DealCard";
import { useNavigate } from "react-router-dom";

const cheapestDummy = [
  {
    _id: 1,
    name: "Budget Earphones",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1580894908360-8687e4430eab",
    oldPrice: 999,
    newPrice: 499,
    rating: 4.3,
    discount: "50% OFF",
  },
  {
    _id: 2,
    name: "Basic T-Shirt",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    oldPrice: 899,
    newPrice: 499,
    rating: 4.2,
    discount: "44% OFF",
  },
  {
    _id: 3,
    name: "Coffee Mug",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
    oldPrice: 599,
    newPrice: 299,
    rating: 4.5,
    discount: "50% OFF",
  },
];

export default function CheapestDeal() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">💰 Cheapest in Shopping</h2>
        <button
          onClick={() => navigate("/cheapest")}
          className="text-orange-600 hover:text-orange-700 font-medium text-sm"
        >
          View More →
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {cheapestDummy.map((item) => (
          <DealCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
}
