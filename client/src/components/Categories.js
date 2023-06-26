import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import NavBar from "./NavBar";
import Footer from "./Footer";
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
    setCategories(categories.data[0]);
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

  const deleteCategory = (e) => {
    const category = {
      id: e.target.id,
      name: e.target.innerHTML,
    };
    navigate("/delete_category", { state: category });
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1>Categories</h1>
        <ul>
          {categories.length
            ? categories.map((category) => (
                <div key={category.category_id}>
                  <li
                    key={category.category_id}
                    id={category.category_id}
                    onClick={navigateToAddCandidatesForCategory}
                  >
                    {category.category_name}
                  </li>
                  <button
                    className="btn btn-danger"
                    key={category.category_name}
                    id={category.category_id}
                    onClick={deleteCategory}
                  >
                    X
                  </button>
                </div>
              ))
            : null}
        </ul>

        <button className="btn btn-primary" onClick={navigateToAddCategory}>
          Add category
        </button>
      </div>
      <Footer />
    </div>
  );
}
