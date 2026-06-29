import { useCallback, useEffect, useState } from "react"
import PageHeader from "../components/layout/PageHeader"
import Spinner from "../components/ui/Spinner"
import EmptyState from "../components/ui/EmptyState"
import DeviceCard from "../components/devices/DeviceCard"
import AddDeviceModal from "../components/devices/AddDeviceModal"
import { fetchDevices, deleteDevice } from "../api/devices"
import { fetchChannels } from "../api/channels"
import { getApiErrorMessage, shouldRedirectToGlobalErrorPage } from "../api/errorHandler"

function Devices() {
  const [devices, setDevices] = useState([])
  const [channelCounts, setChannelCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const load = useCallback(async () => {
    try {
      setError(null)
      const { data } = await fetchDevices()
      setDevices(data)
      const counts = {}
      await Promise.all(
        data.map(async (d) => {
          const res = await fetchChannels(d._id)
          counts[d._id] = res.data.length
        })
      )
      setChannelCounts(counts)
    } catch (err) {
      if (!shouldRedirectToGlobalErrorPage(err)) {
        setError(getApiErrorMessage(err, "Failed to load devices"))
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const handleRemove = async (d) => {
    const ok = window.confirm(`Remove device "${d.name}"?`)
    if (!ok) return
    try {
      await deleteDevice(d.deviceId)
      setDevices((prev) => prev.filter((p) => p._id !== d._id))
      setChannelCounts((prev) => {
        const copy = { ...prev }
        delete copy[d._id]
        return copy
      })
    } catch (err) {
      if (!shouldRedirectToGlobalErrorPage(err)) {
        alert(getApiErrorMessage(err, "Failed to remove device"))
      }
    }
  }

  return (
    <div>
      <PageHeader
        title="Devices"
        subtitle="Manage ESP hubs and connected hardware"
        action={<button type="button" onClick={() => setModalOpen(true)} className="btn btn-primary">Add device</button>}
      />
      {error && <p className="alert-error">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : devices.length === 0 ? (
        <EmptyState
          title="No devices registered"
          description="Add your ESP device ID to start controlling GPIO channels over MQTT."
          action={<button type="button" onClick={() => setModalOpen(true)} className="btn btn-primary">Add device</button>}
        />
      ) : (
        <div className="grid gap-3">
          {devices.map((device) => (
            <DeviceCard key={device._id} device={device} channelCount={channelCounts[device._id] || 0} onRemove={handleRemove} />
          ))}
        </div>
      )}

      <AddDeviceModal open={modalOpen} onClose={() => setModalOpen(false)} onAdded={load} />
    </div>
  )
}

export default Devices
