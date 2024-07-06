import React from "react";
import Menu from "../../Components/Menu";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <Menu></Menu>
      <div className="oulet-container">
        <div className="scroll-handeler">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
