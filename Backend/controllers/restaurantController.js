// controllers/restaurantController.js
import Restaurant from "../models/Restaurant.js";

export const createRestaurant = async (req, res) => {
  try {
    const { name, description, cuisineType, address, phone } = req.body;
    const image = req.file ? req.file.path : "";

    const restaurant = new Restaurant({
      ownerId: req.shopkeeper._id,
      name,
      description,
      cuisineType,
      address,
      phone,
      image,
    });

    await restaurant.save();
    res.status(201).json({ success: true, message: "Restaurant created", data: restaurant });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("ownerId", "shopName email");
    res.status(200).json({ success: true, data: restaurants });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate("ownerId", "shopName email");
    if (!restaurant) return res.status(200).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: restaurant });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (req.file) updateData.image = req.file.path;

    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: id, ownerId: req.shopkeeper._id },
      updateData,
      { new: true }
    );

    if (!restaurant) return res.status(403).json({ success: false, message: "Not authorized or not found" });

    res.status(200).json({ success: true, message: "Updated successfully", data: restaurant });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOneAndDelete({
      _id: id,
      ownerId: req.shopkeeper._id,
    });

    if (!restaurant)
      return res.status(403).json({ success: false, message: "Not authorized or not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
