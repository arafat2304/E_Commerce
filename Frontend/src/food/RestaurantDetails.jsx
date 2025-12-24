import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function RestaurantMenu() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // 🧩 assuming route: /restaurant/:restaurantId/menu

  // ✅ Fetch menu from backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/food/${id}`
        );
        console.log(res)
        setMenu(res.data.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load menu");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [id]);

  // ✅ Add to Cart API
  const addToCart = async (item) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          itemId: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          type: "food",
          quantity: 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`${item.name} added to cart`);
      setCartCount((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  // ✅ Filter by search term
  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Group by category
  const groupedMenu = filteredMenu.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white font-[Poppins]">
      {/* Header / Banner */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
          alt="Restaurant Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-end px-6 py-6 text-white">
          <h1 className="text-3xl font-bold">Restaurant Menu</h1>
          <p className="text-sm mt-1 text-gray-200">
            Freshly cooked • Authentic taste
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 mt-6 mb-2 flex items-center gap-3">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-100 px-4 py-2 rounded-full outline-none text-gray-700"
        />
      </div>

      {/* Menu Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading menu...</p>
        ) : Object.keys(groupedMenu).length === 0 ? (
          <p className="text-center text-gray-500">No dishes found</p>
        ) : (
          Object.entries(groupedMenu).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-bold text-[#FF6A00] mb-3 border-b pb-1">
                {category}
              </h2>

              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => setSelectedItem(item)}
                    className="flex justify-between items-center bg-white shadow-sm border border-gray-100 hover:bg-orange-50 cursor-pointer px-4 py-3 rounded-xl transition"
                  >
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-600 text-sm">
                      {item.quantityType || ""}
                    </p>
                    <p className="text-[#FF6A00] font-semibold">
                      ₹{item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Cart */}
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate("/food/cart")}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#FF6A00] text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <ShoppingCart size={18} />
          <span className="font-medium">{cartCount} items in cart</span>
        </motion.div>
      )}

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-xl"
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {selectedItem.name}
                  </h3>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {selectedItem.description}
                </p>
                <p className="text-gray-500 text-sm mb-1">
                  {selectedItem.quantityType}
                </p>
                <p className="text-[#FF6A00] font-semibold text-lg mb-5">
                  ₹{selectedItem.price}
                </p>
                <button
                  onClick={() => {
                    addToCart(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="w-full bg-[#FF6A00] text-white py-2.5 rounded-full font-medium hover:bg-orange-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
