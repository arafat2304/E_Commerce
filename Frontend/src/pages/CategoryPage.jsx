import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CategorieProductCard from "../component/CategorieProductCard";
import { SlidersHorizontal, X } from "lucide-react";

export default function CategoryProductsPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/shopproduct/category/${categoryName}`
        );
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  const filteredProducts = products.filter((p) => {
    const price = p.newPrice || 0;
    const rating = p.rating || 0;
    return (
      price >= priceRange[0] &&
      price <= priceRange[1] &&
      (!selectedRating || rating >= selectedRating)
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.newPrice || 0;
    const priceB = b.newPrice || 0;
    const ratingA = a.rating || 0;
    const ratingB = b.rating || 0;

    if (sortType === "low-high") return priceA - priceB;
    if (sortType === "high-low") return priceB - priceA;
    if (sortType === "rating") return ratingB - ratingA;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 relative">
      {/* 🔹 Category Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <h1 className="text-3xl font-bold capitalize bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
          {categoryName}
        </h1>

        {/* 🔸 Sort & Filter Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm sm:hidden bg-white/80 backdrop-blur hover:bg-orange-50 transition"
            onClick={() => setShowFilters(true)}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 text-sm bg-white/80 backdrop-blur focus:ring-2 focus:ring-orange-400"
          >
            <option value="featured">Featured</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 🔹 Filter Sidebar */}
        <aside className="hidden lg:block lg:w-1/4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-md p-5 h-fit sticky top-24 border border-orange-100">
          <FilterSidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />
        </aside>

        {/* 🔹 Product Section */}
        {loading ? (
          <p className="text-center w-full py-10 text-gray-500 animate-pulse">
            Loading products...
          </p>
        ) : (
          <section className="flex-1">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {sortedProducts.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="animate-fadeInUp"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: "both",
                    }}
                  >
                    <CategorieProductCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                No products found in this category.
              </div>
            )}
          </section>
        )}
      </div>

      {/* 🔸 Mobile Filter Drawer */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-80 bg-white p-5 rounded-l-2xl shadow-xl animate-slideInRight">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------- 🎛️ Filter Sidebar ------------------------ */
function FilterSidebar({
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
}) {
  return (
    <>
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">💰 Price Range</h4>
        <input
          type="range"
          min="0"
          max="20000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-orange-500"
        />
        <p className="text-sm text-gray-600 mt-1">Up to ₹{priceRange[1]}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">⭐ Customer Rating</h4>
        {[4, 3, 2].map((r) => (
          <label
            key={r}
            htmlFor={`rating-${r}`}
            className="flex items-center gap-2 cursor-pointer mb-2"
          >
            <input
              type="radio"
              id={`rating-${r}`}
              checked={selectedRating === r}
              onChange={() => setSelectedRating(r)}
              className="accent-orange-500"
            />
            <span className="text-sm text-gray-600">{r}★ & above</span>
          </label>
        ))}
        {selectedRating && (
          <button
            onClick={() => setSelectedRating(null)}
            className="text-xs text-orange-500 mt-2"
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg">
        <p className="text-xs text-orange-600 font-medium">
          Tip 💡: Use filters smartly to find best deals under your budget!
        </p>
      </div>
    </>
  );
}

/* 🔥 Animations (add in global.css or Tailwind config) */
// Add this CSS somewhere global:
// .animate-fadeInUp { animation: fadeInUp 0.5s ease forwards; }
// @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
// .animate-slideInRight { animation: slideInRight 0.4s ease forwards; }
// @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
