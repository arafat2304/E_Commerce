import React, { useState } from "react";
import { X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("shop");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    if (category === "shop") navigate(`/shop/search?q=${query}`);
    else navigate(`/food/search?q=${query}`);
    onClose();
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex flex-col">
      <div className="flex items-center justify-between bg-white p-4">
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-full ${category === "shop" ? "bg-[#FF6A00] text-white" : "bg-gray-100"}`}
            onClick={() => setCategory("shop")}
          >
            Shop
          </button>
          <button
            className={`px-3 py-1 rounded-full ${category === "food" ? "bg-[#FF6A00] text-white" : "bg-gray-100"}`}
            onClick={() => setCategory("food")}
          >
            Food
          </button>
        </div>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-white p-4 flex items-center gap-2">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder={`Search ${category === "shop" ? "products" : "restaurants"}...`}
          className="flex-1 h-10 rounded-full border px-4 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
        />
        <button onClick={handleSearch}>
          <Search className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="bg-white flex-1 overflow-y-auto p-4">
        <div className="mb-3 font-semibold">Quick Options</div>
        <div className="flex flex-wrap gap-2">
          {(category === "shop" ? ["Mobiles", "Fashion", "Electronics", "Grocery"] : ["Pizza", "Burgers", "Sushi", "Desserts"]).map((item) => (
            <button
              key={item}
              className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => { setQuery(item); handleSearch(); }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 text-gray-400 text-sm">Recent Searches</div>
        <div className="flex flex-col gap-2 mt-2">
          {["iPhone", "Pizza Hut", "Shoes"].map((item) => (
            <button
              key={item}
              className="text-left px-3 py-2 rounded hover:bg-gray-100 transition"
              onClick={() => { setQuery(item); handleSearch(); }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
