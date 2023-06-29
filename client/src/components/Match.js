import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Candidate from "./Candidate";

export default function Match() {
  const [cookies] = useCookies(["userId"]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();
  const [results, setResults] = useState(location.state);
  const [resultsSaved, setResultsSaved] = useState(location.state);
  const [limit, setLimit] = useState(6);


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

  const reverseRanking = () => {
      setResults(results.slice().reverse())
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value)
    setResults(resultsSaved.slice(0, e.target.value))
    };



  return (
    <div>
      <NavBar />

      <div className="vh-100 p-6 mb-2 bg-primary text-white">
        <div className="top-margin container p-4">
          <div className="container p-4 text-center">
            <h1>Your Matches!</h1>
            <h2>
              Hello {cookies.username}!, based on your preferences, we recommend
              the following:{" "}
            </h2>

            <div className="text-center">
              <select
                onChange={handleSelectedCategoryChange}
                className="px-4 border border-secondary rounded-pill p-2 w-25 mb-3 text-black"
                defaultValue="Select tags"
              >
                <option disabled>Select Category</option>
                {categories.length
                  ? categories.map((category) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name}
                      </option>
                    ))
                  : null}
              </select>
            </div>


            <div className="text-center p-2">
              <label className="p-2">Descending Order</label>
              <label className="switch">
                <input type="checkbox" onChange={reverseRanking} />
                <span className="slider round"></span>
              </label>

            </div>
<div className="w-25 bg-white rounded text-primary p-3 float-right mx-auto text-center">
  <label><h4>Limit: {limit}</h4></label>
  <input
    className="form-range"
    onChange={handleLimitChange}
    type="range"
    min={1}
    max={20}
    defaultValue={6}
  ></input>
</div>
            <h1 className="text-white text-center p-3">Candidates</h1>


            <div className="row">
              {results.length
                ? results.map((candidate, index) => (
                    <Candidate
                      key={candidate.candidate_id}
                      props={candidate}
                      index={index + 1}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
