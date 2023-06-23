import React, { useState } from "react";
import { SERVER_HOST } from "../config/global_constants";
import { Navigate } from "react-router-dom";

import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);

  let registerUser = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post(`${SERVER_HOST}/register_user`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setNavigate(true);
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });

    setNavigate(true);
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
      {navigate ? <Navigate to="/" /> : null}
      <h1>Register</h1>
      <form>
        <label>Username</label>
        <input type="text" onChange={handleUsernameChange} />

        <label>Email</label>
        <input type="text" onChange={handleEmailChange} />

        <label>Password</label>
        <input type="password" onChange={handlePasswordChange} />

        <button onClick={registerUser}>Register</button>
      </form>
    </div>
  );
}
