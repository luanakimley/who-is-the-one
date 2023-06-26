import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { useCookies } from "react-cookie";
import { TagWeightBox } from "./TagWeightBox";

export default function UserPreferences() {
  const location = useLocation();
  const category = location.state;
  const [tagsByCategory, setTagsByCategory] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [tagWeight, setTagWeight] = useState(0);

  useEffect(() => {
    getTagsByCategory();
  });

  async function getTagsByCategory() {
    const tags = await axios.get(
      `${SERVER_HOST}/tags_by_category/${category.id}`
    );
    setTagsByCategory(tags.data);
  }

  const handleSelectTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const handleTagWeightChange = (e) => {
    setTagWeight(e.target.value);
  };

  const insertPreferences = (e) => {
    const formData = new FormData();
    formData.append("categoryId", category.id);
    formData.append("tagId", selectedTag);
    formData.append("weight", tagWeight);

    axios.post(`${SERVER_HOST}/insert_user_preference`, formData, {headers: { "Content-Type": "application/json" },});
  };

  const validateSelectedTag = () => selectedTag !== "";

  const validateTagWeight = () => tagWeight !== 0;

  const validate = () => {
    return {
      selectedTag: validateSelectedTag(),
      tagWeight: validateTagWeight(),
    };
  };

  const inputsAreAllValid = Object.keys(validate()).every(
    (index) => validate()[index]
  );

  return (
    <div>
      <NavBar />
      <h2>{category.name}</h2>
      <h1>My Preferences</h1>
      <select onChange={handleSelectTagChange} defaultValue="Select tags">
        <option disabled value="Select tags">
          Select tags
        </option>
        {tagsByCategory.length
          ? tagsByCategory.map((tag) => (
              <option key={tag.tag_id} value={tag.tag_id}>
                {tag.tag_description}
              </option>
            ))
          : null}
      </select>
      <input
        onChange={handleTagWeightChange}
        type="range"
        min={0}
        max={100}
        defaultValue={0}
      ></input>
      <button disabled={!inputsAreAllValid} onClick={insertPreferences}>
        Add
      </button>
      {TagWeightBox()}
    </div>
  );
}
