import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, Pencil, Trash2, X } from "lucide-react";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({ rating: 0, comment: "" });

  const token = localStorage.getItem("authToken");

  // ✅ Verify user from token
  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (!token) return;
        const res = await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("User verification failed:", err);
      }
    };
    verifyUser();
  }, [token]);

  // ✅ Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/review/${productId}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchReviews();
  }, [productId]);

  // 🗑️ Delete Review
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/review/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((r) => r._id !== reviewId));
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review");
    }
  };

  // ✏️ Open edit modal
  const handleEdit = (review) => {
    setEditingReview(review);
    setEditForm({ rating: review.rating, comment: review.comment });
  };

  // ⭐ Handle rating click
  const handleRatingChange = (rating) => {
    setEditForm((prev) => ({ ...prev, rating }));
  };

  // 💬 Handle comment change
  const handleCommentChange = (e) => {
    setEditForm((prev) => ({ ...prev, comment: e.target.value }));
  };

  // 💾 Submit updated review
  const handleUpdateReview = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/review/${editingReview._id}`,
        {
          comment: editForm.comment,
          rating: editForm.rating,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refresh reviews
      const res = await axios.get(`http://localhost:5000/api/review/${productId}`);
      setReviews(res.data);
      setEditingReview(null);
    } catch (err) {
      console.error("Error updating review:", err);
      alert("Failed to update review");
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (reviews.length === 0) return <p className="text-gray-500 mt-3">No reviews yet.</p>;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

      <div className="space-y-6">
        {reviews.map((r) => (
          <div key={r._id} className="border border-gray-200 rounded-lg p-4 shadow-sm relative">
            {/* ⭐ Name + Rating */}
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{r.name || r.userId?.name || "Anonymous"}</h4>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < r.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 💬 Comment */}
            <p className="text-gray-700">{r.comment}</p>

            {/* 🖼️ Images */}
            {r.images && r.images.length > 0 && (
              <div className="flex gap-3 mt-3">
                {r.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="review"
                    className="w-20 h-20 object-cover rounded-md cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            )}

            {/* 📅 Date */}
            <p className="text-xs text-gray-500 mt-2">
              {new Date(r.createdAt).toLocaleDateString()}
            </p>

            {/* 🧑‍💻 Edit/Delete for review owner */}
            {user && r.userId?._id === user._id && (
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleEdit(r)}
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(r._id)}
                  className="flex items-center gap-1 text-red-600 hover:underline"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 🪟 Image Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="enlarged review"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg border border-white"
          />
        </div>
      )}

      {/* ✏️ Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setEditingReview(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Edit Your Review</h2>

            {/* ⭐ Rating */}
            <div className="flex mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  onClick={() => handleRatingChange(star)}
                  className={`cursor-pointer ${
                    star <= editForm.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* 💬 Comment */}
            <textarea
              name="comment"
              value={editForm.comment}
              onChange={handleCommentChange}
              className="w-full border rounded p-2 mb-4"
              rows="4"
              placeholder="Update your review..."
            />

            {/* ✅ Save Changes */}
            <button
              onClick={handleUpdateReview}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
