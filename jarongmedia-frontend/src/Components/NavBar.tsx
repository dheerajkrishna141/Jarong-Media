import React from "react";
import { ColorModeButton } from "./UI/color-mode";

const NavBar = () => {
  return (
    <div>
      <div className="flex justify-end">
        <ColorModeButton></ColorModeButton>
      </div>
    </div>
  );
};

export default NavBar;
