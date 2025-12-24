import React from "react";
import useUser from "../hooks/useUser";

export default function Account() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-gray-500 text-lg">Loading your details...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <p className="text-gray-600 text-lg mb-4">You are not logged in.</p>
        <a
          href="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Your Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-gray-700">Name</h2>
          <p className="mt-1 text-gray-900">{user.full_name}</p>
        </div>

        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-gray-700">Phone</h2>
          <p className="mt-1 text-gray-900">{user.phone}</p>
        </div>

        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-gray-700">Email</h2>
          <p className="mt-1 text-gray-900">{user.email || "Not provided"}</p>
        </div>

        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-gray-700">Joined</h2>
          <p className="mt-1 text-gray-900">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Edit Details
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("authToken");
            window.location.reload();
          }}
          className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
