// import React from 'react';
// import { Header } from '../component/Header';
// import { BannerSlider } from '../component/BannerSlider';
// import Categories from "../component/Categories";



// export default function Home() {
// return (
// <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-green-300 p-4">
// <Header />
// <BannerSlider />
// <Categories />
// </div>
// );
// }

import React from "react";
import Navbar from "../component/Header";
import SliderBanner from "../component/BannerSlider";
import Categories from "../component/Categories";
import Products from "../component/ProductCard";
import Footer from "../component/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-4">
        <SliderBanner />
        <Categories />
        <Products />
        <Footer />
      </main>
    </div>
  );
}
