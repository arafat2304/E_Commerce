import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShopProduct",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  images: {
    type: [String], // URLs from Cloudinary
    validate: [arr => arr.length <= 2, "Maximum 2 images allowed"],
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Review", reviewSchema);
