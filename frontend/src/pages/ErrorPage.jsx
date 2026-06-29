import { Link, useLocation } from "react-router-dom"

const ERROR_COPY = {
  403: {
    title: "Access denied",
    description: "You don't have permission to access this resource.",
  },
  404: {
    title: "Page not found",
    description: "The requested resource could not be found.",
  },
  500: {
    title: "Server error",
    description: "Something went wrong on our side. Please try again shortly.",
  },
  503: {
    title: "Service unavailable",
    description: "The service is temporarily unavailable. Please try again later.",
  },
  network: {
    title: "Network error",
    description: "Unable to connect. Please check your internet connection.",
  },
}

function ErrorPage() {
  const { search } = useLocation()
  const code = new URLSearchParams(search).get("code") || "500"
  const details = ERROR_COPY[code] || ERROR_COPY[500]

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-3">Error {code}</p>
      <h1 className="heading-lg text-3xl">{details.title}</h1>
      <p className="text-body mt-3 text-[var(--text-soft)]">{details.description}</p>
      <div className="mt-8 flex gap-3">
        <button type="button" className="btn btn-secondary" onClick={() => window.location.reload()}>
          Retry
        </button>
        <Link to="/dashboard" className="btn btn-primary">Go to dashboard</Link>
      </div>
    </div>
  )
}

export default ErrorPage
