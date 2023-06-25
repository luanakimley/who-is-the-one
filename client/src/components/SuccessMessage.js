import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { useCookies } from "react-cookie";

export default function SuccessMessage() {

  return (
    <div>
      <NavBar />
      <h1>Successfully Created</h1>
      <h2>Return to Home</h2>
    </div>
  );
}
