import React from "react";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";
import Swal from "sweetalert2";

export function CandidateTagBox(props) {
  const deleteCandidate = () => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0275d8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(
          `${SERVER_HOST}/remove_candidate/${props.candidate.candidate_id}`
        );
        Swal.fire({
          title: "Deleted!",
          text: "Candidate has been deleted.",
          icon: "success",
          confirmButtonColor: "#0275d8",
        });
      }
    });
  };

  return (
    <div key={props.candidate.candidate_id} className="col col-lg-4 p-4">
      <div className="card p-3">
        <div className="card-body text-center">
          <div>
            <h2 id={props.candidate.candidate_id} onClick={props.handleClick}>
              {props.candidate.candidate_name}
            </h2>
          </div>
          <button
            onClick={deleteCandidate}
            className="btn position-absolute top-0 end-0"
          >
            <span className="bi bi-x"></span>
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
