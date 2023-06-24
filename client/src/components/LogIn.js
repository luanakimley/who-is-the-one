import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";

export default function LogIn() {
  const [cookies, setCookie] = useCookies(["userId"]);
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
      <h1>Log In</h1>
      <form>
        <label>Email</label>
        <input type="email" onChange={handleEmailChange} />
        <label>Password</label>
        <input type="password" onChange={handlePasswordChange} />
        <button onClick={logIn}>Log In</button>
        <Link to="/register">I don't have an account</Link>
      </form>
    </div>
  );
}
