import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useAuthStore } from "../store/authStore"
import AuthLayout from "../components/AuthLayout"
import PasswordField from "../components/PasswordField"

function Register() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match")
    }

    try {
      const { data } = await api.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      setAuth(data.token, data.user)
      navigate("/dashboard", { replace: true })
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed"
      )
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start connecting ESP devices to Sync Sphere"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <PasswordField
          label="Password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="form-field">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Repeat password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary auth-submit">
          Create account
        </button>
      </form>
    </AuthLayout>
  )
}

export default Register
