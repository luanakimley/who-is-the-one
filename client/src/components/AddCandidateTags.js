import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function AddCandidateTags() {
  return (
    <div>
      <NavBar />
      <h2>Category name - Candidate name</h2>
      <h1>Add Tags</h1>
      <form>
        <input type="text" placeholder="Tag name" />
        <button>Add</button>
        <p>or</p>
        <select>
          <option selected disabled>
            Select tags
          </option>
        </select>
        <button>Add</button>
      </form>
      <button>Done</button>
    </div>
  );
}
