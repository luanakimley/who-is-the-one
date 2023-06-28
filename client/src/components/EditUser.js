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
    // Handle user edit logic here
    if (newUsername === "") {
      return;
    }

    if (newEmail === "") {
      return;
    }

    let formData = new FormData();
          formData.append("email", newEmail);
          formData.append("username", newUsername);
          formData.append("userId", cookies.userId);

      axios.put(`${SERVER_HOST}/edit_username_email`, formData, {
          headers: { "Content-Type": "application/json" },
        })

       setCookie("username", newUsername);
       setCookie("email", newEmail);



    navigate("/profile_page");
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div>
          <h1 className="text-center mb-4">
            Edit User&nbsp;<i className="bi bi-pencil-square"></i>
          </h1>
          <form onSubmit={handleSubmit}>
            <UserInputField
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={newUsername}
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
              value={newEmail}
              onChange={handleEmailChange}
              label="Email"
              required
            />
          <button type="submit" className="btn btn-primary w-100 mt-2" onClick={handleEditPassword}>
              Edit Password
            </button>
            <button type="submit" className="btn btn-primary w-100 mt-2" onClick={handleSubmit}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
