import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./component/Header";
import Shopping from "./pages/Shopping";
import LoginOTP from "./auth/LoginOTP";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Router>
      {/* Navbar is outside routes so it's visible on all pages */}
      <Navbar />

      {/* All routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<LoginOTP />} />
      </Routes>

      {/* Toast notifications */}
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
}
