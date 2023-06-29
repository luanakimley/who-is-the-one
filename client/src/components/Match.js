import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Candidate from "./Candidate";
import BackButtonTitle from "./BackButtonTitle";

export default function Match() {
  const [cookies] = useCookies(["userId"]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();
  const category = location.state.category;
  const preference = location.state.preference;
  const [results, setResults] = useState(location.state.data);
  const [resultsSaved, setResultsSaved] = useState(location.state.data);
  const [limit, setLimit] = useState(6);

  resultsSaved.sort((a, b) => b.score - a.score);


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
     <div className="top-margin container p-4">
       <div className="container p-4 text-center">
         <div className="bg-white p-3 rounded-box preference-box">
           <BackButtonTitle params={{ href: "/user_preferences", text: "Matches", state: category }} />


        <div className="row gx-2">
          <div className="col d-flex justify-content-center ">
            <div className="d-flex align-items-center mb-3">
              <span className="me-5 text-red fs-5 bold">Descending Order</span>
              <div className="form-check form-switch">
                <input className="form-check-input big-checkbox" type="checkbox" id="reverseRanking" onChange={reverseRanking} />
                <label className="form-check-label" htmlFor="reverseRanking"></label>
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-center">
            <div className="w-25 bg-white rounded text-primary p-3 text-center">
              <label><h4 className="input-color input-checkbox">Limit:&nbsp;&nbsp;{limit}</h4></label>
              <input
                className="form-range input-checkbox"
                onChange={handleLimitChange}
                type="range"
                min={1}
                max={20}
                defaultValue={6}
              />
            </div>
          </div>
        </div>
    </div>
    <br />
    <br />
    <br />
            <h1 className="text-white text-center p-3">Candidates</h1>
            <div className="row scroll-bar">
              {results ?
              results.length
                ? results.map((candidate, index) => (
                    <Candidate
                      key={candidate.candidate_id}
                      params={candidate}
                      index={index + 1}
                      tagsMatch={preference.tagWeights.map((tag) => tag.tag_id)}
                    />
                  ))
                : null : null}
            </div>
          </div>
        </div>
      </div>
  );
}
