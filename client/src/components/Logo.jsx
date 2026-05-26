import { Link } from "react-router-dom"
import { Orbit } from "lucide-react"

function Logo({ to = "/", className = "" }) {
  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400">
        <Orbit size={20} strokeWidth={2} />
      </span>
      <span className="text-lg font-semibold tracking-tight text-white">
        Sync Sphere
      </span>
    </span>
  )

  if (to) {
    return (
      <Link to={to} className="inline-block hover:opacity-90 transition-opacity">
        {content}
      </Link>
    )
  }

  return content
}

export default Logo
