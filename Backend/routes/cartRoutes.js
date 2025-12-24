import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getCartByType,
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:type", verifyToken, getCartByType);     // /api/cart/food OR /api/cart/product
router.post("/add", verifyToken, addToCart);
router.put("/update", verifyToken, updateQuantity);
router.delete("/remove", verifyToken, removeFromCart);

export default router;
