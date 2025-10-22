import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  oldPrice: Number,
  category: String,
  img: String, // Cloudinary URL
  rating: Number,
  description: String,
});

export default mongoose.model("Product", productSchema);
