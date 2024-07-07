import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="w-full bg-foreground py-8 mx-auto">
      <div className="flex w-full items-center justify-center">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
