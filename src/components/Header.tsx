import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="w-full bg-foreground dark:bg-foreground h-[4.5rem] mx-auto rounded-b-xl">
      <Navbar />
    </header>
  );
};

export default Header;
