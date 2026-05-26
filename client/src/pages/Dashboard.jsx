import { useNavigate } from "react-router-dom"
import { LayoutDashboard, Radio, Settings } from "lucide-react"
import AppHeader from "../components/AppHeader"

function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "null")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  const cards = [
    {
      icon: LayoutDashboard,
      title: "Overview",
      description: "Your smart home control panel. More features coming soon.",
    },
    {
      icon: Radio,
      title: "Devices",
      description: "Connect lights, sensors, and hubs in one place.",
    },
    {
      icon: Settings,
      title: "Automations",
      description: "Build routines that run when you need them.",
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <AppHeader userName={user?.name} onLogout={handleLogout} />

      <main className="mx-auto max-w-5xl px-6 py-10 fade-in">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Manage your connected home at a glance.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-xl border border-white/10 bg-[var(--color-surface-raised)] p-5 transition-colors hover:border-white/20"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                <Icon size={20} />
              </span>
              <h3 className="font-medium text-white">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
