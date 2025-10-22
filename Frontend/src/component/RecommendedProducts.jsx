import React from "react";
import { Link } from "react-router-dom";
import { productsData } from "../Data.js";

export default function RecommendedProducts({ category, currentId }) {
  const filtered = productsData
    .filter((p) => p.category === category && p.id !== currentId)
    .slice(0, 4);

  if (filtered.length === 0) return null;

  return (
    <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold mb-4">You may also like</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((rec) => (
          <Link
            key={rec.id}
            to={`/product/${rec.id}`}
            className="bg-white rounded-lg border border-gray-100 p-3 hover:shadow-md cursor-pointer transition block"
          >
            <img
              src={rec.img}
              alt={rec.title}
              className="w-full h-44 object-contain rounded"
            />
            <div className="mt-2 text-sm font-medium text-gray-800 line-clamp-2">
              {rec.title}
            </div>
            <div className="text-orange-600 font-semibold mt-1">
              {rec.price}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
