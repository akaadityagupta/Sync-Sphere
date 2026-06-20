import { Link } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="page auth-page">
      <header className="nav">
        <div className="container nav-inner">
          <Link to="/" className="nav-brand">
            Sync Sphere
          </Link>

          <div className="nav-actions">
            <ThemeToggle />
            <Link to="/" className="btn btn-link hidden-sm">
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="auth-main">
        <div className="auth-card card card-padded">
          <p className="eyebrow">Account</p>
          <h1 className="heading-md mt-4">{title}</h1>
          {subtitle && <p className="body-sm mt-2">{subtitle}</p>}

          <div className="auth-form">{children}</div>

          {footer && <p className="auth-footer body-sm">{footer}</p>}
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
