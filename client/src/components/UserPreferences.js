import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { useCookies } from "react-cookie";
import { TagWeightBox } from "./TagWeightBox";
import Footer from "./Footer";

export default function UserPreferences() {
  const location = useLocation();
  const category = location.state;
  const [tagsByCategory, setTagsByCategory] = useState([]);
  const [preference, setPreference] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [tagWeight, setTagWeight] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getTagsByCategory();
    getUserPreferencesByCategory()
  });

  async function getTagsByCategory() {
    const tags = await axios.get(
      `${SERVER_HOST}/tags_by_category/${category.id}`
    );
    setTagsByCategory(tags.data);
  }

  async function getUserPreferencesByCategory() {
      const tags = await axios.get(
        `${SERVER_HOST}/user_preferences/${category.id}`
      );

      setPreference(tags.data);
    }

  const handleSelectTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const handleTagWeightChange = (e) => {
    setTagWeight(e.target.value);
  };

  const handleSelectedPreferencesChange = (e) => {
      setPreference(e.target.value);
    };

  const insertPreferences = (e) => {
    const formData = new FormData();
    formData.append("categoryId", category.id);
    formData.append("tagId", selectedTag);
    formData.append("weight", tagWeight);

axios.post(`${SERVER_HOST}/insert_user_preference`, formData, {headers: { "Content-Type": "application/json" }});

  };

  const calculateMatch = (e) => {
      const formData = new FormData();
      formData.append("userPreference", JSON.stringify(preference))

    axios
      .post(`${SERVER_HOST}/candidates_by_preference`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data) {
        console.log(res.data)
//          const category = {
//            id: res.data[0].category_id,
//            name: res.data[0].category_name,
//          };
//          navigate("/add_candidates", { state: category });
        }
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });

    };

    const backToCategory = (e) => {
        navigate("/add_candidates", { state: category })
    }

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
      <div className="p-4 mb-2 bg-primary text-white rounded">
      <div className="container p-5">

      <h2>Category: {category.name}</h2>
<div className="row">
      <div className="p-4 mb-2 bg-white text-primary rounded w-50 h-75">
<button
                     className="btn btn-primary" onClick={backToCategory}>
                <i className="bi bi-arrow-return-left"></i>
                     </button>

      <h1>My Preferences</h1>
      <select
      className="form-control me-2 w-25 p-3"
      onChange={handleSelectTagChange} defaultValue="Select tags">

            <option
            disabled value="Select tags">
              Select tags
            </option>
                {tagsByCategory.length
                  ? tagsByCategory[0].map((tag) => (
                  <option key={tag.tag_description} value={tag.tag_id}>
                  {tag.tag_description}
                  </option>
                  ))
                  : null}
      </select>
      <input
        className="p-4"
        onChange={handleTagWeightChange}
        type="range"
        min={0}
        max={100}
        defaultValue={0}
      ></input>
      <div>
          <button
          className="btn btn-success" disabled={!inputsAreAllValid} onClick={insertPreferences}>
            Add
          </button>
</div>
                <div className="container p-4">
                <button
                     className="btn btn-primary" onClick={calculateMatch}>
                     Calculate
                     </button>
                </div>
          </div>


<div className="w-50">

<select
                onChange={handleSelectedPreferencesChange}
                className="px-4 border border-secondary rounded-pill p-2 w-75 mb-3"
                defaultValue="Select tags"
              >
                <option disabled>Select Saved Preference</option>
                {null}
              </select>

              {
              preference.tagWeights ?
              preference.tagWeights.map((tags) => (

              <TagWeightBox key={tags.tag_id} tag={tags} categoryId={preference.categoryId}/>

              ))
 : <h2>DID Not</h2>}




</div>



          </div>
          </div>
          </div>
    <Footer/>
    </div>
  );
}
