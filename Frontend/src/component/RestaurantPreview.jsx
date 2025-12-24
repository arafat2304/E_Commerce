import React from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const RestaurantPreview = () => {
  const navigate = useNavigate();

  const dishes = [
    { id: 1, name: "Margherita Pizza", img: "/images/pizza.jpg", rating: 4.5, price: "₹199" },
    { id: 2, name: "Butter Chicken", img: "/images/butter-chicken.jpg", rating: 4.3, price: "₹249" },
    { id: 3, name: "Veg Biryani", img: "/images/biryani.jpg", rating: 4.2, price: "₹179" },
    { id: 4, name: "Paneer Burger", img: "/images/burger.jpg", rating: 4.4, price: "₹149" },
  ];

  return (
    <div className="bg-orange-50 p-4">
      {/* Header + Explore Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">🍴 Popular Dishes</h2>
        <button
          onClick={() => navigate("/food/restaurants")}
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition"
        >
          Explore Restaurants
        </button>
      </div>

      {/* Grid of Dishes */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer"
          >
            {/* Image + Rating */}
            <div className="relative">
              <img
                src={dish.img}
                alt={dish.name}
                className="w-full h-40 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-0.5 rounded-md text-xs font-medium flex items-center gap-1">
                <Star size={12} /> {dish.rating}
              </div>
            </div>

            {/* Dish Info */}
            <div className="p-3">
              <h3 className="font-semibold text-gray-800 truncate">{dish.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{dish.price}</p>

              <button className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-1.5 rounded-lg transition">
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantPreview;
