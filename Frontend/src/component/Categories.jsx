import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { name: "Fashion", image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=600&q=60" },
  { name: "Watches", image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=60" },
  { name: "Footwear", image: "https://images.unsplash.com/photo-1606813902773-bfc3c6aa8d57?auto=format&fit=crop&w=600&q=60" },
  { name: "Electronics", image: "https://images.unsplash.com/photo-1510552776732-01acc9a4c27e?auto=format&fit=crop&w=600&q=60" },
  { name: "Home Appliances", image: "https://images.unsplash.com/photo-1621996346565-9c6474f9b165?auto=format&fit=crop&w=600&q=60" },
  { name: "Beauty & Care", image: "https://images.unsplash.com/photo-1601049676869-702ea24cfd62?auto=format&fit=crop&w=600&q=60" },
  { name: "Health & Wellness", image: "https://images.unsplash.com/photo-1588776814546-7a78c8c4f3d9?auto=format&fit=crop&w=600&q=60" },
  { name: "Sports & Fitness", image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=600&q=60" },
  { name: "Books & Stationery", image: "https://images.unsplash.com/photo-1496104679561-38b3b4d8de25?auto=format&fit=crop&w=600&q=60" },
  { name: "Toys & Baby", image: "https://images.unsplash.com/photo-1583511655903-7c01ca1ef1d9?auto=format&fit=crop&w=600&q=60" },
  { name: "Jewelry", image: "https://images.unsplash.com/photo-1600181952627-0b7b1b6b0d84?auto=format&fit=crop&w=600&q=60" },
  { name: "Travel & Luggage", image: "https://images.unsplash.com/photo-1556741533-f6acd6479a16?auto=format&fit=crop&w=600&q=60" },
];

export default function Categories() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-screen-xl mx-auto px-4 pt-2 relative">

      {/* DESKTOP ARROWS ONLY */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 
          bg-white/90 shadow-md rounded-full p-2 hover:scale-110 transition"
      >
        <ChevronLeft />
      </button>

      {/* Scrollable Categories */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto hide-scrollbar gap-4 py-3 scroll-smooth"
      >
        {categories.map((c, i) => (
          <div
            key={i}
            onClick={() =>
              navigate(`/category/${c.name.toLowerCase().replace(/ & |,| /g, "-")}`)
            }
            className="
              flex-shrink-0
              w-1/4           /* 4 cards on phone */
              sm:w-1/5         /* 5 cards on small tablets */
              md:w-1/6         /* 6 cards on medium screens */
              lg:w-1/8         /* 8 cards on desktop */
              cursor-pointer
              group
            "
          >
            <div
              className="
                rounded-xl overflow-hidden 
                shadow-sm bg-white border border-gray-200
                hover:shadow-lg hover:-translate-y-1 transition-all
              "
            >
              <img
                src={c.image}
                alt={c.name}
                className="h-20 w-full object-cover group-hover:scale-105 transition duration-300"
              />
              <p className="text-center py-2 text-xs sm:text-sm font-medium text-gray-700">
                {c.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow (Desktop Only) */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 
          bg-white/90 shadow-md rounded-full p-2 hover:scale-110 transition"
      >
        <ChevronRight />
      </button>

      {/* Hide Scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
