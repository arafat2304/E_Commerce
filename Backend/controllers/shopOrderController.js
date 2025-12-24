// controllers/shopOrderController.js

import ShopOrder from "../models/shopOrder.js";

/**
 * 🛒 Create new order (user places order)
 */
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const { items, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.json({
        success: false,
        message: "No items provided",
      });
    }

    let subtotal = 0;
    const DELIVERY_CHARGE = 35;

    const orderItems = items.map(item => {
      const basePrice = Number(item.basePrice);
      const quantity = Number(item.quantity);

      const returnProtectionCharge =
        item.returnType === "YES" ? 15 : 0;

      const itemTotal =
        (basePrice + returnProtectionCharge) * quantity;

      subtotal += itemTotal;

      return {
        productId: item.productId,
        shopkeeperId: item.shopkeeperId,
        name: item.name,
        image: item.image,

        basePrice,
        returnProtectionCharge,
        quantity,
        total: itemTotal,

        returnType: item.returnType,
        type: item.type,
      };
    });

    const totalAmount = subtotal + DELIVERY_CHARGE;

    const newOrder = await ShopOrder.create({
      userId,
      items: orderItems,
      subtotal,
      deliveryCharge: DELIVERY_CHARGE,
      totalAmount,
      paymentMethod,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      order: newOrder,
    });

  } catch (err) {
    console.error("Create Order Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// user order fetch
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await ShopOrder.find({ userId })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders,
    });

  } catch (err) {
    console.log("Get Orders Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// specific order

export const getOrderById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.params;

    const order = await ShopOrder.findOne({
      _id: orderId,
      userId, // 🔐 very important (security)
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("Get Order By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



/**
 * 🧾 Get all orders for a seller (shopkeeper)
 * Seller should see:
 *   → Only orders where his products exist
 *   → Only HIS ITEMS inside the order
 *   → Full buyer details (name, email)
 */
export const getSellerOrders = async (req, res) => {
  try {
    const shopkeeperId = req.shopkeeper._id;

    const orders = await ShopOrder.find({
      "items.shopkeeperId": shopkeeperId
    })
      .populate("items.productId", "title images newPrice")
      .populate("userId", "name email");   // ⭐ Buyer data here

    // ⭐ Filter items but DO NOT destroy populated fields
    const filteredOrders = orders.map(order => {
      const sellerItems = order.items.filter(
        item => item.shopkeeperId.toString() === shopkeeperId.toString()
      );

      return {
        ...order._doc, // ⭐ keep original populated order data
        items: sellerItems
      };
    });

    return res.status(200).json({ success: true, orders: filteredOrders });

  } catch (err) {
    console.error("Error fetching seller orders:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



/**
 * 🚚 Update order status (seller only)
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled"
    ];

    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const order = await ShopOrder.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Make sure seller belongs to this order
    const isSellerOrder = order.items.some(
      item => item.shopkeeperId.toString() === req.shopkeeper._id.toString()
    );

    if (!isSellerOrder) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized seller" });
    }

    order.status = status.toLowerCase();
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated",
      order
    });
  } catch (err) {
    console.error("Update Order Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



/**
 * 📊 Get seller order statistics
 */
export const getSellerOrderStats = async (req, res) => {
  try {
    const shopkeeperId = req.shopkeeper._id;

    const orders = await ShopOrder.find({
      "items.shopkeeperId": shopkeeperId
    });

    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === "pending").length,
      delivered: orders.filter(o => o.status === "delivered").length,
      cancelled: orders.filter(o => o.status === "cancelled").length,
    };

    return res.status(200).json({ success: true, stats });
  } catch (err) {
    console.error("Stats Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
