import React, { useState } from "react";
import { SERVER_HOST } from "../config/global_constants";
import { Link, useNavigate } from "react-router-dom";
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
    <div>
    <div class="container">
      <h1>Register</h1>
      <form>
        <div class="mb-3">

                 <label class="form-label">Username</label>
                <input class="form-control" type="email" onChange={handleUsernameChange} />
        </div>

        <div class="mb-3">
                         <label class="form-label">Email Address</label>
                        <input class="form-control" type="email" onChange={handleEmailChange} />
                        </div>
        <div class="mb-3">

                         <label class="form-label">Password</label>
                        <input class="form-control" type="password" onChange={handlePasswordChange} />
                        </div>
        <button class="btn btn-primary" onClick={registerUser}>Register</button>
        <div>
        <Link to="/login">I have an account</Link>
        </div>
      </form>
          </div>

      <Footer/>
    </div>
  );
}
