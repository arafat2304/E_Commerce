import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartItems } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-screen-lg mx-auto px-6 py-6">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link to="/" className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cartItems.map((item, i) => (
              <div key={i} className="flex gap-4 border rounded-lg p-3 bg-white shadow-sm">
                <img src={item.img} alt={item.title} className="w-20 h-20 object-contain" />
                <div className="flex-1">
                  <h2 className="text-base font-medium">{item.title}</h2>
                  <p className="text-orange-600 font-semibold text-lg">₹{item.price}</p>
                </div>
                <button className="text-sm text-red-500 hover:underline">Remove</button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <p className="text-lg font-semibold">
              Total: <span className="text-orange-600">₹{total.toLocaleString()}</span>
            </p>
            <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
