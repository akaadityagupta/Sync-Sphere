import { Link } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen">
      <header className="nav-shell">
        <div className="container-app flex items-center justify-between py-4">
          <Link to="/" className="nav-brand">
            Sync Sphere
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/" className="btn btn-link hidden sm:inline-flex">
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container-app flex min-h-[calc(100vh-72px)] items-center justify-center py-10">
        <div className="card w-full max-w-md p-6 sm:p-8">
          <p className="eyebrow">Account</p>
          <h1 className="heading-md mt-3">{title}</h1>
          {subtitle && <p className="text-body-sm mt-2">{subtitle}</p>}

          <div className="mt-6">{children}</div>

          {footer && (
            <p className="text-body-sm mt-6 border-t pt-5 text-center" style={{ borderColor: "var(--border)" }}>
              {footer}
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
