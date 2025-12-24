// routes/restaurantRoutes.js
import express from "express";
import upload from "../middlewares/multer.js";
import authShopkeeper from "../middlewares/authShopkeeper.js";
import Restaurant from "../models/Restaurant.js";
import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.post("/create", authShopkeeper, upload.single("image"), createRestaurant);
router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);
router.put("/:id", authShopkeeper, upload.single("image"), updateRestaurant);
router.delete("/:id", authShopkeeper, deleteRestaurant);

// Get restaurant by shopkeeperId
router.get("/by-shopkeeper/:shopkeeperId", async (req, res) => {
  try {
    const { shopkeeperId } = req.params;

    const restaurant = await Restaurant.findOne({ ownerId:shopkeeperId });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found for this shopkeeper",
      });
    }

    res.status(200).json({
      success: true,
      restaurantId: restaurant._id,
      restaurant,
    });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


export default router;
