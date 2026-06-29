import { useCallback, useEffect, useState } from "react"
import { fetchDevices } from "../api/devices"
import { fetchChannels } from "../api/channels"
import { getApiErrorMessage, shouldRedirectToGlobalErrorPage } from "../api/errorHandler"

export function useHomeData(pollMs = 15000) {
  const [devices, setDevices] = useState([])
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    try {
      setError(null)
      const { data: deviceList } = await fetchDevices()
      setDevices(deviceList)

      const channelResults = await Promise.all(
        deviceList.map((d) =>
          fetchChannels(d._id).then((r) =>
            r.data.map((ch) => ({ ...ch, deviceName: d.name, deviceId: d.deviceId }))
          )
        )
      )
      setChannels(channelResults.flat())
    } catch (err) {
      if (shouldRedirectToGlobalErrorPage(err)) return
      setError(getApiErrorMessage(err, "Failed to load data"))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    if (!pollMs) return undefined
    const id = setInterval(load, pollMs)
    return () => clearInterval(id)
  }, [load, pollMs])

  const onlineCount = devices.filter((d) => d.online).length
  const activeChannels = channels.filter((c) => c.state).length

  return {
    devices,
    channels,
    loading,
    error,
    reload: load,
    stats: {
      deviceCount: devices.length,
      onlineCount,
      channelCount: channels.length,
      activeChannels,
    },
  }
}
