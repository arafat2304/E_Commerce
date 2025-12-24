import FoodItem from "../models/FoodItem.js";

// ➕ Add new food item
export const addFoodItem = async (req, res) => {
  try {
    const {
      restaurantId,
      name,
      description,
      price,
      category,
      portionSize:quantityType, // 👈 added
      isAvailable,  // optional toggle support
    } = req.body;


    const image = req.file ? req.file.path : "";

    if (!restaurantId || !name || !price || !quantityType) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newFood = new FoodItem({
      restaurantId,
      name,
      description,
      price,
      category,
      quantityType, // 👈 added
      image,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
    });

    await newFood.save();
    res
      .status(201)
      .json({ success: true, message: "Food item added", data: newFood });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📦 Get all food items for a restaurant
export const getRestaurantMenu = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menu = await FoodItem.find({ restaurantId }).sort({ category: 1 });
    res.status(200).json({ success: true, data: menu });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✏️ Update food item
export const updateFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (req.file) updateData.image = req.file.path;

    const updated = await FoodItem.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });

    res.status(200).json({
      success: true,
      message: "Food item updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ❌ Delete food item
export const deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await FoodItem.findByIdAndDelete(id);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });

    res
      .status(200)
      .json({ success: true, message: "Food item deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
