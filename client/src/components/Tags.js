import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { useCookies } from "react-cookie";
import Footer from "./Footer";


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
    setTags(tags.data);
  }

  const handleTagNameChange = (e) => {
    setTagName(e.target.value);
  };

  const addTag = (e) => {
    e.preventDefault();

    console.log("Add tag logic here");
  };

  return (
    <div>
      <NavBar />
      <div class="container">
      <h1>Tags</h1>
      <form>
        <label>Add tags</label>
        <input type="text" onChange={handleTagNameChange} />
        <button class="btn btn-primary" onClick={addTag}>Add</button>
      </form>
      <ul>
        {tags.length
          ? tags.map((tag) => <li key={tag.tag_id}>{tag.tag_description}</li>)
          : null}
      </ul>
      </div>
      <Footer/>
    </div>
  );
}
