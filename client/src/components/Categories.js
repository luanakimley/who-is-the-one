import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Pagination from "./Pagination";
import Swal from "sweetalert2";
import CategoryBox from "./CategoryBox";

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
      } else {
        setCategories([]);
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
  }, [currentPage, categories, listLength, cookies.userId]);

  const handleCurrentPage = (data) => {
    setCurrentPage(data);
  };
  const navigateToAddCategory = () => {
    navigate("/add_category");
  };

  return (
    <div>
      <NavBar />
      <div className="vh-100 p-5 mb-2 bg-primary">
        <div className="top-margin container">
          <h1 className="text-white text-center mb-5">Categories</h1>
          <div className="row">
            {categories.length
              ? categories.map((category) => (
                  <div key={category.category_id} className="col col-lg-3 p-4">
                  <CategoryBox
                  category= {category}
                  listLength={listLength}
                  limit={limit}
                  setCurrentPage={handleCurrentPage}
                  />
                  </div>
                ))
              : null}
          </div>
          <div className="pagination-container text-center">
            <Pagination
              currentPage={currentPage}
              listLength={listLength}
              limit={limit}
              pageChange={handleCurrentPage}
            />
          </div>
        </div>
        <button
          onClick={navigateToAddCategory}
          className="float border border-white text-primary"
        >
          <h5>
            <i className="bi bi-plus-circle button-hover"></i>&ensp;Add
          </h5>
        </button>
      </div>
    </div>
  );
}
