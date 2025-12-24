import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  price: String,
  image: String,
  quantity: { type: Number, default: 1 },
});

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  full_name: { type: String },       // first time signup के लिए
  email: { type: String },
  gender: { type: String },
  cart: [cartItemSchema],
   role: {
    type: String,
    enum: ["customer", "shopkeeper", "admin"],
    default: "customer"
  },
  is_verified: { type: Boolean, default: false }, // OTP verify होने पर true
}, { timestamps: true });

export default mongoose.model("User", userSchema);
