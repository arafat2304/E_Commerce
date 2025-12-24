import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, Package, ShoppingBag, PlusCircle, User } from "lucide-react";

export default function SellerLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/shopkeeper/home", icon: <Home size={22} />, label: "Home" },
    { path: "/shopkeeper/orders", icon: <Package size={22} />, label: "Orders" },
    { path: "/shopkeeper/products", icon: <ShoppingBag size={22} />, label: "Products" },
    { path: "/shopkeeper/add-product", icon: <PlusCircle size={22} />, label: "Add" },
    { path: "/shopkeeper/profile", icon: <User size={22} />, label: "Profile" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Page Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet /> {/* renders active seller page */}
      </div>

      {/* Bottom Navigation for Seller */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-2 z-50">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center text-xs ${
              location.pathname === item.path
                ? "text-[#FF6A00] font-semibold"
                : "text-gray-500"
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                location.pathname === item.path ? "bg-orange-100" : ""
              }`}
            >
              {item.icon}
            </div>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
