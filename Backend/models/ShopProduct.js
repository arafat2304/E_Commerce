// models/ShopProduct.js
import mongoose from "mongoose";

const shopProductSchema = new mongoose.Schema({
  shopkeeperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shopkeeper",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  tags: { type: [String], default: [] }, // Example: ["mobile", "android", "5G"]
  images: {
    type: [String],
    validate: [arr => arr.length <= 4, "Maximum 4 images allowed"],
  },
  oldPrice: { type: Number, required: true }, // Original higher price
  newPrice: { type: Number, required: true }, // Discounted price
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ShopProduct", shopProductSchema);
