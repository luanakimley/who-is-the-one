import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

import { SERVER_HOST } from "../config/global_constants";



export default function Candidate(props)
{
    const candidate = props.params;
    const tagMatch = props.tagsMatch;

     const [isScrollable, setIsScrollable] = useState(false);

     const handleDivClick = () => {
        setIsScrollable(!isScrollable);
     };

    return <div className="col col-lg-4 p-4">
    <div className="card card-candidate">
      <div className="card-body">

          <div className="position-relative">
            <div className="index-circle">
              {props.index}
            </div>
          </div>

      <div style={{marginTop: "20px"}}>
          <h1 className="text-primary">{candidate.candidate_name}</h1>
          <h2 style={{marginTop: "12px"}}>{candidate.score} %</h2>
        </div>
        <div className="text-secondary">


<div className="text-white scroll-bar-candidate d-flex justify-content-center">
  <div className="tag-column">
    {candidate.tags
      .sort((a, b) => tagMatch.includes(b.tag_id) - tagMatch.includes(a.tag_id))
      .map((tag) => (
        <div
          key={tag.tag_id}
          className="rounded p-2 m-3 tag-candidate"
          style={{
            backgroundColor: tagMatch.includes(tag.tag_id) ? '#AFDCEB' : '#0D6EFD'
          }}
        >
          {tag.tag_description}
        </div>
      ))}
  </div>
</div>



        </div>

      </div>
    </div>
  </div>
}