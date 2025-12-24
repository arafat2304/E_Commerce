import express from "express";
import jwt from "jsonwebtoken";
import Shopkeeper from "../models/Shopkeeper.js";
import authShopkeeper from "../middlewares/authShopkeeper.js";

const router = express.Router();

// 🧩 Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, businessName, businessType, phone, address } = req.body;
    const exist = await Shopkeeper.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already registered" });

    const newShopkeeper = await Shopkeeper.create({
      name,
      email,
      password,
      businessName,
      businessType,
      phone,
      address,
    });

    res.status(201).json({ message: "Registered successfully", shopkeeper: newShopkeeper });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔐 Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const shopkeeper = await Shopkeeper.findOne({ email });
    if (!shopkeeper) return res.status(404).json({ message: "Shopkeeper not found" });

    const isMatch = await shopkeeper.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: shopkeeper._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, shopkeeper });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🧾 Get Shopkeeper Details
router.get("/me", authShopkeeper, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const shopkeeper = await Shopkeeper.findById(decoded.id);
    res.json(shopkeeper);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
