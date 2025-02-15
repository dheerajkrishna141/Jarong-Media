import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import { ColorModeButton } from "./Components/UI/color-mode";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  );
}

export default App;
