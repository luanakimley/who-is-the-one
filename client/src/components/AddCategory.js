import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const [cookies] = useCookies(["userId"]);
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const addCategory = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("categoryName", category);
    formData.append("userId", cookies.userId);

    axios
      .post(`${SERVER_HOST}/insert_category`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        navigate("/add_candidates", { state: category });
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  return (
    <div>
      <NavBar />
      <h1>Add Category</h1>
      <form>
        <input
          type="text"
          placeholder="Category name"
          onChange={handleCategoryChange}
        />
        <button onClick={addCategory}>Done</button>
      </form>
    </div>
  );
}
