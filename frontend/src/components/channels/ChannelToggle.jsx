import { useState } from "react"
import { Trash } from "lucide-react"
import { toggleChannel } from "../../api/channels"
import { getApiErrorMessage, shouldRedirectToGlobalErrorPage } from "../../api/errorHandler"

function ChannelToggle({ channel, onToggle, onRemove }) {
  const [loading, setLoading] = useState(false)
  const isOn = channel.state

  const handleToggle = async () => {
    setLoading(true)
    try {
      const { data } = await toggleChannel(channel._id)
      onToggle?.(data)
    } catch (err) {
      if (!shouldRedirectToGlobalErrorPage(err)) {
        alert(getApiErrorMessage(err, "Toggle failed"))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    onRemove?.(channel)
  }

  return (
    <div
      className={`card flex items-center justify-between gap-4 ${isOn ? "border-[color-mix(in_srgb,var(--accent)_35%,var(--border))]" : ""}`}
    >
      <div className="min-w-0">
        <p className="heading-md truncate">{channel.name}</p>
        <p className="text-body-sm mt-1">
          {channel.room} · GPIO {channel.gpio} · {channel.channelId}
        </p>
        {channel.deviceName && (
          <p className="text-body-sm mt-0.5">{channel.deviceName}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {onRemove && (
          <button
            type="button"
            onClick={handleRemove}
            className="btn btn-ghost px-2 py-2 text-[var(--text-soft)] hover:text-red-500"
            aria-label={`Remove ${channel.name}`}
          >
            <Trash size={16} />
          </button>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={handleToggle}
          className={`relative h-8 w-14 shrink-0 rounded-full transition ${isOn ? "bg-[var(--accent)]" : "bg-[var(--text-muted)]"} ${loading ? "opacity-60" : ""}`}
          aria-label={`Turn ${channel.name} ${isOn ? "off" : "on"}`}
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-[var(--surface)] shadow transition ${isOn ? "left-7" : "left-1"}`}
          />
        </button>
      </div>
    </div>
  )
}

export default ChannelToggle
