import { useState } from "react"
import { Link } from "react-router-dom"
import ThemeToggle from "../components/ThemeToggle"
import { useAuthStore } from "../store/authStore"
import { CodeXml, Cpu, Unplug, Cloud, Zap } from "lucide-react"

const platforms = [
  {
    title: "Firmware",
    desc: "Flash the universal firmware once and manage everything from the cloud.",
    icon: <CodeXml size={24} />,
  },
  {
    title: "Device",
    desc: "Same firmware, more GPIO , scale from small to industrial setups.",
    icon: <Cpu size={24} />,
  },
  {
    title: "Hardware",
    desc: "Relays, switches, sensors, motors, lights, pumps & industrial gear.",
    icon: <Unplug size={24} />,
  },
  {
    title: "Cloud Dashboard",
    desc: "Channels, automations, and control logic — all configured remotely.",
    icon: <Cloud size={24} />,
  },
]

const features = [
  {
    title: "One universal firmware",
    desc: "Flash the same firmware on every ESP device. No more writing and uploading different code for every project.",
  },
  {
    title: "Firmware separated from config",
    desc: "Traditional IoT needs a reflash when hardware changes. Sync Sphere pushes configuration from the cloud instead.",
  },
  {
    title: "Real-time MQTT sync",
    desc: "Devices register, receive commands, publish status, and send heartbeats — all over MQTT in real time.",
  },
  {
    title: "100% remote control",
    desc: "Channel mapping, automation rules, and device behaviour are managed entirely from the dashboard.",
  },
]

const useCases = [
  {
    title: "Home automation",
    desc: "Turn relays and sensors into smart lights, pumps, and switches — reconfigure rooms without touching firmware.",
  },
  {
    title: "Industrial monitoring",
    desc: "Connect motors, pumps, and equipment. Push new channel layouts from the cloud when your setup changes.",
  },
  {
    title: "Prototype to production",
    desc: "Start with a breadboard ESP8266, ship ESP32 in the field — same firmware, different cloud config.",
  },
  {
    title: "Multi-device deployments",
    desc: "Register dozens of devices, assign channels remotely, and run automations across your entire fleet.",
  },
]

const firmwareCapabilities = [
  "WiFi connectivity",
  "MQTT communication",
  "Device registration",
  "Receiving configuration",
  "Executing automation commands",
  "Publishing device status",
  "Sending heartbeat messages",
]

const steps = [
  {
    num: "01",
    title: "Flash universal firmware",
    desc: "Install the same firmware on any ESP8266 or ESP32 — no project-specific code.",
  },
  {
    num: "02",
    title: "Connect to Sync Sphere",
    desc: "Device registers over WiFi and MQTT, ready to receive cloud configuration.",
  },
  {
    num: "03",
    title: "Configure channels remotely",
    desc: "Map relays, sensors, and hardware through the dashboard — no reflash needed.",
  },
  {
    num: "04",
    title: "Automate from the cloud",
    desc: "Set rules, trigger actions, and monitor status — all managed remotely.",
  },
]

