import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

export function TagWeightBox(props) {
  const [weight, setWeight] = useState(props.tag.weight);
  const [pendingWeight, setPendingWeight] = useState(weight);

  const deleteTagFromPreferences = (e) => {
    axios
      .delete(
        `${SERVER_HOST}/remove_user_preference/${props.category_id}/${props.tag.tag_id}`
      )
      .then((res) => {})
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  useEffect(() => {
    let formData = new FormData();

    formData.append("categoryId", props.category_id);
    formData.append("tagId", props.tag.tag_id);
    formData.append("weight", pendingWeight);

    axios
      .put(`${SERVER_HOST}/edit_user_preference`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .catch((error) => {
        console.error("Error updating user preference:", error);
      });
  }, [pendingWeight, props.category_id, props.tag.tag_id]);

  const handleWeightChange = (e) => {
    const newWeight = Number(e.target.value);
    setPendingWeight(newWeight);
  };

  return (
    <div className="col">
      <div className="p-4 mb-2 bg-white text-primary rounded">
        <div className="card">
          <div className="card-body">
            <h2>{props.tag.tag_description}</h2>
            <label>{pendingWeight}%</label>
            <input
              type="range"
              value={pendingWeight}
              min="0"
              max="100"
              onChange={handleWeightChange}
              style={{ width: "200px" }}
            />
            <label>100%</label>
            <i
              onClick={deleteTagFromPreferences}
              className="fa-2x bi bi-trash position-absolute top-0 end-0"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
