import axios from "axios";
import toast from "react-hot-toast";
import { getUserToken } from "../utils/userAuth";
import { useNavigate } from "react-router-dom";

export const useCart = () => {
  const navigate = useNavigate();

  const addToCart = async (item, type) => {
    const token = getUserToken();

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          itemId: item._id,
          name: item.name || item.title,
          price: item.price || item.newPrice,
          image: item.image,
          type,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to cart");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  return { addToCart };
};
