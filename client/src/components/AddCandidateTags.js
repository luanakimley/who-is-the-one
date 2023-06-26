import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { useCookies } from "react-cookie";

export default function AddCandidateTags() {
  const [tags, setTags] = useState([]);
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
      <h2>
        {state.category.name} - {state.candidate.name}
      </h2>
      <h1>Add Tags</h1>
      <form>
        <input type="text" placeholder="Tag name" />
        <button>Add</button>
        <p>or</p>
        <select defaultValue="Select tags">
          <option disabled>Select tags</option>
          {tags.length
            ? tags.map((tag) => (
                <option key={tag.tag_id} value={tag.tag_description}>
                  {tag.tag_description}
                </option>
              ))
            : null}
        </select>
        <button>Add</button>
      </form>
      <button onClick={navigateToAddCandidates}>Done</button>
    </div>
  );
}
