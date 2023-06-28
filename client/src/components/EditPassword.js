import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import PasswordInput from "./UserInputField";

export default function EditPassword() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    e.preventDefault();
        // Handle password change logic here
        if (currentPassword === "")
        {
          return;
        }

        if (newPassword === "")
        {
          return;
        }

        if (confirmNewPassword === "")
        {
          return;
        }

        if (newPassword !== confirmNewPassword)
        {
          return;
        }
  };

return (
  <div>
    <NavBar />
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div>
        <h1 className="text-center mb-4">
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
            autoFocus
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
          <button type="submit" className="btn btn-primary w-100 mt-2">
            Save
          </button>
        </form>
      </div>
    </div>
  </div>
);

}
