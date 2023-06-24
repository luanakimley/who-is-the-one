import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function Home() {
  const [cookies] = useCookies(["userId"]);
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/logout");
  };

  return (
    <div>
      <NavBar />
      <h1>Home</h1>
      <h2>Hello {cookies.userId}!</h2>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
}
