import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  List,
  Heart,
  Settings,
  Home,
  Store,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchOverlay from "./SearchOverlay";
import useUser from "../hooks/useUser";
import { useCart } from "../context/CartContext"; // ✅ import context

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  // ✅ Cart context
  const { foodCart, productCart } = useCart();
  const isFood = location.pathname.startsWith("/food");
  const cartCount = isFood ? foodCart.length : productCart.length;

  const handleCartClick = () => {
    if (isFood) navigate("/food/cart");
    else navigate("/shopping/cart");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("shopkeeperToken");
    setDrawerOpen(false);
    window.location.href = "/login";
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`w-full sticky top-0 z-50 transition-all ${
          scrolled ? "backdrop-blur-md bg-white/95 shadow-md" : "bg-white/95"
        }`}
        style={{
          boxShadow: scrolled
            ? "0 8px 25px rgba(0,0,0,0.12)"
            : "0 6px 18px rgba(0,0,0,0.04)",
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
                style={{ background: "#FF6A00" }}
              >
                <span className="text-white font-extrabold text-lg">A</span>
              </div>
              <div className="hidden md:block text-lg font-extrabold tracking-tight">
                Amaze
              </div>
            </Link>

            {/* Search */}
            <div className="flex-1 mx-4 relative">
              <button
                className="w-full h-10 flex items-center px-4 border rounded-full hover:bg-gray-200 transition lg:hidden"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-5 h-5 text-black-500 mr-2" />
                <span className="text-black-500 text-sm">
                  kuch chahiye kya....
                </span>
              </button>

              <div className="hidden lg:flex w-full relative">
                <input
                  aria-label="Search"
                  className="w-full h-11 rounded-full pl-4 pr-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6A00] shadow-sm transition"
                  placeholder="Search for products or restaurants..."
                  onFocus={() => setSearchOpen(true)}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
            </div>

            {/* Desktop: Become Seller Button */}
            <button
              onClick={() => navigate("/shopkeeper/home")}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-white transition font-medium"
            >
              <Store className="w-4 h-4" />
              Become a Seller
            </button>

            {/* Hamburger Menu */}
            <button
              className="p-2 rounded hover:bg-gray-100 transition flex"
              aria-label="Open Menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* ✅ Cart (Desktop) */}
            <div
              onClick={handleCartClick}
              className="hidden lg:flex relative ml-3 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 text-xs bg-orange-500 text-white px-1 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-60 transition-opacity duration-300 ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!drawerOpen}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-black/30 transition-opacity ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute left-0 top-0 bottom-0 w-72 bg-white/95 backdrop-blur-md border-r border-gray-100 transform transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
          }}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="font-semibold">
              Hello, {user?.full_name || "Guest"}
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-2 rounded hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white font-medium mb-3 shadow-sm hover:bg-gray-800 transition"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full px-4 py-2 rounded bg-[#FF6A00] text-white font-medium mb-3 shadow-sm hover:bg-[#e58000] transition"
              >
                Sign in
              </button>
            )}

            <nav className="space-y-2">
              <Link
                to="/account"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition font-medium"
              >
                <User className="w-4 h-4 text-gray-600" /> Account
              </Link>
              <Link
                to="/orders"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition font-medium"
              >
                <List className="w-4 h-4" /> Orders
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition font-medium"
              >
                <Heart className="w-4 h-4" /> Wishlist
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition font-medium"
              >
                <Settings className="w-4 h-4" /> Settings
              </Link>

              {/* 🧡 Become a Seller */}
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  navigate("/shopkeeper/home");
                }}
                className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-orange-50 text-[#FF6A00] font-medium transition"
              >
                <Store className="w-4 h-4" /> Become a Seller
              </button>
            </nav>
          </div>

          <div className="absolute bottom-4 w-full px-4 text-xs text-gray-500">
            © {new Date().getFullYear()} Amaze
          </div>
        </aside>
      </div>

      {/* ✅ Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2 sm:hidden z-50 shadow-t">
        <Link to="/" className="flex flex-col items-center text-gray-700">
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>

        <Link to="/orders" className="flex flex-col items-center text-gray-700">
          <List className="w-6 h-6" />
          <span className="text-xs">Orders</span>
        </Link>

        <div
          onClick={handleCartClick}
          className="flex flex-col items-center text-gray-700 relative cursor-pointer"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 text-xs bg-orange-500 text-white px-1 rounded-full animate-bounce">
              {cartCount}
            </span>
          )}
          <span className="text-xs">Cart</span>
        </div>

        <Link
          to="/shopkeeper/home"
          className="flex flex-col items-center text-gray-700"
        >
          <Store className="w-6 h-6 text-[#FF6A00]" />
          <span className="text-xs text-[#FF6A00]">Seller</span>
        </Link>

        <Link to="/account" className="flex flex-col items-center text-gray-700">
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </>
  );
}
