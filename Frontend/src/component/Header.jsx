import React, { useEffect, useState } from "react";
import { Menu, X, Search, ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import LoginModal from "../auth/LoginOTP";
import jwt_decode from "jwt-decode";

export default function Navbar() {
  const { cartItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null); // store logged-in user info

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Check if JWT exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwt_decode(token); // decode to get user id
        // You can fetch user details from backend if needed
        setUser({ id: decoded.id, name: decoded.name || "User" });
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const categories = [
    "Top Offers",
    "Grocery",
    "Mobiles",
    "Fashion",
    "Electronics",
    "Home",
    "Beauty, Toys & More",
  ];

  return (
    <>
      <header
        className={`w-full sticky top-0 z-50 transition-all ${
          scrolled ? "backdrop-blur-md bg-white/95 shadow" : "bg-white/95"
        }`}
        style={{
          boxShadow: scrolled
            ? "0 8px 25px rgba(0,0,0,0.12)"
            : "0 6px 18px rgba(0,0,0,0.04)",
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 py-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden p-2 rounded hover:bg-gray-100 transition"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Logo */}
            <Link to="/">
              <div className="flex items-center gap-3 mr-2">
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center"
                  style={{ background: "#FF6A00" }}
                >
                  <span className="text-white font-extrabold text-lg">A</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-lg font-extrabold tracking-tight">Amaze</div>
                  <div className="text-xs text-gray-500 -mt-0.5">Shop everything</div>
                </div>
              </div>
            </Link>

            {/* Search */}
            <div className="flex-1 hidden sm:block">
              <div className="relative">
                <input
                  aria-label="Search"
                  className="w-full h-11 rounded-full pl-4 pr-36 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6A00] transition shadow-sm"
                  placeholder="Search for products, brands and more"
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-[#FF6A00] hover:bg-[#e58000] text-white font-medium flex items-center gap-2"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden md:inline">Search</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 ml-4">
              {user ? (
                // Logged-in user
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded hover:bg-gray-100 transition"
                  >
                    <LogOut className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              ) : (
                // Not logged-in
                <button
                  onClick={() => setLoginOpen(true)}
                  className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition"
                >
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium">Sign in</span>
                </button>
              )}

              {/* Profile Icon */}
              {user && (
                <button className="hidden sm:inline-flex items-center p-2 rounded-full hover:bg-gray-100 transition">
                  <User className="w-5 h-5 text-gray-700" />
                </button>
              )}

              {/* Cart */}
              <Link to="/cart" className="relative flex items-center gap-2">
                <button
                  className="relative px-3 py-2 rounded-full hover:bg-gray-100 transition"
                  aria-label="Cart"
                >
                  <ShoppingCart className="w-6 h-6 text-gray-700" />
                  <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                    {cartItems.length}
                  </span>
                </button>
              </Link>

              {/* Mobile search shortcut */}
              <button
                className="sm:hidden p-2 rounded hover:bg-gray-100 transition"
                aria-label="Search"
                onClick={() => {
                  const el = document.querySelector('input[aria-label="Search"]');
                  if (el) el.focus();
                }}
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Secondary category strip */}
          <div className="hidden md:flex items-center gap-4 py-2 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                className="text-sm px-3 py-2 rounded hover:bg-gray-100 transition font-medium"
                aria-label={c}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* SIDE DRAWER */}
      {/* (Same as before, can optionally show login / user info based on JWT) */}

      {/* LOGIN MODAL */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
