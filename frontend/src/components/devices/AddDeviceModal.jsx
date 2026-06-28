import { useState } from "react"
import Modal from "../ui/Modal"
import { registerDevice } from "../../api/devices"

function AddDeviceModal({ open, onClose, onAdded }) {
  const [form, setForm] = useState({ deviceId: "", name: "" })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await registerDevice(form)
      onAdded?.(data)
      setForm({ deviceId: "", name: "" })
      onClose()
    } catch (err) {
      alert(err.response?.data?.message || "Failed to register device")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Add device">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="deviceId" className="label">Hardware ID</label>
          <input id="deviceId" className="input" placeholder="e.g. esp001" value={form.deviceId} onChange={(e) => setForm({ ...form, deviceId: e.target.value })} required />
        </div>
        <div>
          <label htmlFor="deviceName" className="label">Display name</label>
          <input id="deviceName" className="input" placeholder="Living room hub" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Adding…" : "Add device"}
        </button>
      </form>
    </Modal>
  )
}

export default AddDeviceModal
