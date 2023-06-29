import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import BackButtonTitle from "./BackButtonTitle";
import AddBox from "./AddBox";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [cookies] = useCookies(["userId"]);
  const [category, setCategory] = useState({});
  const navigate = useNavigate();

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const addCategory = (e, categoryName) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("userId", cookies.userId);

    axios
      .post(`${SERVER_HOST}/insert_category`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data) {
          const category = {
            id: res.data[0].category_id,
            name: res.data[0].category_name,
          };
          setCategory(category);
          navigate("/add_candidates", { state: category });
        }
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="bg-primary vh-100 d-flex align-items-center justify-content-center">
      <AddBox params= {{backButtonTitle: {href: "/categories", text: "Add Category"}, objectText: "Category", callback: addCategory}}/>
      </div>
    </div>
  );
}
