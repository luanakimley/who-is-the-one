import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function LogIn() {
  const [cookies, setCookie] = useCookies(["userToken"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const logIn = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    navigate("/");
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
      </form>
    </div>
  );
}
