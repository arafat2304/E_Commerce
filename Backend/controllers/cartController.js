import Cart from "../models/Cart.js";

// 🧩 GET CART BY TYPE
export const getCartByType = async (req, res) => {
  try {
    const { type } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(200).json({ items: [] });

    const filteredItems = cart.items.filter((item) => item.type === type);
    res.status(200).json({ items: filteredItems ,userId:cart.userId});

  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// 🛒 ADD TO CART (supports return policy)
export const addToCart = async (req, res) => {
  console.log(req.body)
  try {
    const {
      _id,
      title,
      images,
      newPrice,
      finalPrice,
      returnType,
      type,
      shopkeeperId
    } = req.body.item;

    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const existingItem = cart.items.find(
      (i) => i._id.toString() === _id && i.type === type
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        itemId:_id,
        name:title,
        image:req.body.item.images[0],
        basePrice:newPrice,
        finalPrice,
        returnType: returnType || null,
        quantity: 1,
        type,
        shopkeeperId
      });
    }

    cart.updatedAt = Date.now();
    await cart.save();
    console.log(cart)
    res.status(200).json({ success: true, data: cart });

  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// ➕➖ UPDATE QUANTITY
export const updateQuantity = async (req, res) => {
  try {
    const { itemId, action, type } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.itemId.toString() === itemId && i.type === type
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (action === "increase") item.quantity += 1;
    if (action === "decrease" && item.quantity > 1) item.quantity -= 1;

    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ success: true, data: cart });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating cart" });
  }
};

// ❌ REMOVE ITEM
export const removeFromCart = async (req, res) => {
  try {
    const { itemId, type } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => !(i.itemId.toString() === itemId && i.type === type)
    );

    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ success: true, data: cart });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error removing item" });
  }
};
