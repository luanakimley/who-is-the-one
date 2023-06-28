import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";

import { useState } from "react";

export default function EditUser() {
  const [cookies] = useCookies(["userId", "username", "email"]);
  const navigate = useNavigate();

  const handleEditUser = () => {
    navigate("/edit_user");
  };

  const handleChangePassword = () => {
    navigate("/edit_password");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <NavBar />
      <div className="card px-5 rounded-box">
        <div className="container mt-5">
          <h1 className="text-center text-primary mb-5">Profile</h1>
          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item">
              <strong>Username:</strong> {cookies.username}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {cookies.email}
            </li>
          </ul>
        </div>

        <div className="text-center my-4">
          <button className="btn btn-success" onClick={handleEditUser}>
            <i className="bi bi-pencil-square"></i> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
