import mongoose from "mongoose";
import dotenv from "dotenv";
import ShopProduct from "./models/ShopProduct.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// Helper to generate old/new price
const getPrice = (min, max) => {
  const newPrice = Math.floor(Math.random() * (max - min + 1)) + min;
  const oldPrice = newPrice + Math.floor(Math.random() * 500 + 200);
  return { oldPrice, newPrice };
};

const shopkeeperId = "68fb57b67e6726374069b06d";

const products = [
  // ✅ FASHION
  {
    title: "Trendy Denim Jacket",
    description: "Stylish unisex denim jacket for casual wear.",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ...getPrice(1200, 2000),
  },
  {
    title: "Classic Leather Jacket",
    description: "Premium leather jacket with a comfortable fit.",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1530845645621-76efb90d1b30",
    ...getPrice(2500, 3500),
  },
  {
    title: "Casual Cotton Hoodie",
    description: "Soft cotton hoodie for comfort and style.",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    ...getPrice(900, 1500),
  },
  {
    title: "Slim Fit Jeans",
    description: "Stretchable denim jeans for daily wear.",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1514996937319-344454492b37",
    ...getPrice(1000, 1800),
  },
  {
    title: "Winter Sweater",
    description: "Warm woolen sweater for cold days.",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542219550-85cc8f9483e1",
    ...getPrice(800, 1200),
  },

  // ✅ WATCHES
  {
    title: "Smartwatch X5",
    description: "Touchscreen smartwatch with health tracking.",
    category: "Watches",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    ...getPrice(3000, 5500),
  },
  {
    title: "Analog Classic Watch",
    description: "Elegant wristwatch with a minimal design.",
    category: "Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    ...getPrice(1800, 3000),
  },
  {
    title: "Digital Sports Watch",
    description: "Durable and waterproof sports watch.",
    category: "Watches",
    image: "https://images.unsplash.com/photo-1603988363607-e1e4a66962b8",
    ...getPrice(1500, 2500),
  },
  {
    title: "Chronograph Steel Watch",
    description: "Premium steel chronograph watch for men.",
    category: "Watches",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    ...getPrice(3500, 6500),
  },
  {
    title: "Luxury Gold Watch",
    description: "Luxurious golden analog watch.",
    category: "Watches",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    ...getPrice(5000, 8000),
  },

  // ✅ FOOTWEAR
  {
    title: "Running Shoes",
    description: "Lightweight running shoes for all terrain.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1528701800489-20be9c3a5f1b",
    ...getPrice(1500, 2500),
  },
  {
    title: "Leather Formal Shoes",
    description: "Classic formal shoes for office wear.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1600180758890-6b94519a1d3b",
    ...getPrice(2200, 3200),
  },
  {
    title: "Casual Sneakers",
    description: "Everyday sneakers for comfort and fashion.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
    ...getPrice(1200, 2000),
  },
  {
    title: "Flip Flops",
    description: "Comfortable flip flops for summer days.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1596464716121-f9c81d53d0ba",
    ...getPrice(400, 900),
  },
  {
    title: "High Ankle Boots",
    description: "Durable boots suitable for outdoor activities.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1600180758890-6b94519a1d3b",
    ...getPrice(2500, 4000),
  },

  // ✅ ELECTRONICS
  {
    title: "Smartphone X100",
    description: "High-performance smartphone with AMOLED display.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35b6",
    ...getPrice(18000, 25000),
  },
  {
    title: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1580894742926-9f65a77b47b2",
    ...getPrice(2500, 4500),
  },
  {
    title: "Bluetooth Speaker",
    description: "Portable speaker with deep bass.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1585386959984-a41552231693",
    ...getPrice(1500, 3000),
  },
  {
    title: "Smart TV 43 inch",
    description: "4K LED smart TV with voice assistant.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606813902779-7f6a2d8a9c1d",
    ...getPrice(28000, 40000),
  },
  {
    title: "Laptop ProBook",
    description: "Lightweight laptop for productivity.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    ...getPrice(48000, 60000),
  },

  // ✅ BEAUTY & PERSONAL CARE
  {
    title: "Herbal Face Wash",
    description: "Natural ingredients for glowing skin.",
    category: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1589367920960-90d7bcaa0a7a",
    ...getPrice(200, 500),
  },
  {
    title: "Perfume Luxe",
    description: "Long-lasting fragrance for daily use.",
    category: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1612197527762-8d946a6b4d29",
    ...getPrice(800, 1500),
  },
  {
    title: "Hair Dryer Pro",
    description: "Quick-dry hair styling tool.",
    category: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1612817159949-3d22a67c4a90",
    ...getPrice(1000, 2500),
  },
  {
    title: "Makeup Kit",
    description: "All-in-one makeup essentials set.",
    category: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1583249423830-3c38f83d61f7",
    ...getPrice(1200, 2200),
  },
  {
    title: "Body Lotion",
    description: "Hydrating lotion for smooth skin.",
    category: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1600185365483-26d7e8f1d76c",
    ...getPrice(300, 700),
  },
].map(p => ({ ...p, shopkeeperId }));

// Seeder logic
const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await ShopProduct.deleteMany({});
    console.log("🗑️ Old products removed");

    await ShopProduct.insertMany(products);
    console.log(`🎉 ${products.length} products added successfully!`);

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding products:", err.message);
    mongoose.connection.close();
  }
};

seedProducts();
