import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [cookies] = useCookies(["userId"]);
  const [category, setCategory] = useState({});
  const navigate = useNavigate();

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const backToCategories = (e) => {
    navigate("/categories", { state: category });
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
        if (res.data) {
          const category = {
            id: res.data[0].category_id,
            name: res.data[0].category_name,
          };
          setCategory(category);
          navigate("/add_candidates", { state: category });
        }
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="bg-primary vh-100 d-flex align-items-center justify-content-center">
        <div className="bg-white p-5 rounded-box">
          <h1 className="text-primary mb-5">
            <button className="btn btn-primary" onClick={backToCategories}>
              <i className="bi bi-arrow-return-left"></i>
            </button>
            &ensp; Add Category
          </h1>
          <div className="form-floating">
            <input
              type="text"
              id="category"
              placeholder="Category name"
              onChange={handleCategoryNameChange}
              className="form-control rounded-pill w-100 mb-3"
            />
            <label htmlFor="category">Category name</label>
          </div>
          <button
            className="btn btn-primary mt-4 w-25"
            disabled={categoryName.length === 0}
            onClick={addCategory}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
