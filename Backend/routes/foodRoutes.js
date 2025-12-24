// routes/foodRoutes.js
import express from "express";
import upload from "../middlewares/multer.js";
import {
  addFoodItem,
  getRestaurantMenu,
  updateFoodItem,
  deleteFoodItem,
} from "../controllers/foodController.js";
import  authShopkeeper  from "../middlewares/authShopkeeper.js";

const router = express.Router();

router.post("/", authShopkeeper, upload.single("image"), addFoodItem);
router.get("/:restaurantId", getRestaurantMenu);
router.put("/:id", authShopkeeper, upload.single("image"), updateFoodItem);
router.delete("/:id", authShopkeeper, deleteFoodItem);

export default router;
