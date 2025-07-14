// SideBar.js
import React, { useContext } from "react";
import { createPortal } from "react-dom";
import CartItems from "./CartItems";
import { cartContext, useCart } from "../cartContext";

const SideBar = ({ showSideBar, onClose }) => {
  const {items, getTotalItems, getTotalPrice } = useContext(cartContext);

  
    const totalQuantity = getTotalItems();
    const totalPrice = getTotalPrice();


  if (!showSideBar) return null;
  return createPortal(
    <>
      {/* Backdrop - click to close */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Sliding Sidebar */}
      <div className="fixed top-0 right-0 h-full w-80 desktop:w-96  bg-white shadow-lg z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header - fixed at top */}
        <div className="p-4 flex-shrink-0">
          <button onClick={onClose} className="text-xl float-right">
            ×
          </button>
          <h2 className="text-lg font-semibold mb-4">Cart 🛒</h2>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto  h-75 px-4 pb-4">
          {items.map((item) => (
            <CartItems cartItem={item} />
          ))}
        </div>
        <div className="py-5 my-3 px-4 w-full">
          <div className="my-1 bg-indigo-600 text-white py-2 px-2">Total Items: {totalQuantity}</div>
          <div className="my-1 bg-indigo-600 text-white py-2 px-2">Total Price: ${totalPrice}</div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default SideBar;
