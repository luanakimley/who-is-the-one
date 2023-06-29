import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import logo from "../assets/logo_WITO_white.png";

export default function Home() {
  const [cookies] = useCookies(["username"]);
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />

      <div className="p-3 mb-2 bg-primary text-white">
        <div className="top-margin container">
          <img src={logo} alt="WITO Logo" width="400"></img>
          <div className="card">Test</div>
        </div>
      </div>
    </div>
  );
}
