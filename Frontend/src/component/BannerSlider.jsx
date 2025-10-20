import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop",
    title: "Mega Fashion Sale",
    subtitle: "Up to 60% off — New season arrivals",
    cta: "Shop Fashion",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    title: "Electronics Deals",
    subtitle: "Hot prices on latest gadgets",
    cta: "Shop Electronics",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1600&auto=format&fit=crop",
    title: "Home & Kitchen Offers",
    subtitle: "Make home life easier — great discounts",
    cta: "Shop Home",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop",
    title: "Mobile Fest",
    subtitle: "Top phones at unbeatable prices",
    cta: "Shop Mobiles",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1526178617398-0c4e7a1c3f7f?q=80&w=1600&auto=format&fit=crop",
    title: "Daily Essentials",
    subtitle: "Savings for everyday needs",
    cta: "Shop Essentials",
  },
];

export default function HeroSlider() {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 md:px-8 mt-4">
      <div className="relative rounded-xl overflow-hidden shadow-lg">

        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            bulletClass:
              "swiper-pagination-bullet !w-2.5 !h-2.5 !rounded-full !bg-white/60 hover:!bg-white",
            bulletActiveClass:
              "swiper-pagination-bullet-active !bg-[#FF6A00]",
          }}
          speed={800}
          autoHeight={false}
          className="h-60"
        >
          {slides.map((s) => (
            <SwiperSlide key={s.id}>
              <div className="relative w-full h-60">

                {/* Image */}
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Overlay content */}
                <div className="absolute left-6 top-6 md:left-10 md:top-8 text-white max-w-sm">
                  <h3 className="text-lg md:text-2xl font-extrabold drop-shadow-md">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm drop-shadow-sm">
                    {s.subtitle}
                  </p>
                  <button className="mt-2 inline-flex items-center px-3 py-1.5 rounded-full bg-[#FF6A00] hover:bg-[#e85a00] text-white text-xs md:text-sm font-medium shadow-md transition">
                    {s.cta}
                  </button>
                </div>

                {/* Gradient bottom overlay */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%)",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
