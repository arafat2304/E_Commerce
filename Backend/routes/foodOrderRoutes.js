import express from "express";
import {
  createFoodOrder,
  getUserOrders,
  getRestaurantOrders,
  updateOrderStatus,
} from "../controllers/foodOrderController.js";

const router = express.Router();

router.post("/create", createFoodOrder);
router.get("/user/:userId", getUserOrders);
router.get("/restaurant/:id", getRestaurantOrders);
router.put("/status/:orderId", updateOrderStatus);

export default router;
