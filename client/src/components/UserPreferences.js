import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { useCookies } from "react-cookie";
import { TagWeightBox } from "./TagWeightBox";
import BackButton from "./BackButton";

export default function UserPreferences() {
  const location = useLocation();
  const category = location.state;
  const [tagsByCategory, setTagsByCategory] = useState([]);
  const [preference, setPreference] = useState([]);
  const [percentAvailable, setPercentAvailable] = useState(0);
  const [selectedTag, setSelectedTag] = useState("");
  const [tagWeight, setTagWeight] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getTagsByCategory();
    getUserPreferencesByCategory();
  });

  async function getTagsByCategory() {
    const tags = await axios.get(
      `${SERVER_HOST}/tags_by_category/${category.id}`
    );
    setTagsByCategory(tags.data);
    getTotalPercentMatch((percent) => {
      setPercentAvailable(100 - percent);
    });
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

  if (tagWeight > percentAvailable) {
    setTagWeight(percentAvailable);
  }
  if (percentAvailable <= 0) {
  }

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

    axios.post(`${SERVER_HOST}/insert_user_preference`, formData, {
      headers: { "Content-Type": "application/json" },
    });
  };

  function getTotalPercentMatch(callback) {
    let percent = 0;

    if (preference) {
      if (preference.tagWeights) {
        for (let i = 0; i < preference.tagWeights.length; i++) {
          percent += preference.tagWeights[i].weight;
        }
      }
    }
    callback(percent);
  }

  const calculateMatch = (e) => {
    e.preventDefault();

    if (preference === null) return;

    getTotalPercentMatch((percent) => {
      if (percent !== 100) {
        console.log("Error");
      }
    });

    const formData = new FormData();
    formData.append("userPreference", JSON.stringify(preference));

    axios
      .post(`${SERVER_HOST}/candidates_by_preference`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data) {
          navigate("/match", { state: { data: res.data, category: category } });
        }
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
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
      <div className="vh-100 p-4 mb-4 bg-primary">
        <div className="d-flex w-100 h-100 margin-top">
          <div className="w-50 m-5 align-self-center">
            <div className="text-center text-white">
              <h2>Category: {category.name}</h2>
            </div>
            <div className="bg-white p-5 rounded-box mt-4">
              <BackButton
                params={{
                  href: "/add_candidates",
                  text: "Preferences",
                  state: category,
                }}
              />
              <select
                className="form-control form-select-lg w-75 fs-6 p-3 mt-5 rounded-pill"
                onChange={handleSelectTagChange}
                defaultValue="Select tags"
              >
                <option disabled value="Select tags">
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
              <div className="p-4">
                <label>{tagWeight}%</label>
                <input
                  onChange={handleTagWeightChange}
                  type="range"
                  className="w-75 mt-5"
                  min={0}
                  max={percentAvailable}
                  defaultValue={0}
                ></input>
                <label>&ensp; {percentAvailable}%</label>
                <button
                  className="btn btn-primary my-5 w-25"
                  disabled={!inputsAreAllValid}
                  onClick={insertPreferences}
                >
                  Add
                </button>
              </div>
              {<div>Percent Available: {percentAvailable} %</div>}
            </div>
            <button
              className="btn btn-outline-light mt-5 w-50 d-block mx-auto"
              onClick={calculateMatch}
            >
              Calculate
            </button>
          </div>
          <div className="w-50 align-self-center">
            {preference ? (
              preference.tagWeights ? (
                preference.tagWeights.map((tags) => (
                  <div>
                    <TagWeightBox
                      key={tags.tag_id}
                      tag={tags}
                      category_id={preference.category_id}
                      max={percentAvailable}
                    />
                  </div>
                ))
              ) : (
                <h2>No Tags set</h2>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
