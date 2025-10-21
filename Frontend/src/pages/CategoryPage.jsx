import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CategorieProductCard from "../component/CategorieProductCard";
import { productsData } from "../Data.js";
import { SlidersHorizontal } from "lucide-react"; // filter icon

export default function CategoryProductsPage() {
  const { categoryName } = useParams();
  const [sortType, setSortType] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSortType("featured");
  }, [categoryName]);

  // 🔍 Filter by category
  const categoryProducts = productsData.filter(
    (p) => p.category?.toLowerCase() === categoryName?.toLowerCase()
  );

  // 🔎 Filter by price and rating
  const filteredProducts = categoryProducts.filter((p) => {
    const price = Number(String(p.price).replace(/[^0-9.-]+/g, ""));
    const rating = Number(p.rating || 0);
    return (
      price >= priceRange[0] &&
      price <= priceRange[1] &&
      (!selectedRating || rating >= selectedRating)
    );
  });

  // 🔄 Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = Number(String(a.price).replace(/[^0-9.-]+/g, ""));
    const priceB = Number(String(b.price).replace(/[^0-9.-]+/g, ""));
    const ratingA = Number(a.rating || 0);
    const ratingB = Number(b.rating || 0);

    if (sortType === "low-high") return priceA - priceB;
    if (sortType === "high-low") return priceB - priceA;
    if (sortType === "rating") return ratingB - ratingA;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
    

      {/* 🏷️ Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <h1 className="text-2xl font-semibold capitalize w-full sm:w-auto">
          {categoryName}
        </h1>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Filter Button (mobile only) */}
          <button
            className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 text-sm sm:hidden hover:bg-gray-100"
            onClick={() => setShowFilters(true)}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto focus:ring-2 focus:ring-orange-400"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* 🔲 Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:w-1/4 bg-white rounded-xl shadow-md p-5 h-fit sticky top-24">
          <FilterSidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />
        </aside>

        {/* Mobile Filter Drawer (Animated) */}
        <>
          {/* Backdrop */}
          {showFilters && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Drawer Panel */}
          <div
            className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 
                        w-full sm:w-[380px] overflow-y-auto transition-transform duration-300
                        ${showFilters ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  className="text-gray-500 hover:text-orange-500 text-xl"
                  onClick={() => setShowFilters(false)}
                >
                  ✕
                </button>
              </div>

              <FilterSidebar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
              />

              <button
                onClick={() => setShowFilters(false)}
                className="mt-6 w-full bg-orange-500 text-white py-2 rounded-md font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>

        {/* Product Grid */}
        <section className="flex-1">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {sortedProducts.map((item) => (
                <CategorieProductCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              No products found in this category.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* ----------------------- 🧰 Filter Sidebar ------------------------ */
function FilterSidebar({ priceRange, setPriceRange, selectedRating, setSelectedRating }) {
  return (
    <>
      {/* 💰 Price Range */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <input
          type="range"
          min="0"
          max="20000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-orange-500"
        />
        <p className="text-sm text-gray-500 mt-1">Up to ₹{priceRange[1]}</p>
      </div>

      {/* ⭐ Rating Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Customer Rating
        </label>
        {[4, 3, 2].map((r) => (
          <div key={r} className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              id={`rating-${r}`}
              checked={selectedRating === r}
              onChange={() => setSelectedRating(r)}
              className="accent-orange-500"
            />
            <label htmlFor={`rating-${r}`} className="text-sm text-gray-600">
              {r}★ & above
            </label>
          </div>
        ))}
        <button
          onClick={() => setSelectedRating(null)}
          className="text-xs text-orange-500 mt-2"
        >
          Clear rating
        </button>
      </div>
    </>
  );
}
