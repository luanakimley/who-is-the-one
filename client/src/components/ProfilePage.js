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
              <div className="top-margin container">

        <div className="container p-6">
          <h1>Hello {cookies.userId}!</h1>
          <h1>H{cookies.email}</h1>

          <h2>Edit your Password:</h2>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
