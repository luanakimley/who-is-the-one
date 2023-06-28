import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

import { SERVER_HOST } from "../config/global_constants";



export default function Candidate(props)
{
    return <div className="col col-lg-4 p-4">
    <div className="card">
      <div className="card-body">
        <div>
          <h1 className="text-primary">{props.index}</h1>
          <h3 className="text-primary">{props.props.candidate_name}</h3>


        </div>
        <div className="text-primary">
        <h1>Score: {props.props.score}</h1>

        <div className="text-white">

        {props.props.tags.map((tag) => (
            <li key= {tag.tag_id} className="bg-primary rounded p-2 m-2">{tag.tag_description}</li>
            ))
}
        </div>
        </div>

      </div>
    </div>
  </div>
}