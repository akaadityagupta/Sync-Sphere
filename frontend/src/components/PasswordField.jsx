import { useState } from "react"

function PasswordField({
  label,
  name,
  placeholder,
  value,
  onChange,
  required = true,
}) {
  const [show, setShow] = useState(false)

  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="form-password">
        <input
          id={name}
          type={show ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="form-input"
          required={required}
        />
        <button
          type="button"
          className="form-password-toggle"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  )
}

export default PasswordField
