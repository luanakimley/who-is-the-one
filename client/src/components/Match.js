import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Candidate from "./Candidate";

export default function Match() {
  const [cookies] = useCookies(["userId"]);
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />

      <div className="vh-100 p-4 mb-2 bg-primary text-white">
              <div className="top-margin container">
              <div className="container">
          <h1>Your Matches!</h1>
          <h2>Hello {cookies.userId}!, based on your preferences, we recommend the following: </h2>


        <div className="vh-100 p-4 mb-2 bg-primary">
                <div className="top-margin container">
                  <h1 className="text-white text-center mb-5">Candidates</h1>
                  <div className="row">
        <Candidate/>
        <Candidate/>
        <Candidate/>
        <Candidate/>
</div>
</div>
</div>







        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
