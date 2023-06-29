import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { SERVER_HOST } from "../config/global_constants";
import UserInputField from "./UserInputField";
import { useCookies } from "react-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import BackButtonTitle from "./BackButtonTitle";

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
    if (newEmail !== "" && newUsername === "") {
      formData.append("email", newEmail);
      setCookie("email", newEmail);
    } else if (newUsername !== "" && newEmail === "") {
      formData.append("username", newUsername);
      setCookie("username", newUsername);
    } else if (newEmail !== "" && newUsername !== "") {
      formData.append("email", newEmail);
      setCookie("email", newEmail);
      formData.append("username", newUsername);
      setCookie("username", newUsername);
    }

    formData.append("userId", cookies.userId);

    axios
      .put(`${SERVER_HOST}/edit_username_email`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (newUsername !== "" && newEmail === "") {
          Swal.fire({
            icon: "success",
            title: "Username changed successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (newEmail !== "" && newUsername === "") {
          Swal.fire({
            icon: "success",
            title: "E-mail changed successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (newEmail !== "" && newUsername !== "") {
          Swal.fire({
            icon: "success",
            title: "Username and email changed successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
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
        <BackButtonTitle params = {{href: "/profile_page", text: "Edit User"}}/>
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
