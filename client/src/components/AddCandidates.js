import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
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

  const removeTagFromCategory = (e) => {
      navigate("/add_candidate_tags", {
        //todo
      });
    };

  return (
    <div>
      <NavBar />
      <div class="p-4 mb-2 bg-primary text-black">
      <div class="container">


      <h2>{category.name}</h2>

<div class="container bg-white rounded">      <h1>Add Candidates</h1>
      <form>
        <input
          type="text"
          placeholder="Candidate name"
          onChange={handleCandidateNameChange}
        />
        <button class="btn btn-primary" onClick={addCandidate}>Add</button>
      </form>
      <button class="btn btn-success" onClick={doneAddCandidates}>Done</button>
</div>

    <div>

     <div class="row">
      {candidates.length
        ? candidates.map((candidate) => (
        <div class="col col-lg-3 p-4">
            <div key={candidate.candidate_id} id={candidate.candidate_id} onClick={addCandidateTags}>
              <div class="card">
              <div class="card-body">
              {candidate.candidate_name}


              <button class="btn btn-danger position-absolute top-0 end-0"
                                                       key={category.category_name}
                                                       id={category.category_id}
                                                       onClick={removeTagFromCategory}
                                                   >


              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
              </svg>



                                                  </button>
</div>
              </div>




            </div>
            </div>
          ))
        : null}

        </div>
        </div>

    </div>
    </div>
    <Footer/>
    </div>

  );
}
