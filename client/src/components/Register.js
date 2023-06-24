import React, { useState } from "react";
import { SERVER_HOST } from "../config/global_constants";
import { Link, useNavigate } from "react-router-dom";

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
    <div>
      <h1>Register</h1>
      <form>
        <label>Username</label>
        <input type="text" onChange={handleUsernameChange} />

        <label>Email</label>
        <input type="email" onChange={handleEmailChange} />

        <label>Password</label>
        <input type="password" onChange={handlePasswordChange} />

        <button onClick={registerUser}>Register</button>

        <Link to="/login">I have an account</Link>
      </form>
    </div>
  );
}
