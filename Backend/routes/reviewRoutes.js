import express from "express";
import multer from "multer";
import {addReview,getReview,deleteReview,updateReview} from "../controllers/reviewController.js"
import {verifyToken} from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });


router.post("/review/:productId", verifyToken, upload.array("images", 2),addReview);// ➕ Add Review with up to 2 images
router.get("/:productId",getReview);// 🧾 Get all reviews for a product
router.put("/:reviewId", verifyToken, updateReview);  // ✏️ update
router.delete("/:reviewId", verifyToken, deleteReview); // 🗑️ delete

export default router;