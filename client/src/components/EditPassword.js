import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import PasswordInput from "./UserInputField";
import axios from "axios";
import { useCookies } from "react-cookie";
import { SERVER_HOST } from "../config/global_constants";

export default function EditPassword() {
  const [cookies] = useCookies(["userId"]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentPasswordErr = "";
    let newPasswordErr = "";
    let confirmNewPasswordErr = "";

    const passwordInDatabase = await axios.get(
      `${SERVER_HOST}/password/${cookies.userId}`
    );

    // Handle password change logic here
    if (currentPassword === "")
    {
      currentPasswordErr = "Current password is required!";
    }

    if (currentPassword !== passwordInDatabase.data[0].user_password)
    {
      currentPasswordErr = "Current password is incorrect!";
    }

    if (newPassword === "")
    {
      newPasswordErr = "New password is required!";
    }

    if (confirmNewPassword === "")
    {
      confirmNewPasswordErr = "Confirm new password is required!";
    }

    if (newPassword !== confirmNewPassword)
    {
      confirmNewPasswordErr ="Confirm new password does not match!";
    }

    if (currentPasswordErr != "" || newPasswordErr != "" || confirmNewPasswordErr != "")
    {
        console.log("Error")
    }
    else
    {
        let formData = new FormData();
              formData.append("userId", cookies.userId);
              formData.append("password", confirmNewPassword);

          axios.put(`${SERVER_HOST}/edit_password`, formData, {
              headers: { "Content-Type": "application/json" },
            })

        navigate("/edit_user");
    }

  };

return (
  <div>
    <NavBar />
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div>
        <h1 className="user-text-heading text-center mb-4">
          Edit Password&nbsp;<i className="bi bi-pencil-square"></i>
        </h1>
        <form onSubmit={handleSubmit}>
          <PasswordInput
            id="current-password"
            type="password"
            name="current-password"
            placeholder="Current-Password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            label="Current Password"
            required
          />
          <PasswordInput
            id="new-password"
            type="password"
            name="new-password"
            placeholder="New-Password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            label="New Password"
            required
          />
          <PasswordInput
            id="confirm-new-password"
            type="password"
            name="confirm-new-password"
            placeholder="Confirm-New-Password"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            label="Confirm New Password"
            required
          />
          <button type="submit" className="user-button btn btn-primary w-100 mt-2">
            Save
          </button>
        </form>
      </div>
    </div>
  </div>
);

}
