import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    title: "Wireless Headphones XYZ",
    img: "https://cdn11.bigcommerce.com/s-pkla4xn3/images/stencil/2560w/products/26009/239562/black-designer-formal-oxford-shoes-for-men-wedding-shoes-leather-italy-pointed-toe-mens-dress-shoes__96259.1549627129.jpg?c=2",
    price: 2499,
    oldPrice: 3999,
    rating: 4.5,
    sold: "1.2k",
    badge: "Deal of the day",
  },
  {
    id: 2,
    title: "Smartphone ABC 8GB RAM",
    img: "https://c.pxhere.com/photos/4f/f5/phone_iphone_telephone_hand_bokeh-128366.jpg!d",
    price: 12999,
    oldPrice: 15999,
    rating: 4.6,
    sold: "3k",
    badge: "Limited offer",
  },
  {
    id: 3,
    title: "Men's Running Shoes",
    img: "https://assets.vogue.com/photos/5891e0ebb482c0ea0e4db2a8/4:3/w_2560%2Cc_limit/02-lestrange.jpg",
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
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push(<FaStar key={i} className="text-xs" />);
    else stars.push(<FaRegStar key={i} className="text-xs" />);
  }
  return <div className="flex items-center gap-0.5 text-yellow-500">{stars}</div>;
}

export default function Products() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Handle product click → navigate to details page
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 mt-8">
      {/* Deals horizontal scroll */}
      <h3 className="text-lg font-semibold mb-3">Top deals</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => handleProductClick(p.id)}
            className="min-w-[220px] bg-white rounded-lg border border-gray-100 shadow-sm p-3 hover:shadow-lg transform hover:-translate-y-2 transition cursor-pointer"
          >
            <div className="relative">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-36 object-contain"
              />
              <div className="absolute left-2 top-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">
                {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% off
              </div>
            </div>

            <div className="mt-3">
              <div className="text-sm font-medium text-gray-800 line-clamp-2">
                {p.title}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <div className="text-lg font-extrabold text-orange-600">
                    ₹{p.price.toLocaleString()}
                  </div>
                  <div className="text-sm line-through text-gray-400">
                    ₹{p.oldPrice.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <Stars rating={p.rating} />
                  <div className="text-xs text-gray-500 mt-1">{p.sold} sold</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                  }}
                  className="flex-1 px-3 py-2 rounded bg-orange-600 text-white font-medium hover:bg-orange-700 transition"
                >
                  Buy
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-2 rounded border border-gray-200 hover:shadow-sm transition"
                >
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
        Recommended for you
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.concat(products).slice(0, 8).map((p) => (
          <div
            key={p.id + "-" + Math.random()}
            onClick={() => handleProductClick(p.id)}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            {/* Image Section */}
            <div className="relative flex items-center justify-center h-64 sm:h-72 bg-gray-50 rounded-t-xl overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                className="object-contain w-full h-full p-3 transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute left-3 top-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
                {Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% OFF
              </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-3">
              <h4 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 leading-tight">
                {p.title}
              </h4>

              <div className="flex items-center justify-between mt-1.5">
                <div>
                  <div className="text-lg font-bold text-orange-600">
                    ₹{p.price.toLocaleString()}
                  </div>
                  <div className="text-xs line-through text-gray-400">
                    ₹{p.oldPrice.toLocaleString()}
                  </div>
                </div>
                <Stars rating={p.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
