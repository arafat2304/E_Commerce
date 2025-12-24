
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import {cloudinary} from "../config/cloudinary.js";
import fs from "fs";

//ADD a review
export const addReview = async (req,res)=>{
     try {
    const { rating, comment } = req.body;

    const uploadedUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadRes = await cloudinary.uploader.upload(file.path, {
          folder: "reviews", // 🔥 separate folder for reviews
          resource_type: "image",
        });
        uploadedUrls.push(uploadRes.secure_url);
        fs.unlinkSync(file.path); // remove temp file
      }
    }

    const review = await Review.create({
      productId: req.params.productId,
      userId: req.user._id,
      name: req.user.full_name,
      rating,
      comment,
      images: uploadedUrls,
    });

    res.status(201).json({ message: "Review added successfully", review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//GET a review
export const getReview = async (req,res) =>{
    try {
    const reviews = await Review.find({ productId: req.params.productId })
      .populate("userId", "name") // show user name if you have relation
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ✏️ UPDATE a review
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { comment, rating } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // only review owner can edit
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this review" });
    }

    review.comment = comment ?? review.comment;
    review.rating = rating ?? review.rating;
    review.updatedAt = new Date();

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🗑️ DELETE a review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // only review owner can delete
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await review.deleteOne();

    // Optional: remove review reference from Product
    await Product.findByIdAndUpdate(review.productId, {
      $pull: { reviews: review._id },
    });

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
