import React from "react";
import Navbar from "../component/Header";
import SliderBanner from "../component/BannerSlider";
import Categories from "../component/Categories";
import LimitedDealPreview from "../component/LimitedDealPreview";
import Footer from "../component/Footer";
// import CheapDealProduct from "../component/CheapDealProduct";
import CheapestDeal from "../component/CheapestDeal";
import BestDeal from "../component/BestDeal";

export default function Shopping() {
  return (
    <div className="min-h-screen bg-gray-50">
      
        <SliderBanner />
        <Categories />
        <CheapestDeal/>
        <BestDeal/>
        <LimitedDealPreview />
        <Footer />
      
    </div>
  );
}