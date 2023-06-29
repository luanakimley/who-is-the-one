import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

import { SERVER_HOST } from "../config/global_constants";



export default function Candidate(props)
{
    const candidate = props.params;
     const [isScrollable, setIsScrollable] = useState(false);

     const handleDivClick = () => {
        setIsScrollable(!isScrollable);
     };

    return <div className="col col-lg-4 p-4">
    <div className="card card-candidate">
      <div className="card-body">
        <div>
          <h1 className="text-primary">{props.index}: &nbsp;&nbsp;{candidate.candidate_name}</h1>
          <h1>{candidate.score} %</h1>


        </div>
        <div className="text-secondary">


<div className="text-white scroll-bar-candidate ">
  {candidate.tags.map((tag) => (
      <li className="bg-primary rounded p-2 m-3 tag-candidate">{tag.tag_description}</li>
  ))}
</div>



        </div>

      </div>
    </div>
  </div>
}