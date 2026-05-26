import Logo from "./Logo"

function AppHeader({ userName, onLogout }) {
  return (
    <header className="border-b border-white/10 bg-[var(--color-surface-raised)]/80 backdrop-blur-md sticky top-0 z-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-6">
          <Logo to={null} />
          {userName && (
            <p className="text-sm text-zinc-400 sm:border-l sm:border-white/10 sm:pl-6">
              Hi, <span className="text-zinc-200">{userName}</span>
            </p>
          )}
        </div>
        <button type="button" onClick={onLogout} className="btn-danger text-sm">
          Log out
        </button>
      </div>
    </header>
  )
}

export default AppHeader
