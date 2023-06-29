import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { useCookies } from "react-cookie";
import TagBox from "./TagBox";
import EditableInput from "./EditableInput";
import Swal from "sweetalert2";

export default function AddCandidateTags() {
  const [tags, setTags] = useState([]);
  const [candidateTags, setCandidateTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [cookies] = useCookies(["userId"]);
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    getTags();
    getTagsByCandidate();
  });

  async function getTags() {
    const tags = await axios.get(
      `${SERVER_HOST}/tags_by_users/${cookies.userId}`
    );
    setTags(tags.data);
  }

  async function getTagsByCandidate() {
    const tags = await axios.get(
      `${SERVER_HOST}/tags_by_candidate/${state.candidate.id}`
    );

    if (tags.data.length) {
      setCandidateTags(tags.data);
    } else {
      setCandidateTags([]);
    }
  }

  const handleTagNameChange = (e) => {
    setTagName(e.target.value);
  };

  const handleSelectedTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const addTagToUserAndCandidate = () => {
    const formData = new FormData();
    formData.append("userId", cookies.userId);
    formData.append("tagDescription", tagName);
    formData.append("candidateId", state.candidate.id);

    axios
      .post(`${SERVER_HOST}/insert_tag`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        inputRef.current.value = "";
      });
  };

  const addTagToCandidate = () => {
    const formData = new FormData();
    formData.append("tagId", selectedTag);
    formData.append("candidateId", state.candidate.id);

    axios.post(`${SERVER_HOST}/insert_tag_for_candidate`, formData, {
      headers: { "Content-Type": "application/json" },
    });
  };

  const navigateToAddCandidates = () => {
    navigate("/add_candidates", { state: state.category });
  };

  const backToCandidates = (e) => {
    const category = {
      id: location.state.category.id,
      name: location.state.category.name,
    };
    navigate("/add_candidates", { state: category });
  };

  const editCandidateName = (e, candidateName) => {
    let formData = new FormData();
          formData.append("candidateName", candidateName);
          formData.append("candidateId", state.candidate.id);

           axios.put(`${SERVER_HOST}/edit_candidate`, formData, {
                  headers: { "Content-Type": "application/json" },
                });
  };

  return (
    <div>
      <NavBar />
      <div className="vh-100 p-4 mb-2 bg-primary">
        <div className="d-flex w-100 h-100">
          <div className="w-50 m-5 align-self-center">
            <h2 className="text-white text-center mt-5">
              Category: {state.category.name}
              <EditableInput
                handleSaveText={editCandidateName}
                value={state.candidate.name}
              />
            </h2>
            <div className="bg-white p-5 rounded-box mt-4">
              <h1 className="text-primary mb-5">
                <button className="btn btn-primary" onClick={backToCandidates}>
                  <i className="bi bi-arrow-return-left"></i>
                </button>
                &ensp; Add Tags
              </h1>
              <div className="form-floating">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Tag name"
                  className="form-control rounded-pill w-75 mb-3"
                  onChange={handleTagNameChange}
                  id="tagInput"
                />
                <label htmlFor="tagInput">Tag name</label>
              </div>
              <br />
              <button
                disabled={tagName.length === 0}
                onClick={addTagToUserAndCandidate}
                className="btn btn-primary mt-2 w-25"
              >
                Add
              </button>
              <h4 className="my-3 text-center text-primary">or</h4>
              <select
                onChange={handleSelectedTagChange}
                className="form-select form-select-lg rounded-pill w-75 mb-3 fs-6"
                defaultValue="Select tags"
              >
                <option disabled>Select tags</option>
                {tags.length &&
                  tags
                    .filter(
                      (tag) =>
                        !candidateTags.some(
                          (candidateTag) => candidateTag.tag_id === tag.tag_id
                        )
                    )
                    .map((tag) => (
                      <option key={tag.tag_id} value={tag.tag_id}>
                        {tag.tag_description}
                      </option>
                    ))}
              </select>
              <br />
              <button
                onClick={addTagToCandidate}
                className="btn btn-primary mt-3 w-25"
                disabled={selectedTag.length === 0}
              >
                Add
              </button>
            </div>
            <button
              onClick={navigateToAddCandidates}
              className="btn btn-outline-light mt-4 w-50 mx-auto d-block"
            >
              Done
            </button>
          </div>
          <div className="w-50 m-5 align-self-center">
            <div className="row">
              {candidateTags.length
                ? candidateTags.map((tag) => (
                    <TagBox
                      key={tag.tag_id}
                      id={tag.tag_id}
                      tag={tag}
                      candidateId={state.candidate.id}
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
