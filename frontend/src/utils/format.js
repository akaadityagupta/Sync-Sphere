export function formatRelativeTime(date) {
  if (!date) return "Never"
  const then = new Date(date).getTime()
  const diff = Date.now() - then
  const seconds = Math.floor(diff / 1000)

  if (seconds < 60) return "Just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

export function groupChannelsByRoom(channels) {
  return channels.reduce((acc, channel) => {
    const room = channel.room || "General"
    if (!acc[room]) acc[room] = []
    acc[room].push(channel)
    return acc
  }, {})
}
