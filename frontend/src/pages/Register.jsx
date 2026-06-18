import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useAuthStore } from "../store/authStore"


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
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            <button type="submit">Create account</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    )
  }
  
  export default Register
  