import React from "react";
import DeleteButton from "./DeleteButton";

export default function TagBox(props) {
  return (
      <div className="card rounded-pill border border-light border-5 bg-primary text-white">
        <div className="card-body p-3 text-center">
          <div>
            <h3>{props.tag.tag_description} </h3>
          </div>
          <DeleteButton
              params= {{text: "Tag", route: `/remove_tag/${props.tag.tag_id}`}}
              listLength={props.listLength}
              limit={props.limit}
              setCurrentPage={props.setCurrentPage}
            />
        </div>
      </div>
  );
}
