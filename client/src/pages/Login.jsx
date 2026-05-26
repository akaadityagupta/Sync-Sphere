import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import AuthLayout from "../components/AuthLayout"
import PasswordField from "../components/PasswordField"

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post("/auth/login", {
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
          "Login failed"
      )
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link to="/register" className="link">
            Register
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Your password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" className="btn-primary btn-block mt-6">
          Sign in
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login
