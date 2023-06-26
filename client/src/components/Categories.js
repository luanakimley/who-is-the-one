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
    axios
      .delete(`${SERVER_HOST}/remove_category/${e.target.id}`)
      .then((res) => {})
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="p-4 mb-2 bg-primary text-black">
        <div className="container">
          <h1>Categories</h1>

          <div className="row">
            {categories.length
              ? categories.map((category) => (
                  <div className="col col-lg-3 p-4">
                    <div className="card">
                      <div className="card-body">
                        <div
                          key={category.category_id}
                          id={category.category_id}
                          onClick={navigateToAddCandidatesForCategory}
                        >
                          <h3>{category.category_name}</h3>
                        </div>
                        <button
                          className="btn btn-danger position-absolute top-0 end-0"
                          key={category.category_name}
                          id={category.category_id}
                          onClick={deleteCategory}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : null}
            <button
              class="btn btn-light col col-lg-3 p-4 float-right"
              onClick={navigateToAddCategory}
            >
              <i className="bi bi-plus-circle"></i>
              Add
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
