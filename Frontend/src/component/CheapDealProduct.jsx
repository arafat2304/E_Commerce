import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaStar, FaRegStar } from "react-icons/fa";
import { productsData } from "../Data";

const parsePrice = (priceStr) =>
  Number(String(priceStr).replace(/[^0-9.-]+/g, ""));

const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center gap-0.5 text-yellow-500">
      {[...Array(5)].map((_, i) =>
        i < full ? (
          <FaStar key={i} className="text-xs" />
        ) : (
          <FaRegStar key={i} className="text-xs" />
        )
      )}
    </div>
  );
};

export default function DealProducts() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // 🔥 Filter & sort by lowest price
  const deals = productsData
    .filter((p) => parsePrice(p.price) < 2500)
    .sort((a, b) => parsePrice(a.price) - parsePrice(b.price));

  const handleClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        💥 Best Deals & Budget Finds
      </h2>

      {deals.length > 0 ? (
        <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
          {deals.map((p) => {
            const price = parsePrice(p.price);
            const oldPrice = parsePrice(p.oldPrice);
            const discount = oldPrice
              ? Math.round(((oldPrice - price) / oldPrice) * 100)
              : 0;

            return (
              <div
                key={p.id}
                onClick={() => handleClick(p.id)}
                className="min-w-[220px] sm:min-w-[250px] bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg cursor-pointer transition-all snap-start"
              >
                {/* Image */}
                <div className="relative bg-gray-50 flex items-center justify-center h-48 rounded-t-xl overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="object-contain w-full h-full p-3 hover:scale-105 transition-transform duration-300"
                  />
                  {discount > 0 && (
                    <span className="absolute left-2 top-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold shadow-sm">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                    {p.title}
                  </h3>

                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <div className="text-base font-bold text-orange-600">
                        ₹{price.toLocaleString()}
                      </div>
                      {oldPrice > 0 && (
                        <div className="text-xs text-gray-400 line-through">
                          ₹{oldPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <Stars rating={p.rating} />
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                      }}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-xs py-1.5 rounded-md transition"
                    >
                      Add
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="border border-gray-200 px-2 py-1.5 rounded-md hover:shadow-sm transition text-xs"
                    >
                      ♡
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-20">
          No deals available at the moment.
        </p>
      )}
    </div>
  );
}
