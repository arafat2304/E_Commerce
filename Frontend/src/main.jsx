// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { CartProvider } from "./context/CartContext";

// Swiper css
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
     <App />
  </CartProvider>
)
