import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import cartRoute from  "./routes/cartRoutes.js"
import shopkeeperRoutes from "./routes/shopkeeperRoutes.js";
import shopProductRoutes from "./routes/shopProductRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import shopOrderRoutes from "./routes/shopOrderRoutes.js";
import foodOrderRoutes from "./routes/foodOrderRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import RestaurantRoutes from "./routes/restaurantRoutes.js"
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user",userRoute);
app.use("/api/cart",cartRoute);
app.use("/api/shopkeeper", shopkeeperRoutes);
app.use("/api/shopproduct", shopProductRoutes);
app.use("/api/review",reviewRoutes)
app.use("/api/shoporder", shopOrderRoutes);
app.use("/api/food/orders", foodOrderRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/restaurant",RestaurantRoutes);
app.use("/api/cart", cartRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
