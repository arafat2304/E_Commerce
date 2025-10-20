import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#131A22] text-gray-300 mt-10">
      <div className="max-w-screen-2xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-orange-500">SHOPSTIC</h2>
          <p className="mt-2 text-gray-400 text-xs leading-relaxed">
            Your trusted shopping destination for deals, quality, and fast delivery.
          </p>
        </div>

        {/* About */}
        <div>
          <h3 className="text-orange-500 font-semibold mb-3">About</h3>
          <ul className="space-y-2">
            <li className="hover:text-orange-500 cursor-pointer">About Us</li>
            <li className="hover:text-orange-500 cursor-pointer">Careers</li>
            <li className="hover:text-orange-500 cursor-pointer">Blog</li>
            <li className="hover:text-orange-500 cursor-pointer">Press</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-orange-500 font-semibold mb-3">Help</h3>
          <ul className="space-y-2">
            <li className="hover:text-orange-500 cursor-pointer">Payments</li>
            <li className="hover:text-orange-500 cursor-pointer">Shipping</li>
            <li className="hover:text-orange-500 cursor-pointer">Cancellation & Returns</li>
            <li className="hover:text-orange-500 cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-orange-500 font-semibold mb-3">Social</h3>
          <ul className="space-y-2">
            <li className="hover:text-orange-500 cursor-pointer">Facebook</li>
            <li className="hover:text-orange-500 cursor-pointer">Twitter</li>
            <li className="hover:text-orange-500 cursor-pointer">Instagram</li>
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} SHOPSTIC. All Rights Reserved.
      </div>
    </footer>
  );
}
