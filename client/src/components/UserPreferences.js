import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { useCookies } from "react-cookie";

export default function UserPreferences() {
  const location = useLocation();
  const category = location.state;
  const [tagsByCategory, setTagsByCategory] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    getTagsByCategory();
  });

  async function getTagsByCategory() {
    const tags = await axios.get(
      `${SERVER_HOST}/tags_by_category/${category.id}`
    );
    setTagsByCategory(tags.data);
  }

  const handleSelectTagsChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const insertPreferences = (e) => {
    console.log(selectedTag);
  };

  return (
    <div>
      <NavBar />
      <h2>{category.name}</h2>
      <h1>My Preferences</h1>
      <select onChange={handleSelectTagsChange} defaultValue="Select tags">
        <option disabled value="Select tags">
          Select tags
        </option>
        {tagsByCategory.length
          ? tagsByCategory.map((tag) => (
              <option key={tag.tag_id}>{tag.tag_description}</option>
            ))
          : null}
      </select>
      <button onClick={insertPreferences}>Add</button>
    </div>
  );
}
