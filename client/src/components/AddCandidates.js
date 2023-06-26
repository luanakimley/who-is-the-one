import React, { useEffect, useState } from "react";
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
  const [cookies] = useCookies(["userId"]);
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state;

  async function getCandidatesForCategory() {
    const candidates = await axios.get(
      `${SERVER_HOST}/candidates/${cookies.userId}/${category.name}`
    );
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
      .then((res) => {})
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

  const removeTagFromCategory = (e) => {
    navigate("/add_candidate_tags", {
      //todo
    });
  };

  return (
    <div>
      <NavBar />
      <div className="p-4 mb-2 bg-primary text-black">
        <div className="container">
          <h2>{category.name}</h2>

          <div className="container bg-white rounded">
            <h1>Add Candidates</h1>
            <form>
              <input
                type="text"
                placeholder="Candidate name"
                onChange={handleCandidateNameChange}
              />
              <button
                className="btn btn-primary"
                disabled={candidateName.length === 0}
                onClick={addCandidate}
              >
                Add
              </button>
            </form>
            <button className="btn btn-success" onClick={doneAddCandidates}>
              Done
            </button>
          </div>

          <div>
            {candidates.length
              ? candidates.map((candidate) => (
                  <CandidateTagBox
                    key={candidate.candidate_id}
                    candidate={candidate}
                    tags={[{ tag_id: 1, tag_description: "Tag" }]}
                    handleClick={navigateToAddCandidateTags}
                  />
                ))
              : null}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
