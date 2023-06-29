import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";
import { CandidateTagBox } from "./CandidateTagsBox";
import EditableInput from "./EditableInput";
import Swal from "sweetalert2";
import AddBox from "./AddBox";

export default function AddCandidates() {
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


  const addCandidate = (e, candidateName) => {
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

  const editCategoryName = (e, newCategoryName) => {
    let formData = new FormData();
    formData.append("categoryName", newCategoryName);
    formData.append("categoryId", category.id);

     axios.put(`${SERVER_HOST}/edit_category`, formData, {
            headers: { "Content-Type": "application/json" },
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
                <EditableInput
                  handleSaveText={editCategoryName}
                  value={category.name}
                />{" "}
              </h2>
            </div>
            <AddBox
            params= {{backButtonTitle: {href: "/categories", text: "Add Candidate"}, objectText: "Candidate", callback: addCandidate}}
            inputRef = {inputRef}
            />

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
