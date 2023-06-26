import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { useCookies } from "react-cookie";
import Footer from "./Footer";
import TagBox from "./TagBox";

export default function AddCandidateTags() {
  const [tags, setTags] = useState([]);
  const [candidateTags, setCandidateTags] = useState([
    { tag_id: 1, tag_description: "Economy" },
    { tag_id: 2, tag_description: "Cool" },
    { tag_id: 3, tag_description: "Politics" },
    { tag_id: 4, tag_description: "Tag" },
  ]);
  const [cookies] = useCookies(["userId"]);
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    getTags();
  });

  async function getTags() {
    const tags = await axios.get(
      `${SERVER_HOST}/tags_by_users/${cookies.userId}`
    );
    setTags(tags.data);
  }

  async function getTagsByCandidate() {}

  const navigateToAddCandidates = () => {
    navigate("/add_candidates", { state: state.category });
  };

  return (
    <div>
      <NavBar />
      <div className="vh-100 p-4 mb-2 bg-primary">
        <div className="d-flex w-100 h-100">
          <div className="w-50 m-5 align-self-center">
            <h2 className="text-white text-center">
              {state.category.name} - {state.candidate.name}
            </h2>
            <div className="bg-white p-5 rounded-box mt-4">
              <h1 className="text-primary mb-4">Add Tags</h1>
              <input
                type="text"
                placeholder="Tag name"
                className="px-4 border border-secondary rounded-pill p-2 w-75 mb-3"
              />
              <br />
              <button className="btn btn-primary mt-4 w-25">Add</button>
              <h4 className="my-4 text-center text-primary">or</h4>
              <select
                className="px-4 border border-secondary rounded-pill p-2 w-75 mb-3"
                defaultValue="Select tags"
              >
                <option disabled>Select tags</option>
                {tags.length
                  ? tags.map((tag) => (
                      <option key={tag.tag_id} value={tag.tag_description}>
                        {tag.tag_description}
                      </option>
                    ))
                  : null}
              </select>
              <br />
              <button className="btn btn-primary mt-4 w-25">Add</button>
            </div>
            <button className="btn btn-outline-light mt-5 w-50 mx-auto d-block">
              Done
            </button>
          </div>
          <div className="w-50 m-5 align-self-center">
            <div className="row">
              {candidateTags.length
                ? candidateTags.map((tag) => <TagBox tag={tag} />)
                : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
