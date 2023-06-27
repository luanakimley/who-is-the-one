import React from "react";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";

export function CandidateTagBox(props) {
  const deleteCandidate = () => {
    axios.delete(
      `${SERVER_HOST}/remove_candidate/${props.candidate.candidate_id}`
    );
  };

  return (
    <div key={props.candidate.candidate_id} className="col col-lg-4 p-4">
      <div className="card p-3">
        <div className="card-body">
          <div>
            <h2 id={props.candidate.candidate_id} onClick={props.handleClick}>
              {props.candidate.candidate_name}
            </h2>
          </div>
          <button
            onClick={deleteCandidate}
            className="btn btn-danger position-absolute top-0 end-0"
          >
            <i className="bi bi-trash"></i>
          </button>
          {props.tags.length
            ? props.tags.map((tag) =>
                tag ? (
                  <span
                    key={tag.tag_id}
                    className="badge rounded-pill bg-primary m-1"
                  >
                    {tag.tag_description}
                  </span>
                ) : null
              )
            : null}
        </div>
      </div>
    </div>
  );
}
