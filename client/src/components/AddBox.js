import React, { useState } from "react";
import BackButton from "./BackButton";

export default function AddBox(props) {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
      <div className="bg-white p-5 rounded-box">
        <BackButton params={props.params.backButtonTitle} />
        <div className="form-floating m-3">
          <input
            type="text"
            id="category"
            placeholder={`${props.params.objectText} name`}
            onChange={handleTextChange}
            className="form-control rounded-pill w-100 mb-3"
          />
          <label htmlFor={props.params.objectText}>{props.params.objectText} name</label>
        </div>
        <button
          className="btn btn-primary mt-4 w-25"
          disabled={text.length === 0}
          onClick={(e) => props.params.callback(e, text)}
        >
          Add
        </button>
      </div>
  );
}
