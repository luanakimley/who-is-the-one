import React from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

const deleteTagEntirely = (e) => {
  console.log("DE")
      e.preventDefault();

        axios
        .delete(`${SERVER_HOST}/remove_tag/${e.target.id}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
        })
        .catch((error) => {
          console.error("Error deleting tag:", error);
        });
    };

export default function TagBox(props)
{
    return <div key={props.tag.tag_id} className="col col-lg-4 p-4">
    <div className="card">
      <div className="card-body">
        <div>
          <h3>{props.tag.tag_description} </h3>
        </div>
        <button
          onClick={deleteTagEntirely}
          id={props.tag.tag_id}
          className="btn btn-danger position-absolute top-0 end-0"
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  </div>
}

export function TagBoxReset(props)
{
    return <div key={props.tag.tag_id} className="col col-lg-4 p-4">
    <div className="card">
      <div className="card-body">
        <div>
          <h3>{props.tag.tag_description} </h3>
        </div>
        <button
          onClick={deleteTagEntirely}
          id={props.tag.tag_id}
          className="btn btn-danger position-absolute top-0 end-0"
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  </div>
}