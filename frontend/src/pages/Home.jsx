import { useState } from "react"
import { Link } from "react-router-dom"
import ThemeToggle from "../components/ThemeToggle"
import { useAuthStore } from "../store/authStore"

const platforms = [
  {
    title: "ESP8266",
    desc: "Flash the universal firmware once and manage everything from the cloud.",
    icon: "📶",
  },
  {
    title: "ESP32",
    desc: "Same firmware, more GPIO — scale from hobby to industrial setups.",
    icon: "🔌",
  },
  {
    title: "Hardware",
    desc: "Relays, switches, sensors, motors, lights, pumps & industrial gear.",
    icon: "⚙️",
  },
  {
    title: "Cloud Dashboard",
    desc: "Channels, automations, and control logic — all configured remotely.",
    icon: "☁️",
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
    <div className="faq-item">
      <button
        type="button"
        className="faq-question"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {question}
        <span className={`faq-chevron${open ? " open" : ""}`}>⌄</span>
      </button>
      {open && <p className="faq-answer">{answer}</p>}
    </div>
  )
}

function Home() {
  const token = useAuthStore((s) => s.token)

  return (
    <div className="page">
      <header className="nav">
        <div className="container nav-inner">
          <Link to="/" className="nav-brand">Sync Sphere</Link>

          <nav className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>

          <div className="nav-actions ">
            {token ? (

              <Link to="/dashboard" className="btn btn-primary">Open Dashboard</Link>
            ) : (
              <>
                <ThemeToggle />
                <Link to="/login" className="btn btn-link hidden-sm">Log in</Link>
                <Link to="/register" className="btn btn-primary">Get Started</Link>
              </>
            )}

          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <p className="eyebrow">IoT Automation Platform</p>
          <div className="hero-content mt-4">
            <h1 className="heading-xl">
              One universal firmware<br />for every ESP device
            </h1>
            <p className="body-lg mt-6">
              Stop rewriting and reflashing firmware for every automation project.
              Flash once on ESP8266 or ESP32 — then manage channels, automations,
              and control logic remotely from the cloud.
            </p>
            <div className="gap-actions mt-8">
              {token ? (
                <>
                  <Link to="/dashboard" className="btn btn-primary mt-6 mb-8">Open your Device</Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary">Connect your first device</Link>
                </>
              )}

            </div>
            <div className="rating mt-8">
              <span className="badge">ESP8266</span>
              <span className="badge">ESP32</span>
              <span className="badge">MQTT</span>
              <span className="badge">Cloud Config</span>
            </div>
          </div>

          <div className="grid-products mt-10">
            {platforms.map((p) => (
              <div key={p.title} className="product-card">
                <div className="product-card-icon">{p.icon}</div>
                <p className="eyebrow">{p.title}</p>
                <p className="body-sm">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="trust-pill">
            <span>⚡</span>
            Firmware stays the same — configuration comes from the cloud
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section section-muted">
        <div className="container">
          <div className="section-header section-header-center">
            <p className="eyebrow mb-6">Core Concept</p>
            <h2 className="heading-lg">
              Separate firmware from configuration.<br />Transform any ESP without reflashing.
            </h2>
            <p className="body-lg mt-6">
              Traditional IoT systems require firmware changes whenever hardware
              configuration changes. Sync Sphere solves this by keeping one
              universal firmware on every device while behaviour is defined in the cloud.
            </p>
          </div>
          <div className="grid-features">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <h3 className="heading-md">{f.title}</h3>
                <p className="body mt-4">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Firmware layer */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow mb-6">Firmware Layer</p>
            <h2 className="heading-lg">
              One firmware handles connectivity.<br />The cloud handles everything else.
            </h2>
            <p className="body-lg mt-4">
              The universal firmware does not contain project-specific logic.
              All behaviour is controlled through cloud configuration.
            </p>
          </div>
          <div className="grid-features">
            {firmwareCapabilities.map((cap) => (
              <div key={cap} className="feature-card">
                <p className="heading-md">✓ {cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow mb-6">Use Cases</p>
            <h2 className="heading-lg">One firmware. Endless automation possibilities.</h2>
          </div>
          <div className="testimonials-scroll">
            {useCases.map((u) => (
              <div key={u.title} className="testimonial-card">
                <p className="heading-md">{u.title}</p>
                <p className="body mt-4">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA block */}
      <section className="section">
        <div className="container">
          <div className="cta-block-dark">
            <h2 className="heading-lg">
              Flash once. Configure forever from the cloud.
            </h2>
            <p className="body-lg mt-4">
              Register your ESP device, map your hardware, and start automating —
              without writing another line of firmware.
            </p>
            {token ? (
              <>
                <Link to="/dashboard" className="btn btn-primary btn-on-dark mt-8">Open your Device</Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-on-dark mt-8">
                  Get started
                </Link>
              </>
            )}

          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="how-it-works" className="section section-muted">
        <div className="container">
          <div className="section-header section-header-center">
            <p className="eyebrow mb-6">System Architecture</p>
            <h2 className="heading-lg">Four steps from flash to full automation.</h2>
          </div>
          <div className="grid-steps">
            {steps.map((s) => (
              <div key={s.num}>
                <p className="step-num">{s.num}</p>
                <h3 className="heading-md mt-4">{s.title}</h3>
                <p className="body mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            {token ? (
              <>
                <Link to="/dashboard" className="btn btn-primary">Open your Device</Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary">Connect your first device</Link>
              </>
            )}

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container container-narrow">
          <div className="section-header section-header-center">
            <h2 className="heading-lg">Questions about Sync Sphere?</h2>
          </div>
          {faqs.map((f) => (
            <FaqItem key={f.q} question={f.q} answer={f.a} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-block">
            <h2 className="heading-lg">Ready to automate without reflashing?</h2>
            <p className="body-lg mt-4">
              Join Sync Sphere — one universal firmware for ESP8266 and ESP32,
              infinite configurations from the cloud.
            </p>
            {token ? (

              <Link to="/dashboard" className="btn btn-primary mt-8">Open Dashboard</Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary mt-8">Create your account</Link>
              </>
            )}

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <p className="nav-brand">Sync Sphere</p>
            <p className="body mt-4 max-w-sm">
              A cloud-based IoT automation platform. One universal firmware for
              ESP devices — configuration and control logic managed remotely.
            </p>
          </div>
          <div>
            <p className="eyebrow">Platform</p>
            <a href="#features" className="footer-link">Features</a>
            <a href="#how-it-works" className="footer-link">Architecture</a>
            <Link to="/register" className="footer-link">Sign up</Link>
          </div>
          <div>
            <p className="eyebrow">Account</p>
            <Link to="/login" className="footer-link">Log in</Link>
            <Link to="/register" className="footer-link">Register</Link>
            <a href="#faq" className="footer-link">FAQ</a>
          </div>
        </div>
        <div className="container footer-bottom">
          © {new Date().getFullYear()} Sync Sphere. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Home
