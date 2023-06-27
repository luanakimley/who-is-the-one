import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function EditPassword() {
  const [cookies] = useCookies(["userId"]);
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />

      <div className="p-3 mb-2 bg-primary text-white">
        <div className="container">
          <h1>Edit your Password</h1>
          <h2>Enter your Existing Password</h2>
          <h2>Enter your New Password</h2>
          <h2>Repeat your New Password</h2>
        </div>
      </div>
      <Footer />
    </div>
  );
}
