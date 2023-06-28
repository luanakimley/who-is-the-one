import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { SERVER_HOST } from "../config/global_constants";
import logo from "../assets/logo_WITO_white.png";

import axios from "axios";

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
    <div className="vh-100 p-4 mb-2 bg-primary">
      <div className="d-flex align-items-center w-100 h-100">
        <div className="w-50 m-5">
          <div className="bg-white p-5 rounded-box mt-4">
            <h1 className="text-primary text-center mb-4">Welcome</h1>
            <div className="form-floating">
              <input
                id="email"
                className="form-control rounded-pill mb-3"
                type="email"
                onChange={handleEmailChange}
                placeholder="E-mail"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating">
              <input
                id="password"
                className="form-control rounded-pill mb-4"
                type="password"
                onChange={handlePasswordChange}
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="mb-3 text-center">
              <Link className="text-secondary" to="/register">
                I don't have an account
              </Link>
            </div>
            <div className="text-center">
              <button className="btn btn-primary w-50 mt-4" onClick={logIn}>
                Log In
              </button>
            </div>
          </div>
        </div>
        <div className="w-50 m-5 align-self-center text-center">
          <img width={370} src={logo} alt="WITO Logo" />
        </div>
      </div>
    </div>
  );
}
