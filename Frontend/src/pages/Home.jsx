import React from "react";
import HeroSection from "../component/HeroSection";
import RestaurantPreview from "../component/RestaurantPreview";
import Footer from "../component/Footer";
import TrendingDeal from "../component/TrendingDeal";
import CheapestDeal from "../component/CheapestDeal";
import BestDeal from "../component/BestDeal";
import { useNavigate } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div >
      <HeroSection />
      <TrendingDeal />
      <CheapestDeal />
      <RestaurantPreview />

      {/* 🍽️ Mobile Friendly Explore Restaurants Button */}
      <div className="w-full px-4 sm:px-6 mt-8 mb-5">
        <button
          onClick={() => navigate("/food/restaurants")}
          className="w-full flex items-center justify-center gap-2 sm:gap-3 
                     bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700
                     text-white font-semibold rounded-xl 
                     py-3 sm:py-3.5 text-sm sm:text-base 
                     shadow-md hover:shadow-lg transition-all duration-300
                     active:scale-95"
        >
          <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5" />
          Explore Restaurants
        </button>
      </div>

      <Footer />
    </div>
  );
}
