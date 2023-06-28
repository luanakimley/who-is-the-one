import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { SERVER_HOST } from "../config/global_constants";
import UserInputField from "./UserInputField";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function EditUser() {
  const [cookies, setCookie] = useCookies(["userId", "username", "email"]);
  const [newUsername, setUsername] = useState("");
  const [newEmail, setEmail] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEditPassword = (e) => {
    navigate("/edit_password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    if (newEmail !== "") {
      formData.append("email", newEmail);
      setCookie("email", newEmail);
    } else {
      formData.append("email", cookies.email);
    }

    if (newUsername !== "") {
      formData.append("username", newUsername);
      setCookie("username", newUsername);
    } else {
      formData.append("username", cookies.username);
    }
    formData.append("userId", cookies.userId);

    axios.put(`${SERVER_HOST}/edit_username_email`, formData, {
      headers: { "Content-Type": "application/json" },
    });

    navigate("/profile_page");
  };

  const backToProfile = () => {
    navigate("/profile_page");
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="bg-white p-5 rounded-box">
          <h1 className="text-center mb-5 text-primary">
            <button className="btn btn-primary" onClick={backToProfile}>
              <i className="bi bi-arrow-return-left"></i>
            </button>
            &nbsp;Edit User
          </h1>
          <form>
            <UserInputField
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={cookies.username}
              onChange={handleUsernameChange}
              label="Username"
              required
              autoFocus
            />
            <UserInputField
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={cookies.email}
              onChange={handleEmailChange}
              label="Email"
              required
            />
            <button
              className="btn btn-primary w-100 mt-4"
              onClick={handleEditPassword}
            >
              Edit Password
            </button>
            <button
              className="btn btn-primary w-100 mt-2"
              onClick={handleSubmit}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
