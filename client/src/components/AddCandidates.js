import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";
import { useCookies } from "react-cookie";
import { CandidateTagBox } from "./CandidateTagsBox";

export default function AddCandidates() {
  const [candidateName, setCandidateName] = useState("");
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state;
  const inputRef = useRef(null);

  async function getCandidatesForCategory() {
    console.log(category.id);
    const candidates = await axios.get(
      `${SERVER_HOST}/candidates/${category.id}`
    );
    console.log(candidates);
    setCandidates(candidates.data);
  }

  useEffect(() => {
    getCandidatesForCategory();
  });

  const handleCandidateNameChange = (e) => {
    setCandidateName(e.target.value);
  };

  const addCandidate = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("candidateName", candidateName);
    formData.append("categoryId", category.id);

    axios
      .post(`${SERVER_HOST}/insert_candidate`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        inputRef.current.value = "";
      })
      .catch((error) => {
        console.error("Error adding candidate:", error);
      });
  };

  const doneAddCandidates = (e) => {
    navigate("/user_preferences", { state: category });
  };

  const navigateToAddCandidateTags = (e) => {
    navigate("/add_candidate_tags", {
      state: {
        category: category,
        candidate: {
          name: e.target.innerHTML,
          id: e.target.id,
        },
      },
    });
  };

  return (
    <div>
      <NavBar />
      <div className="vh-100 p-4 mb-2 bg-primary">
        <div className="d-flex w-100 h-100">
          <div className="w-50 m-5 align-self-center">
            <h2 className="text-white text-center">{category.name}</h2>
            <div className="bg-white p-5 rounded-box mt-4">
              <h1 className="text-primary mb-4">Add Candidates</h1>
              <input
                ref={inputRef}
                type="text"
                placeholder="Candidate name"
                onChange={handleCandidateNameChange}
                className="px-4 border border-secondary rounded-pill p-2 w-75 mb-3"
              />
              <br />

              <button
                className="btn btn-primary mt-4 w-25"
                disabled={candidateName.length === 0}
                onClick={addCandidate}
              >
                Add
              </button>
            </div>
            <button
              className="btn btn-outline-light mt-5 w-50 mx-auto d-block"
              onClick={doneAddCandidates}
            >
              Done
            </button>
          </div>
          <div className="w-50 m-5 align-self-center">
            <div className="row">
              {candidates.length
                ? candidates.map((candidate) => (
                    <CandidateTagBox
                      key={candidate.candidate_id}
                      candidate={candidate}
                      tags={candidate.tags}
                      handleClick={navigateToAddCandidateTags}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
