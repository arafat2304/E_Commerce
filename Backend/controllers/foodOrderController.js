import FoodOrder from "../models/FoodOrder.js";
import Restaurant from "../models/Restaurant.js";

// Create new food order
export const createFoodOrder = async (req, res) => {
  try {
    const { userId, restaurantId, items, totalAmount, deliveryAddress, paymentMethod } = req.body;

    if (!userId || !restaurantId || !items?.length)
      return res.status(400).json({ message: "Missing order details" });

    const order = await FoodOrder.create({
      userId,
      restaurantId,
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await FoodOrder.find({ userId: req.params.userId })
      .populate("restaurantId", "name image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders" });
  }
};

// Get all orders for a restaurant (for owner dashboard)
export const getRestaurantOrders = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    const orders = await FoodOrder.find({ restaurantId: restaurant._id })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurant orders" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await FoodOrder.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status" });
  }
};
