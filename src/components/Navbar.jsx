import React, { useState } from "react";
import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
//   const [isMenuOpen setIsMenuOpen] = useState(false);

  return (
    <div className="flex gap-2 text-xs">
      {/* Hamburger menu - visible on mobile (hidden on md and up) */}
      <button className="tablet:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1">
        <div className="w-5 h-0.5 bg-current"></div>
        <div className="w-5 h-0.5 bg-current"></div>
        <div className="w-5 h-0.5 bg-current"></div>
      </button>

      {/* Full navigation - hidden on mobile (visible on md and up) */}
      <div className="hidden tablet:flex gap-2">
        <button>Home</button>
        <button>About</button>
      </div>

      
    
      {/* Nav Menu for mobile */}
    </div>
  );
};

export default Navbar;
