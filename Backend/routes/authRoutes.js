import express from "express";
import { sendOtp, verifyOtp, saveDetails } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/save-details",verifyToken,saveDetails);


export default router;
