import React from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

export default function Candidate(props)
{
    return <div className="col col-lg-4 p-4">
    <div className="card">
      <div className="card-body">
        <div>
          <h3>Candidate 1</h3>
        </div>
        <button


          className="btn btn-danger position-absolute top-0 end-0"
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  </div>
}