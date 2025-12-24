// models/Restaurant.js
import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shopkeeper",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    cuisineType: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Cloudinary image URL
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    deliveryTime: {
      type: String,
      default: "30 mins",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);
