import React from "react";

export default function UserInputField({
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
  label,
  required,
  autoFocus,
}) {
  return (
    <div className="form-floating mb-3">
      <input
        className="form-control rounded-pill"
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
        required={required}
        autoFocus={autoFocus}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
