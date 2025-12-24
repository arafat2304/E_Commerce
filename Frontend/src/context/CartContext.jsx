// src/context/CartContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [foodCart, setFoodCart] = useState([]);
  const [productCart, setProductCart] = useState([]);

  const token = localStorage.getItem("authToken");

  // 🔹 Fetch both carts initially
  useEffect(() => {
    if (token) {
      fetchCart("food");
      fetchCart("product");
    }
  }, [token]);

  const fetchCart = async (type) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (type === "food") setFoodCart(res.data.items || []);
      if (type === "product") setProductCart(res.data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // 🔹 Add to cart
  const addToCart = async (item) => {
    if (!token) return toast.error("Please login first!");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { item },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`${item.name || item.title} added to cart`);
      fetchCart(item.type);
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  // 🔹 Update quantity
  const updateQuantity = async (itemId, action, type) => {
    try {
      await axios.put(
        "http://localhost:5000/api/cart/update",
        { itemId, action, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart(type);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Remove item from cart
  const removeFromCart = async (itemId, type) => {
    try {
      await axios.delete("http://localhost:5000/api/cart/remove", {
        headers: { Authorization: `Bearer ${token}` },
        data: { itemId, type },
      });
      fetchCart(type);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 CLEAR ENTIRE PRODUCT CART (AFTER ORDER PLACE)
  const clearCart = async () => {
    try {
      if (!token) return;

      for (const item of productCart) {
        await axios.delete("http://localhost:5000/api/cart/remove", {
          headers: { Authorization: `Bearer ${token}` },
          data: { itemId: item.itemId, type: "product" },
        });
      }

      fetchCart("product");
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        foodCart,
        productCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart, // ⭐ added
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
