import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";

/**
 * Products component: shows a deals horizontal scroll + product grid below
 * Replace product images under public/assets/products/
 */
const products = [
  {
    id: 1,
    title: "Wireless Headphones XYZ",
    img: "https://i.imgur.com/5M0p5uK.png",
    price: 2499,
    oldPrice: 3999,
    rating: 4.5,
    sold: "1.2k",
    badge: "Deal of the day",
  },
  {
    id: 2,
    title: "Smartphone ABC 8GB RAM",
    img: "https://i.imgur.com/IuVYpno.png",
    price: 12999,
    oldPrice: 15999,
    rating: 4.6,
    sold: "3k",
    badge: "Limited offer",
  },
  {
    id: 3,
    title: "Men's Running Shoes",
    img: "https://i.imgur.com/HzzrT4Z.png",
    price: 2199,
    oldPrice: 3499,
    rating: 4.3,
    sold: "800",
    badge: "Hot",
  },
  {
    id: 4,
    title: "Blender Mixer 500W",
    img: "https://i.imgur.com/2yaf2q2.png",
    price: 3499,
    oldPrice: 4999,
    rating: 4.4,
    sold: "540",
    badge: "Discount",
  },
  {
    id: 5,
    title: "Women Handbag Classic",
    img: "https://i.imgur.com/4QtQZqN.png",
    price: 1499,
    oldPrice: 2499,
    rating: 4.1,
    sold: "2k",
    badge: "Top pick",
  },
];


function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push(<FaStar key={i} className="text-xs" />);
    else stars.push(<FaRegStar key={i} className="text-xs" />);
  }
  return <div className="flex items-center gap-0.5 text-yellow-500">{stars}</div>;
}

export default function Products() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 mt-8">
      {/* Deals horizontal scroll */}
      <h3 className="text-lg font-semibold mb-3">Top deals</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="min-w-[220px] bg-white rounded-lg border border-gray-100 shadow-sm p-3 hover:shadow-lg transform hover:-translate-y-2 transition"
          >
            <div className="relative">
              <img src={p.img} alt={p.title} className="w-full h-36 object-contain" />
              <div className="absolute left-2 top-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">
                {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% off
              </div>
            </div>

            <div className="mt-3">
              <div className="text-sm font-medium text-gray-800">{p.title}</div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <div className="text-lg font-extrabold text-orange-600">₹{p.price.toLocaleString()}</div>
                  <div className="text-sm line-through text-gray-400">₹{p.oldPrice.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <Stars rating={p.rating} />
                  <div className="text-xs text-gray-500 mt-1">{p.sold} sold</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 px-3 py-2 rounded bg-orange-600 text-white font-medium hover:bg-orange-700 transition">
                  Buy
                </button>
                <button className="px-3 py-2 rounded border border-gray-200 hover:shadow-sm transition">
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <h3 className="text-lg font-semibold mt-8 mb-3">Recommended for you</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.concat(products).slice(0, 8).map((p) => (
          <div key={p.id + "-" + Math.random()} className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 hover:shadow-lg transform hover:-translate-y-2 transition">
            <div className="relative">
              <img src={p.img} alt={p.title} className="w-full h-48 object-contain" />
              <div className="absolute left-2 top-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">
                {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% off
              </div>
            </div>
            <div className="mt-3">
              <div className="text-sm font-medium text-gray-800 h-14 overflow-hidden">{p.title}</div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <div className="text-lg font-extrabold text-orange-600">₹{p.price.toLocaleString()}</div>
                  <div className="text-sm line-through text-gray-400">₹{p.oldPrice.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <Stars rating={p.rating} />
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 px-3 py-2 rounded bg-orange-600 text-white font-medium hover:bg-orange-700 transition">
                  Add to cart
                </button>
                <button className="px-3 py-2 rounded border border-gray-200 hover:shadow-sm transition">Buy</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
