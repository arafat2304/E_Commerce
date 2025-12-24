import React from "react";
import { useReturn } from "../context/ReturnContext";

export default function ReturnModal() {
  const { isOpen, product, selectedReturn, chooseReturnOption, finishAction } =
    useReturn();

  if (!isOpen || !product) return null;

  const basePrice = product.newPrice || 0;
  const easyReturnPrice = basePrice + 15;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-end pb-6 z-[9999]">
      <div className="bg-white w-full rounded-t-2xl p-6 shadow-xl animate-slideUp">

        <h2 className="text-xl font-bold mb-2">Return Preference</h2>

        <p className="text-sm text-gray-600 mb-4">
          Actual Product Price:{" "}
          <span className="font-semibold text-black">₹{basePrice}</span>
        </p>

        <div className="flex gap-4">
          
          {/* YES OPTION */}
          <div
            onClick={() => chooseReturnOption("YES")}
            className={`
              flex-1 p-4 rounded-xl cursor-pointer relative border transition-all
              ${
                selectedReturn === "YES"
                  ? "border-purple-600 shadow-md bg-purple-50"
                  : "border-gray-300 bg-white"
              }
            `}
          >
            {/* Recommended Badge */}
            <div className="absolute -top-2 left-3 bg-purple-600 text-white text-[10px] px-2 py-1 rounded-full shadow">
              Recommended
            </div>

            <span className="font-semibold text-purple-700 text-sm">YES</span>
            <p className="text-xs text-gray-600 leading-tight">
              Easy Returns Available
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              ₹{easyReturnPrice}
            </p>

            {/* +15 badge */}
            <div className="text-[11px] mt-1 text-purple-700 font-medium bg-purple-100 inline-block px-2 py-[2px] rounded-md">
              + ₹15 Return Protection
            </div>

            {selectedReturn === "YES" && (
              <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full shadow">
                Selected
              </div>
            )}
          </div>

          {/* NO OPTION */}
          <div
            onClick={() => chooseReturnOption("NO")}
            className={`
              flex-1 p-4 rounded-xl cursor-pointer relative border transition-all
              ${
                selectedReturn === "NO"
                  ? "border-green-600 shadow-md bg-green-50"
                  : "border-gray-300 bg-white"
              }
            `}
          >
            <span className="font-semibold text-green-700 text-sm">NO</span>
            <p className="text-xs text-gray-600 leading-tight">
              Only Defect/Damage Returns
            </p>

            <p className="mt-2 text-2xl font-bold text-green-700">
              ₹{basePrice}
            </p>

            {/* Save 15 */}
            <div className="text-[11px] mt-1 bg-green-100 text-green-800 px-2 py-[2px] rounded-md inline-block">
              Save ₹15
            </div>

            {selectedReturn === "NO" && (
              <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow">
                Selected
              </div>
            )}
          </div>

        </div>

        <button
          onClick={finishAction}
          disabled={!selectedReturn}
          className={`
            w-full mt-6 py-3 rounded-xl text-lg font-semibold transition 
            ${
              selectedReturn
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-300 text-gray-600"
            }
          `}
        >
          Continue
        </button>
      </div>

      {/* Smooth Slide-Up Animation */}
      <style>{`
        .animate-slideUp {
          animation: slideUp 0.25s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
