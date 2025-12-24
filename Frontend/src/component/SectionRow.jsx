import React from "react";
import DummyCard from "./DummyCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SectionRow({ title, products }) {
  const scrollRef = React.useRef();

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 relative">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10 hover:bg-gray-200"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {products.map((item) => (
          <DummyCard key={item.id} item={item} />
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10 hover:bg-gray-200"
      >
        <ChevronRight size={20} />
      </button>
    </section>
  );
}
