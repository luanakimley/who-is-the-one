import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";
import Navbar from "./NavBar";
import Footer from "./Footer";

export default function LogIn() {
  const [cookies, setCookie] = useCookies(["userId", "email", "username"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const logIn = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post(`${SERVER_HOST}/login`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setCookie("userId", res.data[0].user_id);
        setCookie("username", res.data[0].user_name);
        setCookie("email", res.data[0].email);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging in user:", error);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <div className="container-sm">
        <h1> WITO </h1>

        <h1>Log In</h1>
        <form>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              className="form-control"
              type="email"
              onChange={handleEmailChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              onChange={handlePasswordChange}
            />
          </div>
          <button className="btn btn-primary" onClick={logIn}>
            Log In
          </button>

          <div className="mb-3">
            <Link to="/register">I don't have an account</Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
