import { Link } from "react-router-dom"
import { Home as HomeIcon, Shield, Zap } from "lucide-react"
import Logo from "../components/Logo"

function Home() {
  return (
    <div className="page-shell">
      <div className="fade-in mx-auto w-full max-w-lg text-center">
        <div className="mb-10 flex justify-center">
          <Logo to={null} className="scale-110" />
        </div>

        <p className="text-sm font-medium uppercase tracking-widest text-indigo-400/90">
          Smart home automation
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Control your space,
          <span className="block text-zinc-400">effortlessly.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-zinc-400">
          Connect devices, automate routines, and manage everything from one calm dashboard.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/login" className="btn-primary w-full sm:w-auto sm:min-w-[140px]">
            Sign in
          </Link>
          <Link to="/register" className="btn-secondary w-full sm:w-auto sm:min-w-[140px]">
            Create account
          </Link>
        </div>

        <ul className="mt-16 grid gap-4 text-left sm:grid-cols-3">
          {[
            { icon: HomeIcon, text: "Unified device hub" },
            { icon: Zap, text: "Quick automations" },
            { icon: Shield, text: "Secure by default" },
          ].map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-400"
            >
              <Icon size={16} className="shrink-0 text-indigo-400" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
