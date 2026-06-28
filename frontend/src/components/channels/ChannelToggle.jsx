import { useState } from "react"
import { toggleChannel } from "../../api/channels"

function ChannelToggle({ channel, onToggle }) {
  const [loading, setLoading] = useState(false)
  const isOn = channel.state

  const handleToggle = async () => {
    setLoading(true)
    try {
      const { data } = await toggleChannel(channel._id)
      onToggle?.(data)
    } catch (err) {
      alert(err.response?.data?.message || "Toggle failed")
    } finally {
      setLoading(false)
    }
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
  )
}

export default ChannelToggle
