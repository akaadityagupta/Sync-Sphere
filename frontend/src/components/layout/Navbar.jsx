import { NavLink, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"

function Navbar() {
  const navigate = useNavigate()
  const { user, logout: clearAuth } = useAuthStore()

  const logout = () => {
    clearAuth()
    navigate("/login")
  }

  return (
    <div>
        <h1>Navbar</h1>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar
