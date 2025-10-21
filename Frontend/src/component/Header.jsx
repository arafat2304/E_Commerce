import React, { useEffect, useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


export default function Navbar() {
  const { cartItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        style={{ boxShadow: scrolled ? " 0 8px 25px rgba(0,0,0,0.12)" : "0 6px 18px rgba(0,0,0,0.04)" }}
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

            {/* Search - center (hidden on very small screens) */}
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
              {/* Login button (visible on md and up) */}
              <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition">
                <User className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium">Sign in</span>
              </button>

              {/* Profile Icon (visible on all except tiny screens) */}
              <button className="hidden sm:inline-flex items-center p-2 rounded-full hover:bg-gray-100 transition" aria-label="Profile">
                <User className="w-5 h-5 text-gray-700" />
              </button>

              {/* Cart */}
              <Link to="/cart" className="relative flex items-center gap-2">
              <button className="relative px-3 py-2 rounded-full hover:bg-gray-100 transition" aria-label="Cart">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full shadow">{cartItems.length}</span>
              </button>
              </Link>

              {/* Mobile search shortcut */}
              <button
                className="sm:hidden p-2 rounded hover:bg-gray-100 transition"
                aria-label="Search"
                onClick={() => {
                  // optional: focus on a search dialog or navigate to search page
                  const el = document.querySelector('input[aria-label="Search"]');
                  if (el) el.focus();
                }}
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Secondary small category strip (visible on md+) */}
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
      <div
  className={`fixed inset-0 z-60 transition-opacity duration-300 ${
    drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
  }`}

        aria-hidden={!drawerOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-black/30 transition-opacity ${drawerOpen ? "opacity-100" : "opacity-0"}`}
        />

        {/* Drawer panel */}
        <aside
          className={`absolute left-0 top-0 bottom-0 w-80 bg-white/95 backdrop-blur-md border-r border-gray-100 transform transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ boxShadow: " 0 8px 25px rgba(0,0,0,0.12)" }}
          aria-label="Main menu"
        >

          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm flex items-center justify-center" style={{ background: "#FF6A00" }}>
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <div className="font-semibold">Hello, Guest</div>
                <div className="text-xs text-gray-500">Sign in for the best experience</div>
              </div>
            </div>

            <div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded hover:bg-gray-100 transition"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* Login CTA */}
            <button className="w-full px-4 py-2 rounded bg-[#FF6A00] text-white font-medium mb-3">
              Sign in
            </button>

            {/* Quick Links */}
            <nav className="space-y-2">
              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 transition">Your Orders</a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 transition">Your Account</a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 transition">Wishlist</a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 transition">Cart</a>
            </nav>

            <hr className="my-4" />

            <div>
              <div className="text-sm font-medium mb-2">Shop by category</div>
              <ul className="space-y-1">
                {categories.map((c) => (
                  <li key={c}>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 transition">
                      <span className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center">📦</span>
                      <span className="text-sm">{c}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="my-4" />

            <div className="text-xs text-gray-500">
              <div className="mb-2">Settings</div>
              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 transition">Choose Language</a>
              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 transition">Country & Currency</a>
            </div>
          </div>

          <div className="absolute bottom-4 w-full px-4">
            <div className="text-xs text-gray-500">© {new Date().getFullYear()} Amaze</div>
          </div>
        </aside>
      </div>
    </>
  );
}

