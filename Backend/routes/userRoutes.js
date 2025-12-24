import express from "express";
import { me } from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/me",verifyToken,me);


export default router;