export default function UserInputField({
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
  label,
  required
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
        required={required} // Convert the required prop to a boolean value
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
