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
    <div className="mb-4">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type={show ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input pr-14"
          required={required}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium"
          style={{ color: "var(--text-soft)" }}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  )
}

export default PasswordField
