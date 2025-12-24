import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin, LocateFixed } from "lucide-react";
import { motion } from "framer-motion";

export default function FoodLandingPage() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [loading, setLoading] = useState(false);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setCoords({ lat: latitude, lon: longitude });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const address = data.display_name || "Location detected";

          setLocation(address);
          localStorage.setItem(
            "userLocation",
            JSON.stringify({ address, latitude, longitude })
          );
          console.log("Detected:", { latitude, longitude, accuracy, address });
        } catch (err) {
          console.error("Error fetching address:", err);
          alert("Error fetching location details.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Unable to detect location. Please allow permission.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const topPicks = [
    { name: "Cheesy Pizza Combo", img: "https://images.unsplash.com/photo-1601924582971-d3ce20f0f9b4?auto=format&fit=crop&w=800&q=80", price: "₹299" },
    { name: "Burger Blast Meal", img: "https://images.unsplash.com/photo-1594007654729-407eedc4be63?auto=format&fit=crop&w=800&q=80", price: "₹249" },
    { name: "Sweet Tooth Pack", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80", price: "₹199" },
    { name: "Royal Biryani Bowl", img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80", price: "₹349" },
  ];

  const categories = [
    { name: "Pizza", img: "https://source.unsplash.com/600x600/?pizza" },
    { name: "Burgers", img: "https://source.unsplash.com/600x600/?burger" },
    { name: "Desserts", img: "https://source.unsplash.com/600x600/?dessert" },
    { name: "Biryani", img: "https://source.unsplash.com/600x600/?biryani" },
    { name: "Rolls", img: "https://source.unsplash.com/600x600/?kathi-roll" },
    { name: "Beverages", img: "https://source.unsplash.com/600x600/?coffee,juice" },
    { name: "Chinese", img: "https://source.unsplash.com/600x600/?chinese-food" },
    { name: "Ice Cream", img: "https://source.unsplash.com/600x600/?icecream" },
  ];

  return (
    <div className="min-h-screen font-[Poppins] bg-white text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative h-screen flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <motion.div
          className="relative z-10 text-white px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Satisfy Your Cravings <br /> With Every Bite 🍱
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">
            Discover top restaurants near you — fresh, fast, and full of flavor.
          </p>

          <button
            onClick={() => navigate("/food/restaurants")}
            className="bg-[#FF6A00] hover:bg-[#e85a00] text-white px-10 py-4 rounded-full font-semibold text-lg flex items-center gap-2 mx-auto shadow-lg transition-transform hover:scale-105 mb-8"
          >
            Explore Restaurants <ArrowRight size={22} />
          </button>

          {/* Location Input */}
          <motion.div
            className="relative max-w-md mx-auto bg-white/20 backdrop-blur-md rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between border border-white/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="flex items-center gap-2 w-full">
              <MapPin size={20} className="text-white shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location..."
                className="flex-1 bg-transparent text-white placeholder-gray-300 outline-none text-sm sm:text-base"
              />
            </div>
            <button
              onClick={handleUseMyLocation}
              disabled={loading}
              className={`flex items-center gap-1 bg-[#FF6A00] text-white px-4 py-2 rounded-full text-sm font-medium transition ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#e85a00]"
              }`}
            >
              <LocateFixed size={18} />{" "}
              {loading ? "Detecting..." : "Use My Location"}
            </button>
          </motion.div>

          {coords.lat && (
            <p className="text-sm text-gray-300 mt-3">
              📍 Latitude: {coords.lat.toFixed(6)} | Longitude:{" "}
              {coords.lon.toFixed(6)}
            </p>
          )}
        </motion.div>
      </section>

      {/* Top Picks */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            🍽️ Today’s Top Picks
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {topPicks.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2 cursor-pointer"
                whileHover={{ scale: 1.04 }}
                onClick={() =>
                  navigate(
                    `/food/item/${item.name.toLowerCase().replace(/ /g, "-")}`
                  )
                }
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-[#FF6A00] font-medium mt-1">
                    {item.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            🍔 Explore Popular Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                className="group relative cursor-pointer overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                onClick={() =>
                  navigate(`/food/category/${cat.name.toLowerCase()}`)
                }
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4">
                  <h3 className="text-white text-lg font-semibold">
                    {cat.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="text-center py-24 bg-gradient-to-r from-[#FF6A00] to-[#ff8c3d] text-white rounded-t-[50px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Hungry? Let's Fix That 🍽️
          </h2>
          <p className="mb-8 text-lg">
            Order your favorite meals now and taste happiness in every bite.
          </p>
          <button
            onClick={() => navigate("/food/restaurants")}
            className="bg-white text-[#FF6A00] px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition"
          >
            Start Ordering
          </button>
        </motion.div>
      </section>
    </div>
  );
}
