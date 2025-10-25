import DealProducts from "../component/DealProducts";
import RestaurantPreview from "../component/RestaurantPreview";
import HeroSection from "../component/HeroSection";
import SliderBanner from "../component/BannerSlider";
import CategoryQuickLinks from "../component/CategoryQuickLinks";
import Footer from "../component/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1️⃣ 2 Banner Hero Section */}
      <HeroSection />

      {/* 2️⃣ Trending Shopping */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">🔥 Trending in Shopping</h2>
        <DealProducts limit={4} />
      </section>

      {/* 3️⃣ Popular Restaurants */}
      <section className="bg-orange-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">🍕 Popular Restaurants</h2>
          <RestaurantPreview />
        </div>
      </section>

      {/* 🔚 Footer */}
      <Footer />
    </div>
  );
}
