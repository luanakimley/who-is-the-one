import React, { useState } from 'react';

const EditableInput = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [textValue, setTextValue] = useState(props.value);

  const handleInputChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditable(false);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      setIsEditable(false);
    }
  };

  return (
    <div>
      {isEditable ? (
        <input
          type="text"
          value={textValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={handleInputKeyPress}
        />
      ) : (
        <span onDoubleClick={() => setIsEditable(true)}>{textValue}</span>
      )}
    </div>
  );
};

export default EditableInput;
