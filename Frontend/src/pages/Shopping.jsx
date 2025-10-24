import React from "react";
import Navbar from "../component/Header";
import SliderBanner from "../component/BannerSlider";
import Categories from "../component/Categories";
import Products from "../component/ProductCard";
import Footer from "../component/Footer";
import CheapDealProduct from "../component/CheapDealProduct"

export default function Shopping() {
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