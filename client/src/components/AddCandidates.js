import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";
import { CandidateTagBox } from "./CandidateTagsBox";
import EditableInput from "./EditableInput";
import Swal from "sweetalert2";

export default function AddCandidates() {
  const [candidateName, setCandidateName] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state;
  const inputRef = useRef(null);

  async function getCandidatesForCategory() {
    const candidates = await axios.get(
      `${SERVER_HOST}/candidates/${category.id}`
    );
    setCandidates(candidates.data);
  }
  useEffect(() => {
    getCandidatesForCategory();
    validateAllCandidatesHasTag();
  });

  const backToCategories = (e) => {
    navigate("/categories", { state: category });
  };

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
        Swal.fire({
          icon: "error",
          title: "Duplicate candidate name",
          text: "Check the entered candidate name, category must be unique!",
          confirmButtonColor: "#0275d8",
        });
      });
  };

  const editCategoryName = (e) => {
    category.name = "Tits";
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

  function validateAllCandidatesHasTag() {
    let valid = true;
    candidates.forEach((candidate) => {
      if (candidate.tags.length === 0) {
        valid = false;
      }
    });

    if (!candidates.length) {
      valid = false;
    }

    setDone(valid);
  }

  return (
    <div>
      <NavBar />
      <div className="vh-100 p-4 mb-2 bg-primary">
        <div className="d-flex w-100 h-100">
          <div className="w-50 m-5 align-self-center">
            <div>
              <h2 className="text-white text-center">
                <EditableInput value={category.name} />{" "}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-box mt-4">
              <h1 className="text-primary mb-5">
                <button className="btn btn-primary" onClick={backToCategories}>
                  <i className="bi bi-arrow-return-left"></i>
                </button>
                &ensp; Add Candidates
              </h1>
              <div className="form-floating">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Candidate name"
                  onChange={handleCandidateNameChange}
                  id="candidate"
                  className="form-control rounded-pill w-75 mb-3"
                />
                <label htmlFor="candidate">Candidate name</label>
              </div>
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
              disabled={!done}
            >
              Set your Preferences
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
    </div>
  );
}
