import React from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

export default function Candidate(props)
{
    return <div className="col col-lg-4 p-4">
    <div className="card">
      <div className="card-body">
        <div>
          <h3 className="text-primary">Candidate</h3>


        </div>
        <div>
            <li className="bg-primary rounded p-2 m-2">Tag1</li>
            <li className="bg-primary rounded p-2 m-2">Tag2</li>
            <li className="bg-primary rounded p-2 m-2">Tag3</li>
            <li className="bg-primary rounded p-2 m-2">Tag4</li>
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