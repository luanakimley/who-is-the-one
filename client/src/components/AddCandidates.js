import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

export default function AddCandidates() {
  const [candidateName, setCandidateName] = useState("");
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state;

  const handleCandidateNameChange = (e) => {
    setCandidateName(e.target.value);
  };

  const addCandidate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("candidateName", candidateName);
  };

  const doneAddCandidates = (e) => {
    navigate("/");
  };

  const addCandidateTags = (e) => {
    navigate("/add_candidate_tags", {
      state: {
        category: category,
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

      {candidates.map((candidate) => (
        <div onClick={addCandidateTags}>{candidate.candidate_name}</div>
      ))}
    </div>
  );
}
