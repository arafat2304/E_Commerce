import React, { useState } from "react";
import { Star, ImagePlus } from "lucide-react";

export default function AddReview({ productId, onReviewAdded }) {
  console.log(productId)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 2) return alert("You can upload a maximum of 2 images");
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please login to add a review.");
    if (!rating || !comment.trim()) return alert("Please add rating & comment.");

    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    images.forEach((img) => formData.append("images", img));

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/review/review/${productId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        onReviewAdded(data.review);
        setRating(0);
        setComment("");
        setImages([]);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3 max-w-md">
      <h4 className="text-lg font-semibold mb-2">Write a Review</h4>

      {/* ⭐ Rating */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={24}
            onClick={() => setRating(i + 1)}
            className={`cursor-pointer ${
              i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* 📝 Comment */}
      <textarea
        placeholder="Share your experience..."
        rows="3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* 🖼️ Image Upload */}
      <div>
        <label className="flex items-center gap-2 text-orange-600 cursor-pointer">
          <ImagePlus size={20} /> Upload up to 2 images
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleImageChange}
          />
        </label>
        {images.length > 0 && (
          <div className="mt-2 flex gap-3">
            {Array.from(images).map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-16 h-16 object-cover rounded-md border"
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg font-medium"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
