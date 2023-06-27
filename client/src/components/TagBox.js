import React from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

export default function TagBox(props) {
  const deleteTagForCandidate = (e) => {
    axios
      .delete(
        `${SERVER_HOST}/remove_tag_for_candidate/${e.target.id}/${props.candidateId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {})
      .catch((error) => {
        console.error("Error deleting tag:", error);
      });
  };
  return (
    <div key={props.tag.tag_id} className="col col-lg-4 p-4">
      <div className="card">
        <div className="card-body p-3">
          <div>
            <h3>{props.tag.tag_description} </h3>
          </div>
          <button
            onClick={deleteTagForCandidate}
            id={props.tag.tag_id}
            className="btn btn-danger position-absolute top-0 end-0"
          >
            <i id={props.tag.tag_id} className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
