import React from "react";
import Navbar from "./Navbar";

const Header = ({ openSideBar }) => {
  return (
    <div className="border-4 flex justify-between">
      <Navbar />

      <input className="w-1/4" type="text" placeholder="Search" />
      <div className="flex gap-1">
        <img className="rounded-full h" src="" alt="Avatar" />
      <button onClick={openSideBar}>Cart</button>
      </div>
    </div>
  );
};

export default Header;
