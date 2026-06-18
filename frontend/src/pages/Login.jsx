import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import api from "../api/axios"
import { useAuthStore } from "../store/authStore"

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
        alert(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Login failed"
        )
      }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    )
}

export default Login