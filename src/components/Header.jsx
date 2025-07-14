import React, { useContext } from "react";
import Navbar from "./Navbar";
import userAvatar from "../asstes/male.png";
import dashboardLogo from "../asstes/dashboard.png";
import { cartContext } from "../cartContext";

const Header = ({ openSideBar, handleSearchChange }) => {
  const { getTotalItems } = useContext(cartContext);
  const totalItems = getTotalItems();
  return (
    <div className="border-b-2 h-16 flex justify-between items-center">
      {/* <h3>Product Dashboard</h3> */}
      <img className="h-10 w-10" src={dashboardLogo} alt="dashboard logo" />

      <input
        className="w-1/3 tablet:w-1/2 px-2 py-1  border-2 border-gray-200 rounded-lg"
        type="text"
        placeholder="Search..."
        onChange={(e)=>handleSearchChange(e)}
      />
      <div className="flex gap-4">
        <button onClick={openSideBar}>Cart 🛒({totalItems})</button>
        <img className="rounded-lg h-10 w-10" src={userAvatar} alt="Avatar" />
      </div>
    </div>
  );
};

export default Header;
