import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function Home() {
  const [cookies] = useCookies(["username"]);
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />

      <div className="p-3 mb-2 bg-primary text-white">
        <div className="container">
          <h1>Home</h1>
          <h2>Hello {cookies.username}!</h2>
        </div>
      </div>
    </div>
  );
}
