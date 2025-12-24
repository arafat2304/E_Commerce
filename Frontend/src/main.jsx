// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ReturnProvider } from "./context/ReturnContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <ReturnProvider>
      <App />
      </ReturnProvider>
    </CartProvider>
  
  </BrowserRouter>
);
