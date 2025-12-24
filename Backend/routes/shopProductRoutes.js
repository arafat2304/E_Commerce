import express from "express";
import ShopProduct from "../models/ShopProduct.js";
import authShopkeeper from "../middlewares/authShopkeeper.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// ➕ Add Product

// Add Product (with up to 4 images)
router.post("/add", authShopkeeper, upload.array("images", 4), async (req, res) => {
    
  try {
    const { title, description, category, tags, oldPrice, newPrice, stock } = req.body;

    // Extract Cloudinary URLs from uploaded images
    const imageUrls = req.files.map((file) => file.path);

    const newProduct = await ShopProduct.create({
      shopkeeperId: req.shopkeeper._id,
      title,
      description,
      category,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      images: imageUrls,
      oldPrice,
      newPrice,
      stock,
    });

    res.status(201).json({ message: "✅ Product added successfully", product: newProduct });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// 📦 Get Shopkeeper’s Products
router.get("/my-products", authShopkeeper, async (req, res) => {
   try {
    const products = await ShopProduct.find({ shopkeeperId: req.shopkeeper._id }).sort({
      createdAt: -1,
    });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/shopproducts/category/:category
router.get("/category/:category", async (req, res) => {
  const products = await ShopProduct.find({
    category: { $regex: new RegExp(req.params.category, "i") },
  });
  res.json({ products });
}); 

// GET /api/shopproducts/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await ShopProduct.findById(req.params.id).populate("shopkeeperId", "businessName businessType");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default router;
