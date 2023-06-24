import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [cookies] = useCookies(["userId"]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  });

  async function getCategories() {
    const categories = await axios.get(
      `${SERVER_HOST}/categories/${cookies.userId}`
    );
    setCategories(categories.data);
  }

  const navigateToAddCategory = () => {
    navigate("/add_category");
  };

  const navigateToAddCandidatesForCategory = (e) => {
    const category = {
      id: e.target.id,
      name: e.target.innerHTML,
    };
    navigate("/add_candidates", { state: category });
  };

  return (
    <div>
      <NavBar />
      <h1>Categories</h1>
      <ul>
        {categories.length
          ? categories.map((category) => (
              <li
                key={category.category_id}
                id={category.category_id}
                onClick={navigateToAddCandidatesForCategory}
              >
                {category.category_name}
              </li>
            ))
          : null}
      </ul>
      <button onClick={navigateToAddCategory}>Add category</button>
    </div>
  );
}
