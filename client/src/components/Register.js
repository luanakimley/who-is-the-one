import React, { useState } from "react";
import { SERVER_HOST } from "../config/global_constants";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo_WITO_white.png";

import Footer from "./Footer";

import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post(`${SERVER_HOST}/register`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="vh-100 p-4 mb-2 bg-primary">
      <div className="d-flex align-items-center w-100 h-100">
        <div className="w-50 m-5">
          <div className="bg-white p-5 rounded-box mt-4">
            <h1 className="text-primary text-center mb-4">Welcome</h1>
            <div className="form-floating">
              <input
                className="form-control rounded-pill mb-3"
                type="text"
                onChange={handleUsernameChange}
                placeholder="Username"
                id="username"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating">
              <input
                className="form-control rounded-pill mb-3"
                type="email"
                onChange={handleEmailChange}
                placeholder="E-mail"
                id="email"
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="form-floating">
              <input
                className="form-control rounded-pill mb-4"
                type="password"
                onChange={handlePasswordChange}
                placeholder="Password"
                id="password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="mb-3 text-center">
              <Link className="text-secondary" to="/login">
                I have an account
              </Link>
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary w-50 mt-4"
                onClick={registerUser}
              >
                Register
              </button>
            </div>
          </div>
        </div>
        <div className="w-50 m-5 align-self-center text-center">
          <img width={370} src={logo} alt="WITO Logo" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
