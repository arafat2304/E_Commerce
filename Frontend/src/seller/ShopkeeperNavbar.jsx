import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import {
  LogOut,
  Home,
  PackagePlus,
  List,
  User,
} from "lucide-react";

export default function ShopkeeperNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("shopkeeperToken");
    toast.success("Logout successful!");
    navigate("/");
  };

  return (
    <>
      {/* 🟠 Top Navbar (Desktop) */}
      <nav className="bg-[#FF6A00] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Left side - Logo */}
          <h1
            onClick={() => navigate("/shopkeeper/home")}
            className="text-xl font-semibold cursor-pointer tracking-wide flex items-center gap-2"
          >
            🛍️ <span>Seller Panel</span>
          </h1>

          {/* Right side - Menu */}
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
            <NavLink
              to="/shopkeeper/home"
              className={({ isActive }) =>
                `hover:text-gray-200 transition ${
                  isActive ? "underline underline-offset-4" : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/shopkeeper/add-product"
              className={({ isActive }) =>
                `hover:text-gray-200 transition ${
                  isActive ? "underline underline-offset-4" : ""
                }`
              }
            >
              Add Product
            </NavLink>

            <NavLink
              to="/shopkeeper/products"
              className={({ isActive }) =>
                `hover:text-gray-200 transition ${
                  isActive ? "underline underline-offset-4" : ""
                }`
              }
            >
              Manage Products
            </NavLink>

            <NavLink
              to="/shopkeeper/profile"
              className={({ isActive }) =>
                `hover:text-gray-200 transition ${
                  isActive ? "underline underline-offset-4" : ""
                }`
              }
            >
              Profile
            </NavLink>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-white text-[#FF6A00] px-3 py-1 rounded-md font-medium hover:bg-gray-100 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* 🔸 Bottom Navbar (Mobile) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 sm:hidden z-50 shadow-md">
        <NavLink
          to="/shopkeeper/home"
          className="flex flex-col items-center text-gray-600 hover:text-[#FF6A00]"
        >
          <Home size={22} />
          <span className="text-xs">Home</span>
        </NavLink>

        <NavLink
          to="/shopkeeper/add-product"
          className="flex flex-col items-center text-gray-600 hover:text-[#FF6A00]"
        >
          <PackagePlus size={22} />
          <span className="text-xs">Add</span>
        </NavLink>

        <NavLink
          to="/shopkeeper/products"
          className="flex flex-col items-center text-gray-600 hover:text-[#FF6A00]"
        >
          <List size={22} />
          <span className="text-xs">Manage</span>
        </NavLink>

        <NavLink
          to="/shopkeeper/profile"
          className="flex flex-col items-center text-gray-600 hover:text-[#FF6A00]"
        >
          <User size={22} />
          <span className="text-xs">Profile</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center text-gray-600 hover:text-[#FF6A00]"
        >
          <LogOut size={22} />
          <span className="text-xs">Logout</span>
        </button>
      </div>
    </>
  );
}
