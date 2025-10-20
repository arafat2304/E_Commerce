import { useParams } from "react-router-dom";
import { productsData } from "../Data.js";
import ProductCard from "../component/CategorieProductCard.jsx";
import SkeletonCard from "../component/SkeletonCard";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = productsData.filter(
        (p) => p.category.toLowerCase() === name.toLowerCase()
      );
      setFiltered(filteredData);
      setLoading(false);
    }, 1200); // Simulate API delay
  }, [name]);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-6">
      <div className="flex justify-between items-center mb  -">
        <h1 className="text-xl font-semibold capitalize">
          {name} Deals & Offers
        </h1>
        {/* Sort Dropdown Next Step */}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
