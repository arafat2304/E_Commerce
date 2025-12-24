import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ShoppingBag, Utensils } from "lucide-react";
import RestaurantCreate from "./RestaurantCreate"; // ✅ new import

export default function ShopkeeperRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    businessType: "shopping",
    phone: "",
    address: "",
  });

  const [shopkeeperId, setShopkeeperId] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/shopkeeper/register",
        form
      );

      toast.success(res.data.message || "Registered successfully!");
      setShopkeeperId(res.data.shopkeeper._id);
      setIsRegistered(true);

      // if shopping, directly navigate to login
      if (form.businessType === "shopping") navigate("/shopkeeper/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  // 🔸 if food selected & registered => show restaurant form
  if (form.businessType === "food" && isRegistered && shopkeeperId) {
    return <RestaurantCreate ownerId={shopkeeperId} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Shopkeeper Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            placeholder="Business Name"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          {/* Business Type */}
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setForm({ ...form, businessType: "shopping" })}
              className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center ${
                form.businessType === "shopping"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-300"
              }`}
            >
              <ShoppingBag
                size={28}
                className={
                  form.businessType === "shopping"
                    ? "text-orange-500"
                    : "text-gray-500"
                }
              />
              <span
                className={`mt-1 font-medium ${
                  form.businessType === "shopping"
                    ? "text-orange-600"
                    : "text-gray-600"
                }`}
              >
                Shopping
              </span>
            </div>

            <div
              onClick={() => setForm({ ...form, businessType: "food" })}
              className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center ${
                form.businessType === "food"
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-300"
              }`}
            >
              <Utensils
                size={28}
                className={
                  form.businessType === "food"
                    ? "text-orange-500"
                    : "text-gray-500"
                }
              />
              <span
                className={`mt-1 font-medium ${
                  form.businessType === "food"
                    ? "text-orange-600"
                    : "text-gray-600"
                }`}
              >
                Food
              </span>
            </div>
          </div>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Business Address"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