const faqs = [
  {
    q: "What is Sync Sphere?",
    a: "Sync Sphere is a cloud-based IoT automation platform built around one universal firmware for ESP devices. Flash once, then manage device behaviour, channels, automations, and control logic entirely from the dashboard.",
  },
  {
    q: "What is the universal firmware?",
    a: "A single firmware image installed on every ESP8266 and ESP32. It handles WiFi, MQTT, registration, configuration delivery, command execution, status publishing, and heartbeats — but contains no project-specific logic.",
  },
  {
    q: "Which devices are supported?",
    a: "ESP8266 and ESP32 are supported at the hardware layer. Connected peripherals can include relays, switches, sensors, motors, lights, pumps, and industrial equipment.",
  },
  {
    q: "Do I need to reflash when hardware changes?",
    a: "No. That is the core idea. Firmware stays the same while configuration is provided dynamically from the cloud. A single ESP can be transformed into different automation solutions without reflashing.",
  },
  {
    q: "How does cloud configuration work?",
    a: "Once a device connects to Sync Sphere, you define channels, automation settings, and control logic in the dashboard. The platform pushes that configuration to the device over MQTT — separating firmware from behaviour.",
  },
  {
    q: "What does the firmware handle vs the cloud?",
    a: "Firmware handles connectivity and execution: WiFi, MQTT, registration, receiving config, running commands, publishing status, and heartbeats. The cloud handles all project-specific logic — what each channel does and how automations behave.",
  },
]

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="card mb-3 p-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="heading-md text-base">{question}</span>
        <span className={`shrink-0 text-xl transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      {open && (
        <p className="text-body border-t px-5 pb-4 pt-0" style={{ borderColor: "var(--border)" }}>
          {answer}
        </p>
      )}
    </div>
  )
}

function Home() {
  const token = useAuthStore((s) => s.token)

  return (
    <div className="min-h-screen">
      <header className="nav-shell">
        <div className="container-app flex items-center justify-between gap-4 py-4">
          <Link to="/" className="nav-brand">Sync Sphere</Link>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            {token ? (
              <div className="flex items-center gap-6">
                <ThemeToggle />
                <Link to="/dashboard" className="btn btn-primary">Open Dashboard</Link>
              </div>

            ) : (
              <div className="flex items-center gap-6">
                <ThemeToggle />
                <Link to="/login" className="btn btn-link hidden sm:inline-flex">Log in</Link>
                <Link to="/register" className="btn btn-primary">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container-app">
          <p className="eyebrow">IoT Automation Platform</p>
          <div className="mt-4 max-w-3xl">
            <h1 className="heading-xl">
              One universal firmware<br />for every ESP device
            </h1>
            <p className="text-body-lg mt-6">
              Stop rewriting and reflashing firmware for every automation project.
              Flash once on ESP8266 or ESP32 — then manage channels, automations,
              and control logic remotely from the cloud.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {token ? (
                <Link to="/dashboard" className="btn btn-primary">Open your Device</Link>
              ) : (
                <Link to="/register" className="btn btn-primary">Connect your first device</Link>
              )}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="badge">ESP8266</span>
              <span className="badge">ESP32</span>
              <span className="badge">MQTT</span>
              <span className="badge">Cloud Config</span>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((p) => (
              <div key={p.title} className="card">
                <div className="mb-3 text-3xl">{p.icon}</div>
                <p className="eyebrow">{p.title}</p>
                <p className="text-body-sm mt-2">{p.desc}</p>
              </div>
            ))}
          </div>

          <p className="badge mt-8 inline-flex items-center gap-2 px-4 py-2">
            <span><Zap size={18} /></span>
            Firmware stays the same — configuration comes from the cloud
          </p>
        </div>
      </section>

      <section id="features" className="py-16 md:py-20" style={{ background: "var(--surface-muted)" }}>
        <div className="container-app">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow mb-6">Core Concept</p>
            <h2 className="heading-lg">
              Separate firmware from configuration.<br />Transform any ESP without reflashing.
            </h2>
            <p className="text-body-lg mt-6">
              Traditional IoT systems require firmware changes whenever hardware
              configuration changes. Sync Sphere solves this by keeping one
              universal firmware on every device while behaviour is defined in the cloud.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="card">
                <h3 className="heading-md">{f.title}</h3>
                <p className="text-body mt-4">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-app">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-6">Firmware Layer</p>
            <h2 className="heading-lg">
              One firmware handles connectivity.<br />The cloud handles everything else.
            </h2>
            <p className="text-body-lg mt-4">
              The universal firmware does not contain project-specific logic.
              All behaviour is controlled through cloud configuration.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {firmwareCapabilities.map((cap) => (
              <div key={cap} className="card">
                <p className="heading-md">✓ {cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "var(--surface-muted)" }}>
        <div className="container-app">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-6">Use Cases</p>
            <h2 className="heading-lg">One firmware. Endless automation possibilities.</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
            {useCases.map((u) => (
              <div key={u.title} className="card min-w-[280px] shrink-0 snap-start sm:min-w-[320px]">
                <p className="heading-md">{u.title}</p>
                <p className="text-body mt-4">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-app">
          <div
            className="rounded-2xl p-8 md:p-12"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            <h2 className="heading-lg" style={{ color: "inherit" }}>
              Flash once. Configure forever from the cloud.
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed opacity-90">
              Register your ESP device, map your hardware, and start automating —
              without writing another line of firmware.
            </p>
            {token ? (
              <Link
                to="/dashboard"
                className="btn mt-8 px-6 py-3"
                style={{ background: "var(--bg)", color: "var(--text)" }}
              >
                Open your Device
              </Link>
            ) : (
              <Link
                to="/register"
                className="btn mt-8 px-6 py-3"
                style={{ background: "var(--bg)", color: "var(--text)" }}
              >
                Get started
              </Link>
            )}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 md:py-20" style={{ background: "var(--surface-muted)" }}>
        <div className="container-app">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow mb-6">System Architecture</p>
            <h2 className="heading-lg">Four steps from flash to full automation.</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.num}>
                <p className="eyebrow" style={{ color: "var(--accent)" }}>{s.num}</p>
                <h3 className="heading-md mt-4">{s.title}</h3>
                <p className="text-body mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            {token ? (
              <Link to="/dashboard" className="btn btn-primary">Open your Device</Link>
            ) : (
              <Link to="/register" className="btn btn-primary">Connect your first device</Link>
            )}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-20">
        <div className="container-app mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <h2 className="heading-lg">Questions about Sync Sphere?</h2>
          </div>
          {faqs.map((f) => (
            <FaqItem key={f.q} question={f.q} answer={f.a} />
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-app">
          <div className="card text-center">
            <h2 className="heading-lg">Ready to automate without reflashing?</h2>
            <p className="text-body-lg mt-4">
              Join Sync Sphere — one universal firmware for ESP8266 and ESP32,
              infinite configurations from the cloud.
            </p>
            {token ? (
              <Link to="/dashboard" className="btn btn-primary mt-8">Open Dashboard</Link>
            ) : (
              <Link to="/register" className="btn btn-primary mt-8">Create your account</Link>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t py-12" style={{ borderColor: "var(--border)" }}>
        <div className="container-app grid gap-8 md:grid-cols-3">
          <div>
            <p className="nav-brand">Sync Sphere</p>
            <p className="text-body mt-4 max-w-sm">
              A cloud-based IoT automation platform. One universal firmware for
              ESP devices — configuration and control logic managed remotely.
            </p>
          </div>
          <div>
            <p className="eyebrow">Platform</p>
            <a href="#features" className="text-body-sm mt-3 block hover:underline">Features</a>
            <a href="#how-it-works" className="text-body-sm mt-2 block hover:underline">Architecture</a>
            <Link to="/register" className="text-body-sm mt-2 block hover:underline">Sign up</Link>
          </div>
          <div>
            <p className="eyebrow">Account</p>
            <Link to="/login" className="text-body-sm mt-3 block hover:underline">Log in</Link>
            <Link to="/register" className="text-body-sm mt-2 block hover:underline">Register</Link>
            <a href="#faq" className="text-body-sm mt-2 block hover:underline">FAQ</a>
          </div>
        </div>
        <div
          className="container-app text-body-sm mt-8 border-t pt-6 text-center"
          style={{ borderColor: "var(--border)" }}
        >
          © {new Date().getFullYear()} Sync Sphere. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Home
