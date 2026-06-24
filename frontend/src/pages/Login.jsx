import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useAuthStore } from "../store/authStore"
import AuthLayout from "../components/AuthLayout"
import PasswordField from "../components/PasswordField"

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [formData, setFormData] = useState({ email: "", password: "" })

  const from = location.state?.from?.pathname || "/dashboard"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post("/auth/login", formData)
      setAuth(data.token, data.user)
      navigate(from, { replace: true })
    } catch (error) {
      alert(error.response?.data?.message || error.response?.data?.error || "Login failed")
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your devices and automations"
      footer={<>Don&apos;t have an account? <Link to="/register" className="link-accent">Create one</Link></>}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="label">Email</label>
          <input id="email" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} className="input" required />
        </div>
        <PasswordField label="Password" name="password" placeholder="Your password" value={formData.password} onChange={handleChange} />
        <button type="submit" className="btn btn-primary mt-2 w-full">Sign in</button>
      </form>
    </AuthLayout>
  )
}

export default Login
