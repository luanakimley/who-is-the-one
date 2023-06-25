import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [cookies] = useCookies(["userId"]);
  const navigate = useNavigate();

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const addCategory = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("userId", cookies.userId);

    axios
      .post(`${SERVER_HOST}/insert_category`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const categoryId = res.data[0].category_id;
        const category = {
          id: categoryId,
          name: categoryName,
        };
        navigate("/add_candidates", { state: category });
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  return (
    <div>
          <NavBar />
          <div class="container">
      <h1>Add Category</h1>
      <form>
        <input
          type="text"
          placeholder="Category name"
          onChange={handleCategoryNameChange}
        />
        <button onClick={addCategory}>Done</button>
      </form>
    </div>
    </div>

  );
}
