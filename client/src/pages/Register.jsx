import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import AuthLayout from "../components/AuthLayout"
import PasswordField from "../components/PasswordField"

function Register() {
  const navigate = useNavigate()
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
      const response = await api.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard")
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
      title="Create account"
      subtitle="Start automating your home"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="link">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="input"
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

        <div>
          <label htmlFor="confirmPassword" className="label">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Repeat password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <button type="submit" className="btn-primary btn-block mt-6">
          Create account
        </button>
      </form>
    </AuthLayout>
  )
}

export default Register
