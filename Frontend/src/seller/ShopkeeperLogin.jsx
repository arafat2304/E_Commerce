import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ShopkeeperLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 🔹 Step 1: Login Request
      const res = await axios.post("http://localhost:5000/api/shopkeeper/login", form);
      const { token, shopkeeper } = res.data;

      // 🔹 Step 2: Save in localStorage
      localStorage.setItem("shopkeeperToken", token);
      localStorage.setItem("shopkeeperId", shopkeeper._id);

      toast.success("Login successful!");
      console.log(shopkeeper)
      // 🔹 Step 3: If food business → check restaurant existence
      if (shopkeeper.businessType === "food") {
        try {
          const restaurantRes = await axios.get(
            `http://localhost:5000/api/restaurant/${shopkeeper._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(restaurantRes.data)
          // ✅ Restaurant found → redirect to dashboard
          if (restaurantRes.status === 200 && restaurantRes.data.message != "Not found") {
            navigate("/restaurant/create");
            return;
          }

          if(restaurantRes.status === 200 && restaurantRes.data){
            navigate("/shopkeeper/home");
          }
        } catch (err) {
          
        }
        return; // stop further navigation
      }

      // 🔹 Step 4: Non-food shopkeeper → go home
      navigate("/shopkeeper/home");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">🔐 Shopkeeper Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/shopkeeper/register")}
            className="text-orange-600 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
