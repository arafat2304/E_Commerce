import express from "express";
import { getSellerOrders, updateOrderStatus,getSellerOrderStats, createOrder,getMyOrders,getOrderById} from "../controllers/shopOrderController.js";
import authShopkeeper from "../middlewares/authShopkeeper.js";
import {verifyToken} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/create",verifyToken, createOrder);

//GET all order for specific user
router.get("/my-orders",verifyToken,getMyOrders)

// ✅ specific order
router.get("/:orderId",verifyToken, getOrderById);

// GET all orders for this shopkeeper
router.get("/my-orders",  authShopkeeper, getSellerOrders);


// PATCH to update order status
router.patch("/update-status/:orderId",  authShopkeeper, updateOrderStatus);

// ✅ Dashboard stats (total, pending, delivered, cancelled)
router.get("/stats",  authShopkeeper, getSellerOrderStats);

export default router;
