import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import PageHeader from "../components/layout/PageHeader"
import Spinner from "../components/ui/Spinner"
import EmptyState from "../components/ui/EmptyState"
import StatusBadge from "../components/ui/StatusBadge"
import ChannelToggle from "../components/channels/ChannelToggle"
import AddChannelModal from "../components/channels/AddChannelModal"
import { fetchDevices } from "../api/devices"
import { fetchChannels, deleteChannel } from "../api/channels"
import { getApiErrorMessage, shouldRedirectToGlobalErrorPage } from "../api/errorHandler"
import { formatRelativeTime } from "../utils/format"

function DeviceDetail() {
  const { deviceId } = useParams()
  const [device, setDevice] = useState(null)
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const load = useCallback(async () => {
    try {
      setError(null)
      const { data: devices } = await fetchDevices()
      const found = devices.find((d) => d._id === deviceId)
      setDevice(found || null)
      if (found) {
        const { data } = await fetchChannels(deviceId)
        setChannels(data)
      }
    } catch (err) {
      if (!shouldRedirectToGlobalErrorPage(err)) {
        setError(getApiErrorMessage(err, "Failed to load device details"))
      }
    } finally {
      setLoading(false)
    }
  }, [deviceId])

  useEffect(() => {
    load()
    const id = setInterval(load, 15000)
    return () => clearInterval(id)
  }, [load])

  const handleChannelUpdate = (updated) => {
    setChannels((prev) => prev.map((ch) => (ch._id === updated._id ? updated : ch)))
  }

  const handleRemoveChannel = async (channel) => {
    const ok = window.confirm(`Remove channel "${channel.name}"?`)
    if (!ok) return
    try {
      await deleteChannel(channel._id)
      setChannels((prev) => prev.filter((ch) => ch._id !== channel._id))
    } catch (err) {
      if (!shouldRedirectToGlobalErrorPage(err)) {
        alert(getApiErrorMessage(err, "Failed to remove channel"))
      }
    }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>

  if (!device) {
    return (
      <EmptyState
        title="Device not found"
        description="This device may have been removed or you don't have access."
        action={<Link to="/devices" className="btn btn-secondary">Back to devices</Link>}
      />
    )
  }

  return (
    <div>
      <Link to="/devices" className="text-body-sm mb-4 inline-block hover:underline">← Devices</Link>

      <PageHeader
        title={device.name}
        subtitle={`${device.deviceId} · Last seen ${formatRelativeTime(device.lastSeen)}`}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge online={device.online} />
            <button type="button" onClick={() => setModalOpen(true)} className="btn btn-primary">Add channel</button>
          </div>
        }
      />
      {error && <p className="alert-error">{error}</p>}

      {channels.length === 0 ? (
        <EmptyState
          title="No channels"
          description="Create channels with GPIO pins so your ESP can control hardware."
          action={<button type="button" onClick={() => setModalOpen(true)} className="btn btn-primary">Add channel</button>}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {channels.map((channel) => (
            <ChannelToggle key={channel._id} channel={channel} onToggle={handleChannelUpdate} onRemove={handleRemoveChannel} />
          ))}
        </div>
      )}

      <AddChannelModal open={modalOpen} onClose={() => setModalOpen(false)} deviceMongoId={deviceId} onAdded={(ch) => setChannels((prev) => [...prev, ch])} />
    </div>
  )
}

export default DeviceDetail
