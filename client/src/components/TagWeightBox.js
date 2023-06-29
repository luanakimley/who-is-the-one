import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import DeleteButton from "./DeleteButton";

export function TagWeightBox(props) {
  const [weight, setWeight] = useState(props.tag.weight);
  const [pendingWeight, setPendingWeight] = useState(weight);

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
      <div className="p-4 mb-4 bg-white text-primary rounded-box w-75">
        <div className="card border border-0">
          <div className="card-body text-center">
            <div>
              <h2>{props.tag.tag_description}</h2>
            </div>
            <label>{pendingWeight}%</label>
            <input
              className="m-4"
              type="range"
              value={pendingWeight}
              min="0"
              max="100"
              style={{ width: "200px" }}
              readOnly
            />
            <label>100%</label>
            <DeleteButton
              params={{
                text: "Delete Preference",
                route: `/remove_user_preference/${props.category_id}/${props.tag.tag_id}`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
