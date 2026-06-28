import { Link } from "react-router-dom"
import { Trash } from "lucide-react"
import StatusBadge from "../ui/StatusBadge"
import { formatRelativeTime } from "../../utils/format"

function DeviceCard({ device, channelCount = 0, onRemove }) {
  const handleRemove = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove?.(device)
  }

  return (
    <div className="card flex items-start justify-between gap-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/devices/${device._id}`} className="min-w-0 flex-1 no-underline">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="heading-md">{device.name}</h3>
          <StatusBadge online={device.online} />
        </div>
        <p className="text-body-sm mt-2">ID: {device.deviceId}</p>
        <p className="text-body-sm mt-1">
          {channelCount} channel{channelCount !== 1 ? "s" : ""} · Seen{" "}
          {formatRelativeTime(device.lastSeen)}
        </p>
      </Link>

      <button
        type="button"
        onClick={handleRemove}
        className="btn btn-ghost shrink-0 px-2 py-2 text-[var(--text-soft)] hover:text-red-500"
        aria-label={`Remove ${device.name}`}
      >
        <Trash size={16} />
      </button>
    </div>
  )
}

export default DeviceCard
