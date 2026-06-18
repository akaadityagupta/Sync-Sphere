export function getRecentActiveDevice(devices) {
  if (!devices?.length) return null

  return [...devices].sort((a, b) => {
    if (a.online !== b.online) return Number(b.online) - Number(a.online)
    return new Date(b.lastSeen || 0) - new Date(a.lastSeen || 0)
  })[0]
}
