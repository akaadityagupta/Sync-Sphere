import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

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
    <div>
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
          className="input pr-10"
          required={required}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  )
}

export default PasswordField
