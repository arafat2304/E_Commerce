import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  // ✅ NEW FIELD: quantity or unit (e.g., "1kg", "250g", "1 plate")
  quantityType: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    default: "",
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("FoodItem", foodItemSchema);
