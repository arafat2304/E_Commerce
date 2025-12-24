import React from "react";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import  { useReturn } from "../context/ReturnContext"; // ✅ NEW

export default function DealCard({ item }) {
  const navigate = useNavigate();
  const { openReturnModal } = useReturn(); // ⭐ NEW
  const handleAddToCart = () => {
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div 
    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex-shrink-0 w-[240px]">
      <img src={item.image} alt={item.name} className="w-full h-44 object-cover" />

      <div className="p-4 flex flex-col justify-between h-[180px]"
      onClick={()=> navigate(`/product/${item._id}`)}>
        <div>
          <h3 className="font-semibold text-lg truncate">{item.name}</h3>
          <p className="text-gray-500 text-sm">{item.category}</p>

          <div className="flex justify-between items-center mt-2">
            <div>
              <span className="text-orange-600 font-bold text-base">₹{item.newPrice}</span>
              {item.oldPrice && (
                <span className="text-gray-400 text-sm line-through ml-1">₹{item.oldPrice}</span>
              )}
            </div>
            <span className="text-yellow-500 text-sm font-medium">⭐ {item.rating}</span>
          </div>

          {item.discount && (
            <p className="text-green-600 text-xs font-semibold mt-1">{item.discount}</p>
          )}
        </div>

        <button
          onClick={() => openReturnModal(item, "add")}
          className="mt-4 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm py-2 rounded-lg transition-all active:scale-95"
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
