import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Pagination from "./Pagination";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [cookies] = useCookies(["userId"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listLength, setListLength] = useState(0);
  const navigate = useNavigate();
  const limit = 12;

  useEffect(() => {
    async function getCategories() {
      const categories = await axios.get(
        `${SERVER_HOST}/categories/${cookies.userId}?limit=${limit}&page=${currentPage}`
      );
      if (categories.data.length) {
        setCategories(categories.data);
      }
    }
    getCategories();

    async function getCategoriesCount() {
      const count = await axios.get(
        `${SERVER_HOST}/categories_count/${cookies.userId}`
      );
      setListLength(count.data);
    }

    getCategoriesCount();
  }, [currentPage, listLength, cookies.userId]);

  const handleCurrentPage = (data) => {
    setCurrentPage(data);
  };
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
      .then((res) => {
        if ((listLength - 1) % limit === 0) {
          setCurrentPage((listLength - 1) / limit);
        }
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="vh-100 p-4 mb-2 bg-primary">
        <div className="top-margin container">
          <h1 className="text-white text-center mb-5">Categories</h1>
          <div className="row">
            {categories.length
              ? categories.map((category) => (
                  <div key={category.category_id} className="col col-lg-3 p-4">
                    <div className="card p-3">
                      <div className="card-body">
                        <div>
                          <h3
                            id={category.category_id}
                            onClick={navigateToAddCandidatesForCategory}
                          >
                            {category.category_name}
                          </h3>
                        </div>
                        <button
                          className="btn btn-danger position-absolute top-0 end-0"
                          key={category.category_name}
                          id={category.category_id}
                          onClick={deleteCategory}
                        >
                          <i
                            id={category.category_id}
                            className="bi bi-trash"
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <button
          onClick={navigateToAddCategory}
          className="float border border-white text-primary"
        >
          <h5>
            <i className="bi bi-plus-circle"></i>&ensp;Add
          </h5>
        </button>
        <Pagination
          currentPage={currentPage}
          listLength={listLength}
          limit={limit}
          pageChange={handleCurrentPage}
        />
      </div>
    </div>
  );
}
