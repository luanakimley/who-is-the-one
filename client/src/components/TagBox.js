import React from "react";
import DeleteButton from "./DeleteButton";

export default function TagBox(props) {
  return (
    <div key={props.tag.tag_id} className="col col-lg-4 p-4">
      <div className="card rounded-pill border border-light border-5 bg-primary text-white">
        <div className="card-body p-3 text-center">
          <div>
            <h3>{props.tag.tag_description} </h3>
          </div>
          <DeleteButton params= {{text: "Tag", route: `/remove_tag_for_candidate/${props.tag.tag_id}/${props.candidateId}`}}/>
        </div>
      </div>
    </div>
  );
}
