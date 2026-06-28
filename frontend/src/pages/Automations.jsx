import { Link } from "react-router-dom"
import PageHeader from "../components/layout/PageHeader"

function Automations() {
  return (
    <div>
      <PageHeader title="Automations" subtitle="Rules and schedules — coming in a future release" />
      <div className="card text-center">
        <h2 className="heading-md">Coming soon</h2>
        <p className="text-body mt-3">
          Automations will let you build if-this-then-that rules, scheduled routines, and multi-device scenes.
        </p>
        <Link to="/devices" className="btn btn-primary mt-6">Manage devices</Link>
      </div>
    </div>
  )
}

export default Automations
