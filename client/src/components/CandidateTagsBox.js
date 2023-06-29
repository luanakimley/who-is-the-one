import React from "react";
import DeleteButton from "./DeleteButton";

export function CandidateTagBox(props) {
  return (
    <div key={props.candidate.candidate_id} className="col col-lg-4 p-4">
      <div className="card p-3">
        <div className="card-body text-center">
          <div>
            <h2 id={props.candidate.candidate_id} onClick={props.handleClick}>
              {props.candidate.candidate_name}
            </h2>
          </div>
          <DeleteButton params= {{text: "Candidate", route: `/remove_candidate/${props.candidate.candidate_id}`}}/>
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
