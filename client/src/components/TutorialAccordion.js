import React from "react";

export default function TutorialAccordion(props) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button fs-4 text-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${props.id}`}
          aria-expanded="true"
          aria-controls={props.id}
        >
          {props.title}
        </button>
      </h2>
      <div
        id={props.id}
        className="accordion-collapse collapse"
        data-bs-parent="#tutorialAccordion"
      >
        <div className="accordion-body">{props.content}</div>
      </div>
    </div>
  );
}
