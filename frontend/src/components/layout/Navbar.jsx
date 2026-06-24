import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import ThemeToggle from "../ThemeToggle"

const links = [
  { to: "/dashboard", label: "Overview", end: true },
  { to: "/devices", label: "Devices" },
  { to: "/rooms", label: "Rooms" },
  { to: "/automations", label: "Automations" },
]

function Navbar() {
  const navigate = useNavigate()
  const { user, logout: clearAuth } = useAuthStore()

  const logout = () => {
    clearAuth()
    navigate("/login")
  }

  const pillClass = ({ isActive }) =>
    `nav-pill ${isActive ? "nav-pill-active" : ""}`

  return (
    <header className="nav-shell">
      <div className="container-app flex items-center justify-between gap-3 py-3">
        <Link to="/dashboard" className="nav-brand">
          Sync Sphere
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={pillClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="text-body-sm hidden sm:inline">{user?.name}</span>
          <ThemeToggle />
          <button type="button" onClick={logout} className="btn btn-secondary text-sm">
            Log out
          </button>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t px-4 py-2 md:hidden" style={{ borderColor: "var(--border)" }}>
        {links.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-pill shrink-0 text-xs ${isActive ? "nav-pill-active" : ""}`}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
