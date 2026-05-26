import Logo from "./Logo"

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="page-shell">
      <div className="card fade-in">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo to="/" className="mb-6" />
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 text-sm text-zinc-400">{subtitle}</p>
          )}
        </div>

        {children}

        {footer && (
          <p className="mt-6 text-center text-sm text-zinc-400">{footer}</p>
        )}
      </div>
    </div>
  )
}

export default AuthLayout
