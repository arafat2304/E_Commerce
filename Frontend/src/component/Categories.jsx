// import React from "react";

// /**
//  * Uses images from public/assets/images/ (Vite serves public as root)
//  * e.g. /assets/images/cat-fashion.png
//  */
// const categories = [
//   { name: "Fashion", img: "/assets/images/cat-fashion.png", color: "from-[#FFEAF2] to-[#DFFFEA]" },
//   { name: "Electronics", img: "/assets/images/cat-electronics.png", color: "from-[#DFFFEA] to-[#FFF8D6]" },
//   { name: "Bags", img: "/assets/images/cat-bags.png", color: "from-[#FFF8D6] to-[#FFEAF2]" },
//   { name: "Footwear", img: "/assets/images/cat-footwear.png", color: "from-[#DFFFEA] to-[#FFEAF2]" },
//   { name: "Groceries", img: "/assets/images/cat-groceries.png", color: "from-[#FFF8D6] to-[#DFFFEA]" },
//   { name: "Beauty", img: "/assets/images/cat-beauty.png", color: "from-[#FFEAF2] to-[#FFF8D6]" },
//   { name: "Home Decor", img: "/assets/images/cat-decor.png", color: "from-[#DFFFEA] to-[#FFF8D6]" },
//   { name: "Sports", img: "/assets/images/cat-sports.png", color: "from-[#FFF8D6] to-[#DFFFEA]" },
// ];

// export default function Categories() {
//   return (
//     <section className="max-w-screen-xl mx-auto px-6 py-10">
//       <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shop by category</h2>

//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
//         {categories.map((c) => (
//           <div
//             key={c.name}
//             className="group bg-white/30 backdrop-blur-sm rounded-2xl p-5 flex flex-col items-center text-center cursor-pointer transition-transform"
//           >
//             <div
//               className={
//                 "w-28 h-28 rounded-full flex items-center justify-center mb-3 transform transition-transform duration-400 " +
//                 "bg-gradient-to-br " +
//                 (c.color || "from-[#FFEAF2] to-[#DFFFEA]")
//               }
//               style={{
//                 boxShadow:
//                   "0 8px 20px rgba(16,24,40,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
//               }}
//             >
//               <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white/70">
//                 <img src={c.img} alt={c.name} className="w-10 h-10 object-contain" />
//               </div>
//             </div>

//             <div className="text-sm font-medium text-gray-800">{c.name}</div>

//             {/* Floating + glow on hover */}
//             <style jsx>{`
//               /* small per-card hover - handled by tailwind utility combos below */
//             `}</style>

//             <div className="mt-3 opacity-0 group-hover:opacity-100 transform group-hover:-translate-y-2 transition-all duration-300">
//               <div className="text-xs text-gray-500">Explore</div>
//             </div>

//             {/* Utilities applied using Tailwind classes on the outer group for hover */}
//             <div className="absolute" />
//           </div>
//         ))}
//       </div>

//       {/* Apply container-level interactions using a utility wrapper (Tailwind): */}
//       <style>{`
//         /* We'll add hover/transform effect to each .group using tailwind classes in parent scope */
//       `}</style>
//     </section>
//   );
// }

import React from "react";

/**
 * Compact category strip. Icons should be in public/assets/categories/
 * Example files: fashion.png, electronics.png, bags.png ...
 */
const cats = [
  { name: "Fashion", img: "src/assets/cat-fashion.png" },
  { name: "Mobiles", img: "src/assets/cat-electronics.png" },
  { name: "Home", img: "src/assets/cat-decor.png" },
  { name: "Beauty", img: "src/assets/cat-beauty.png" },
  { name: "Grocery", img: "src/assets/cat-groceries.png" },
  { name: "Sports", img: "src/assets/cat-sports.png" },
];

export default function Categories() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 mt-6">
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm py-3 px-3 flex gap-3 overflow-x-auto">
        {cats.map((c) => (
          <div key={c.name} className="flex-shrink-0 w-28 text-center cursor-pointer hover:shadow-md transition p-2 rounded">
            <div className="w-16 h-16 mx-auto rounded-lg bg-gray-50 flex items-center justify-center mb-2">
              <img src={c.img} alt={c.name} className="w-10 h-10 object-contain" />
            </div>
            <div className="text-sm font-medium">{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

