import React, { useState } from "react";
import { SERVER_HOST } from "../config/global_constants";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

export default function Search() {

  const [searchParameter, setSearchParameter] = useState("");

  const handleSearch = (e) => {
    setSearchParameter(e.target.value);
  };

    const submitSearch = (e) => {
    e.preventDefault();

    console.log("Search Functionality")

//    let formData = new FormData();
//    formData.append("candidateName", candidateName);
//    formData.append("categoryId", category.id);
//
//    axios
//      .post(`${SERVER_HOST}/insert_candidate`, formData, {
//        headers: { "Content-Type": "application/json" },
//      })
//      .then((res) => {})
//      .catch((error) => {
//        console.error("Error adding candidate:", error);
//      });
  };

  return (

    <div>
            <form class="d-flex">

        <input class="form-control me-2"  type="text" placeholder="Search..." onChange={handleSearch} />

        <button class="btn btn-outline-success" onClick={submitSearch}>Search</button>
      </form>
    </div>
  );
}
