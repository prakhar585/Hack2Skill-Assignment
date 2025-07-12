// SideBar.js
import React from "react";
import { createPortal } from 'react-dom';

const SideBar = ({ showSideBar, onClose }) => {
  if (!showSideBar) return null;

  return createPortal(
    <>
      {/* Backdrop - click to close */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sliding Sidebar */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300">
        <div className="p-4">
          <button onClick={onClose} className="text-xl float-right">×</button>
          <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
          <p>Empty sidebar content - we'll add cart data later</p>
        </div>
      </div>
    </>,
    document.body
  );
};

export default SideBar;