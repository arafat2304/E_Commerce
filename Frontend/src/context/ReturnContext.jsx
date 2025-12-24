import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";   // <-- import Cart context
import toast from "react-hot-toast";

const ReturnContext = createContext();
export const useReturn = () => useContext(ReturnContext);

export function ReturnProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [actionType, setActionType] = useState(null); // "add" | "buy"
  const [selectedReturn, setSelectedReturn] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useCart();   // <-- use your actual addToCart()

  // STEP 1: open popup globally
  const openReturnModal = (productData, type) => {
    setProduct(productData);
    setActionType(type);
    setSelectedReturn(null);
    setIsOpen(true);
  };

  // STEP 2: user selects YES / NO
  const chooseReturnOption = (value) => {
    setSelectedReturn(value);
  };

  // STEP 3: final action → add to cart OR buy now
  const finishAction = () => {
    if (!selectedReturn) return toast.error("Please choose one!");

    const basePrice = product.newPrice;
    const finalPrice =
      selectedReturn === "YES" ? basePrice + 15 : basePrice;

    // Build the item object SAME as your backend expects
    const cartItem = {
      ...product,
      finalPrice,          // updated price
      returnType: selectedReturn,
      type: "product",     // because you have food/product split
    };

    if (actionType === "add") {
      addToCart(cartItem);  // <-- use your existing function
      toast.success("Added to cart!");
    }

    if (actionType === "buy") {
      navigate(`/buynow/${product._id}`, {
        state: {
          ...product,
          finalPrice,
          returnType: selectedReturn,
        },
      });
    }

    // close modal
    setIsOpen(false);
  };

  return (
    <ReturnContext.Provider
      value={{
        isOpen,
        product,
        selectedReturn,
        openReturnModal,
        chooseReturnOption,
        finishAction,
      }}
    >
      {children}
    </ReturnContext.Provider>
  );
}
