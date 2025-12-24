import React, { useState, useEffect } from "react";
import { Search, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const mockRestaurants = [
  {
    id: "dummy-1",
    name: "The Spice Route",
    cuisineType: "Indian, Chinese",
    rating: 4.5,
    deliveryTime: "25 mins",
    price: "₹300 for one",
    image:
      "https://images.unsplash.com/photo-1601050690597-76b39e6fc187?w=800&q=80",
  },
  {
    id: "dummy-2",
    name: "Urban Bite Café",
    cuisineType: "Continental, Fast Food",
    rating: 4.3,
    deliveryTime: "30 mins",
    price: "₹250 for one",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
  },
  {
    id: "dummy-3",
    name: "FreshBowl Salad Co.",
    cuisineType: "Healthy, Vegan",
    rating: 4.7,
    deliveryTime: "20 mins",
    price: "₹200 for one",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  },
  {
    id: "dummy-4",
    name: "Pizza Junction",
    cuisineType: "Italian, Pizzas",
    rating: 4.2,
    deliveryTime: "35 mins",
    price: "₹350 for one",
    image:
      "https://images.unsplash.com/photo-1601924582971-c9e37dfb6c94?w=800&q=80",
  },
];

const categories = [
  "All",
  "Fast Food",
  "Desserts",
  "Indian",
  "Healthy",
  "Chinese",
  "South Indian",
];

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch from backend on mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/restaurant");
        console.log(res.data.data)
        if (Array.isArray(res.data.data)) {
          // Combine backend + mock data
          const merged = [...res.data.data, ...mockRestaurants];
          setRestaurants(merged);
        } else {
          toast.error("Invalid response from backend");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch restaurants from backend");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // ✅ Filtering logic (applies to both backend + dummy data)
  const filteredRestaurants = restaurants.filter((r) => {
    const nameMatch = r.name?.toLowerCase().includes(search.toLowerCase());
    const categoryMatch =
      activeCategory === "All" ||
      r.cuisineType?.toLowerCase().includes(activeCategory.toLowerCase());
    return nameMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 p-4 md:p-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Explore Restaurants 🍽️
        </h1>

        {/* Search Bar */}
        <div className="flex items-center bg-white/80 backdrop-blur-md border border-gray-200 rounded-full px-4 py-2 w-full md:w-96 shadow-sm">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for restaurants or dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3 py-1 bg-transparent outline-none text-gray-700 text-sm"
          />
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="hidden md:block bg-white rounded-3xl shadow-md p-6 h-fit sticky top-6">
          <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-left rounded-lg text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:bg-orange-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Restaurants */}
        <main className="md:col-span-3">
          {loading ? (
            <p className="text-center text-gray-600 py-10">Loading restaurants...</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((r) => (
                  <div
                    key={r._id || r.id}
                    onClick={() =>
                      navigate(
                        r._id
                          ? `/food/restaurant/${r._id}`
                          : `/food/restaurant/${r.id}`
                      )
                    }
                    className="group bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={r.image}
                        alt={r.name}
                        className="h-48 w-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md">
                        {r.deliveryTime || "30 mins"}
                      </span>
                    </div>
                    <div className="p-4">
                      <h2 className="font-semibold text-gray-800 text-lg mb-1">
                        {r.name}
                      </h2>
                      <p className="text-sm text-gray-500 mb-3">
                        {r.cuisineType || "Various Cuisines"}
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center text-yellow-500 font-medium">
                          <Star size={16} className="mr-1" /> {r.rating || 4.5}
                        </span>
                        <span className="text-gray-500">{r.price || "₹300 for one"}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center col-span-full">
                  No restaurants found.
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
