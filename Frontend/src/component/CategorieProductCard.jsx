// src/components/CategorieProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CategorieProductCard({ item }) {
  const { addToCart } = useCart();

  const discount =
    item.oldPrice && item.price
      ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
      : null;

  return (
    <div className="group relative border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
          {discount}% OFF
        </div>
      )}

      {/* Clickable section */}
      <Link to={`/product/${item.id}`}>
        <div className="h-52 bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={item.img}
            alt={item.title}
            className="h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-3">
          <h2 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-1">
            {item.title}
          </h2>

          <div className="flex items-center justify-between mt-1">
            <p className="text-lg font-bold text-orange-600">
              ₹{item.price?.toLocaleString()}
            </p>
            {item.oldPrice && (
              <p className="text-xs line-through text-gray-400">
                ₹{item.oldPrice?.toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
            <span>⭐ {item.rating || 4.3}</span>
            <span className="text-gray-500">
              ({item.reviews || Math.floor(Math.random() * 300 + 50)})
            </span>
          </div>
        </div>
      </Link>

      {/* Add to cart button */}
      <button
        onClick={() => addToCart(item)}
        className="m-3 w-[calc(100%-1.5rem)] py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-orange-500 hover:text-white transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
