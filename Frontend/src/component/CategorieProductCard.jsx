// src/components/FeaturedProducts.jsx
import React from 'react'
import ProductCard from './ProductCard'
import { useCart } from "../context/CartContext";

export default function CategorieProductCard({ item }) {
   const { addToCart } = useCart();
  return (
    <div className="group border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition">
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        <img src={item.img} alt={item.title} className="h-full object-contain p-2" />
      </div>
      <div className="p-3">
        <h2 className="text-sm font-medium line-clamp-1">{item.title}</h2>
        <p className="text-lg font-semibold text-orange-600 mt-1">{item.price}</p>
        <button className="mt-3 w-full py-2 text-sm font-medium border border-gray-300 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition"
        onClick={() => addToCart(item)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

