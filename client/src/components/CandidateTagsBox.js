import React from "react";

export function CandidateTagBox(props) {
  return (
    <div>
      <button>X</button>
      <h2 id={props.candidate.candidate_id} onClick={props.handleClick}>
        {props.candidate.candidate_name}
      </h2>
      {props.tags.map((tag) => (
        <span key={tag.tag_id}>
          {tag.tag_description}&ensp;
          <button>X</button>
        </span>
      ))}
    </div>
  );
}
