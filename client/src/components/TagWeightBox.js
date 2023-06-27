import React from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";


export function TagWeightBox(props) {


const deleteTagFromPreferences = (e) => {
        axios
          .delete(`${SERVER_HOST}/remove_user_preference/${e.target.id}/${props.tag.tag_id}`)
          .then((res) => {})
          .catch((error) => {
            console.error("Error deleting category:", error);
          });
  };


  return (
    <div className="col">
    <div className="p-4 mb-2 bg-white text-primary rounded">

      <div className="card">
      <div className="card-body">
      <h2>{props.tag.tag_description}</h2>
      <label>0%</label>
      <input className="p-3" readOnly type="range" value={props.tag.weight}></input>
      <label>100%</label>
      <i
      key={props.category}
       id={props.categoryId}
      onClick={deleteTagFromPreferences}
      className="fa-2x bi bi-trash position-absolute top-0 end-0"></i>

    </div>
    </div>
    </div>
    </div>
  );
}
