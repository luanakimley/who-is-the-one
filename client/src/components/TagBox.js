import React from "react";

export default function TagBox(props)
{
    return <div key={props.tag.tag_id} className="col col-lg-4 p-4">
    <div className="card">
      <div className="card-body">
        <div>
          <h3>{props.tag.tag_description} </h3>
        </div>
        <button
          id={props.tag.tag_id}
          className="btn btn-danger position-absolute top-0 end-0"
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  </div>
}