import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categories = [
      { category_id: 1, category_name: "Actors" },
      { category_id: 2, category_name: "Singers" },
    ];
    setCategories(categories);
  }, []);

  async function getCategories() {
    const categories = await axios.get(`${SERVER_HOST}/`);
    setCategories(categories);
  }

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.category_id}>{category.category_name}</li>
        ))}
      </ul>
    </div>
  );
}
