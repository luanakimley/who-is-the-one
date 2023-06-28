import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Candidate from "./Candidate";

export default function Match() {
  const [cookies] = useCookies(["userId"]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
    const location = useLocation();
  const results = location.state;

    useEffect(() => {
        getCategories();
    });
    async function getCategories() {
        const categories = await axios.get(
          `${SERVER_HOST}/categories/${cookies.userId}`
        );
        if (categories.data.length) {
          setCategories(categories.data);
        }
    }

    const handleSelectedCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

  return (
    <div>
      <NavBar />

      <div className="vh-100 p-6 mb-2 bg-primary text-white">
              <div className="top-margin container p-4">
              <div className="container p-4">
          <h1>Your Matches!</h1>
          <h2>Hello {cookies.userId}!, based on your preferences, we recommend the following: </h2>

<div className="text-center">
                      <select
                        onChange={handleSelectedCategoryChange}
                        className="px-4 border border-secondary rounded-pill p-2 w-25 mb-3 text-black"
                        defaultValue="Select tags"
                      >
                        <option disabled>Select Category</option>
                        {categories.length
                          ? categories.map((category) => (
                              <option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                              </option>
                            ))
                          : null}
                      </select>


                    </div>

                  <h1 className="text-white text-center">Candidates</h1>

                  <div className="text-center p-2">
                                      <label className="p-2">Descending Order</label>
                                      <label className="switch">
                                        <input type="checkbox"/>
                                        <span className="slider round"></span>
                                      </label>
                                      </div>
                  <div className="row">

        {
        results.length ?
        results.map((candidate, index) => (
                <Candidate key={candidate.candidate_id} props={candidate} index={index + 1}/>
                )) : null
        }




</div>







        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
