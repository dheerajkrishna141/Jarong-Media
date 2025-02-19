import { Outlet } from "react-router-dom";
import "./App.css";
import { Toaster } from "./Components/UI/toaster";

function App() {
  return (
    <>
      <Toaster />
      <Outlet></Outlet>
    </>
  );
}

export default App;
