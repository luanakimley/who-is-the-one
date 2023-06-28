import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Pagination from "./Pagination";
import Swal from "sweetalert2";

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

  const navigateToAddCandidatesForCategory = (e) => {
    const category = {
      id: e.target.id,
      name: e.target.innerHTML,
    };
    navigate("/add_candidates", { state: category });
  };

  const deleteCategory = (e) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0275d8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
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
        Swal.fire({
          title: "Deleted!",
          text: "Category has been deleted.",
          icon: "success",
          confirmButtonColor: "#0275d8",
        });
      }
    });
  };

  const editFavourite = (e) => {
    const category = JSON.parse(e.target.id);

    const formData = new FormData();
    formData.append("isFavourite", category.is_favourite === 0 ? 1 : 0);
    formData.append("categoryId", category.category_id);

    axios.put(`${SERVER_HOST}/edit_category_favourite`, formData, {
      headers: { "Content-Type": "application/json" },
    });
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
                    <div className="card p-3">
                      <div className="card-body text-center">
                        <div>
                          <h3
                            id={category.category_id}
                            onClick={navigateToAddCandidatesForCategory}
                          >
                            {category.category_name}
                          </h3>
                        </div>
                        <div
                          onClick={editFavourite}
                          className="position-absolute top-0 start-0 m-2"
                        >
                          <i
                            id={JSON.stringify(category)}
                            className={`bi ${
                              category.is_favourite === parseInt(1)
                                ? "bi-star-fill"
                                : "bi-star"
                            } fs-5 text-warning`}
                          ></i>
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
            <i className="bi bi-plus-circle"></i>&ensp;Add
          </h5>
        </button>
      </div>
    </div>
  );
}
