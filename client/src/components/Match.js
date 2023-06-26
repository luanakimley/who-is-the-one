import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Match() {
  const [cookies] = useCookies(["userId"]);
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />

      <div className="p-3 mb-2 bg-primary text-white">
        <div className="container">
          <h1>Your Matches!</h1>
          <h2>Hello {cookies.userId}!, based on your preferences, we recommend the following: </h2>










        </div>
      </div>
      <Footer />
    </div>
  );
}
