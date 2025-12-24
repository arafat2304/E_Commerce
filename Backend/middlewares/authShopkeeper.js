import jwt from "jsonwebtoken";
import Shopkeeper from "../models/Shopkeeper.js";

const authShopkeeper = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const shopkeeper = await Shopkeeper.findById(decoded.id);
    if (!shopkeeper) return res.status(404).json({ message: "Shopkeeper not found" });

    req.shopkeeper = shopkeeper; // attach to request object
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authShopkeeper;
