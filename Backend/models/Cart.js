import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  shopkeeperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shopkeeper",
    required: true,
  },

  name: String,
  image: String,

  basePrice: {
    type: Number,
    required: true,
  },

  finalPrice: {
    type: Number,
    required: true,
  },

  returnType: {
    type: String,
    enum: ["YES", "NO", null],
    default: null,
  },

  extraCharge: {
    type: Number,
    default: 0,
  },

  quantity: {
    type: Number,
    default: 1,
  },

  type: {
    type: String,
    enum: ["food", "product"],
    required: true,
  },
});


const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Cart", cartSchema);
