import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShopProduct",
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

  returnProtectionCharge: {
    type: Number,
    default: 0,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },

  total: {
    type: Number,
    required: true,
  },

  returnType: {
    type: String,
    enum: ["YES", "NO"],
    default: "NO",
  },

  type: {
    type: String,
    enum: ["product", "food"],
    required: true,
  },
});


const shopOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    subtotal: {
      type: Number,
      required: true,
    },

    deliveryCharge: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true, // ⭐ auto createdAt & updatedAt
  }
);

export default mongoose.model("ShopOrder", shopOrderSchema);
