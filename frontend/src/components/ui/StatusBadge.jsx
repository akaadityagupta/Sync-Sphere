function StatusBadge({ online }) {
  return (
    <span className={`status-badge ${online ? "status-badge-online" : ""}`}>
      <span className="status-dot" />
      {online ? "Online" : "Offline"}
    </span>
  )
}

export default StatusBadge
