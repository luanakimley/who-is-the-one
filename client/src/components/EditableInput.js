import React, { useState } from "react";
import { Tooltip } from "react-tooltip";

const EditableInput = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [textValue, setTextValue] = useState(props.value);

  const handleInputChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleSave = (e) => {
    props.handleSaveText(e, textValue);
    setIsEditable(false);
  };

  return (
    <div>
      {isEditable ? (
        <div className="input-group my-3">
          <input
            className="form-control"
            type="text"
            defaultValue={textValue}
            onChange={handleInputChange}
          />
          <button className="btn btn-outline-light" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <span
          id="title"
          data-tooltip-id="edit-tooltip"
          data-tooltip-content="Double click to edit!"
          onDoubleClick={() => setIsEditable(true)}
        >
          {textValue}
        </span>
      )}
      <Tooltip id="edit-tooltip" />
    </div>
  );
};

export default EditableInput;
