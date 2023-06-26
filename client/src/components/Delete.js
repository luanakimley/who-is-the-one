import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

export default function DeleteCategory() {
console.log("DELETE CATEGORY")
  const [categoryId, setCategoryId] = useState("");
  const [cookies] = useCookies(["userId"]);
  const navigate = useNavigate();

    let formData = new FormData();
    formData.append("categoryId", categoryId);

    axios
      .post(`${SERVER_HOST}/delete_category_id`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
            console.log(res)
//        const categoryId = res.data[0].category_id;
//        const category = {
//          id: categoryId,
//          name: categoryName,
//        };
//        navigate("/categories", { state: category });
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });

  return (
    <div>
      <NavBar />
      <h1>Delete Category</h1>

    </div>
  );
}
