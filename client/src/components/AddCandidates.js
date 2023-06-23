import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCandidates() {
  const [candidateName, setCandidateName] = useState("");
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  const handleCandidateNameChange = (e) => {
    setCandidateName(e.target.value);
  };

  let addCandidate = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("candidateName", candidateName);
  };

  let doneAddCandidates = (e) => {
    navigate("/");
  };

  return (
    <div>
      <h1>Add Candidate</h1>
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
        <p>{candidate.candidate_name}</p>
      ))}
    </div>
  );
}
