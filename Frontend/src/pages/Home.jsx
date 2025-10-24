// // import React from 'react';
// // import { Header } from '../component/Header';
// import { BannerSlider } from '../component/BannerSlider';
// // import Categories from "../component/Categories";



// // export default function Home() {
// // return (
// // <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-green-300 p-4">
// // <Header />
// // <BannerSlider />
// // <Categories />
// // </div>
// // );
// // }

// import React from "react";
// import Navbar from "../component/Header";
// import SliderBanner from "../component/BannerSlider";
// import Categories from "../component/Categories";
// import Products from "../component/ProductCard";
// import Footer from "../component/Footer";
// import CheapDealProduct from "../component/CheapDealProduct"

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50">
      
//         <SliderBanner />
//         <Categories />
//         <CheapDealProduct/>
//         <Products />
//         <Footer />
      
//     </div>
//   );
// }

import DealProducts from "../component/DealProducts";
import RestaurantPreview from "../component/RestaurantPreview";
import GroceryQuickItems from "../component/GroceryQuickItems";
import HeroSection from "../component/HeroSection";
import SliderBanner from "../component/BannerSlider";
import CategoryQuickLinks from "../component/CategoryQuickLinks";

export default function Home() {
  return (
    <div>
      <HeroSection />

      {/* Ecommerce Preview */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">🔥 Trending in Shopping</h2>
        <DealProducts limit={4} />
      </section>

      {/* Food Section */}
      <section className="bg-orange-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">🍕 Popular Restaurants</h2>
          <RestaurantPreview />
        </div>
      </section>

      {/* Grocery Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">🥦 Fresh Groceries</h2>
        <GroceryQuickItems />
      </section>
    </div>
  );
}
