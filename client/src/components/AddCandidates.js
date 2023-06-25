import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";
import { useCookies } from "react-cookie";

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

  const addCandidateTags = (e) => {
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
      <h2>{category.name}</h2>
      <h1>Add Candidates</h1>
      <form>
        <input
          type="text"
          placeholder="Candidate name"
          onChange={handleCandidateNameChange}
        />
        <button onClick={addCandidate}>Add</button>
      </form>
      <button onClick={doneAddCandidates}>Done</button>

      {candidates.length
        ? candidates.map((candidate) => (
            <div id={candidate.candidate_id} onClick={addCandidateTags}>
              {candidate.candidate_name}
            </div>
          ))
        : null}
    </div>
  );
}
