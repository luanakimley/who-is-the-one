import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { useCookies } from "react-cookie";
import Footer from "./Footer";
import TagBox from "./TagBox";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [cookies] = useCookies(["userId"]);

  useEffect(() => {
    getTags();
  });

  async function getTags() {
    const tags = await axios.get(
      `${SERVER_HOST}/tags_by_users/${cookies.userId}`
    );
    if (tags.data.length) {
      setTags(tags.data[0]);
    }
  }

  const handleTagNameChange = (e) => {
    setTagName(e.target.value);
  };

  const addTag = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", cookies.userId);
    formData.append("tagDescription", tagName);

    axios.post(`${SERVER_HOST}/insert_tag_for_user`, formData, {
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div>
      <NavBar />
      <div className="vh-100 p-4 mb-2 bg-primary">
        <div className="d-flex w-100 h-100">
          <div className="w-50 m-5 align-self-center">
            <div className="bg-white p-5 rounded-box">
              <h1 className="text-primary mb-4">Add tags</h1>
              <input
                type="text"
                onChange={handleTagNameChange}
                placeholder="Tag name"
                className="px-4 border border-secondary rounded-pill p-2 w-75 mb-3"
              />
              <br />
              <button
                className="btn btn-primary mt-4 w-25"
                disabled={tagName.length === 0}
                onClick={addTag}
              >
                Add
              </button>
            </div>
          </div>
          <div className="w-50 m-5 align-self-center">
            <div className="row">
              {tags.length
                ? tags.map((tag) => <TagBox key={tag.tag_id} tag={tag} />)
                : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
