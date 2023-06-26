import React from "react";

export function CandidateTagBox(props) {
  return (
    <div key={props.candidate.candidate_id} className="col col-lg-4 p-4">
      <div className="card">
        <div className="card-body">
          <div>
            <h2 id={props.candidate.candidate_id} onClick={props.handleClick}>
              {props.candidate.candidate_name}
            </h2>
          </div>
          <button className="btn btn-danger position-absolute top-0 end-0">
            <i className="bi bi-trash"></i>
          </button>
          {props.tags.map((tag) => (
            <span
              key={tag.tag_id}
              className="badge rounded-pill bg-primary m-1"
            >
              {tag.tag_description}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
