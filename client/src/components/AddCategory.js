import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  let addCategory = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("category", category);

    navigate("/");
  };

  return (
    <div>
      <h1>Add Category</h1>
      <form>
        <input
          type="text"
          placeholder="Category name"
          onChange={handleCategoryChange}
        />
        <button onClick={addCategory}>Done</button>
      </form>
    </div>
  );
}
