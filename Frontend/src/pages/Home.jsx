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
import CheapDealProduct from "../component/CheapDealProduct"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      
        <SliderBanner />
        <Categories />
        <CheapDealProduct/>
        <Products />
        <Footer />
      
    </div>
  );
}
