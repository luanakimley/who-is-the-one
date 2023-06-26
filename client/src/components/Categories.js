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

  const deleteCategory = (e) => {
      const category = {
        id: e.target.id,
        name: e.target.innerHTML,
      };
      console.log(category)
      navigate("/delete_category", { state: category });
    };

  return (
  <div>
        <NavBar />
<div class="p-4 mb-2 bg-primary text-black">
<div class="container">
          <h1>Categories</h1>


  <div class="row">



            {categories.length

              ? categories.map((category) => (
        <div class="col col-lg-3 p-4">
<div class="card">
<div class="card-body">
                  <div
                    key={category.category_id}
                    id={category.category_id}
                    onClick={navigateToAddCandidatesForCategory}
                  >
                    <h3>{category.category_name}</h3>

                  </div>
                  <button class="btn btn-danger position-absolute top-0 end-0"
                                         key={category.category_name}
                                         id={category.category_id}
                                         onClick={deleteCategory}
                                     >


<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg>



                                    </button>
                   </div>



              </div>
              </div>



            ))
          : null}
<button class="btn btn-light col col-lg-3 p-4 float-right" onClick={navigateToAddCategory}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                                          </svg> Add</button>
                                                                          </div>
              </div>





</div>
    <Footer/>
    </div>
  );
}
