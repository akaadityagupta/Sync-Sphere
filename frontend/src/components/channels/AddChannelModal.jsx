import { useState } from "react"
import Modal from "../ui/Modal"
import { createChannel } from "../../api/channels"
import { getApiErrorMessage, shouldRedirectToGlobalErrorPage } from "../../api/errorHandler"

const TYPES = [
  { value: "light", label: "Light" },
  { value: "fan", label: "Fan" },
  { value: "switch", label: "Switch" },
]

function AddChannelModal({ open, onClose, deviceMongoId, onAdded }) {
  const [form, setForm] = useState({
    channelId: "",
    name: "",
    gpio: "",
    type: "switch",
    room: "General",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await createChannel(deviceMongoId, {
        ...form,
        gpio: Number(form.gpio),
      })
      onAdded?.(data)
      setForm({ channelId: "", name: "", gpio: "", type: "switch", room: "General" })
      onClose()
    } catch (err) {
      if (!shouldRedirectToGlobalErrorPage(err)) {
        alert(getApiErrorMessage(err, "Failed to create channel"))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Add channel">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="channelId" className="label">Channel ID</label>
            <input id="channelId" className="input" placeholder="ch1" value={form.channelId} onChange={(e) => setForm({ ...form, channelId: e.target.value })} required />
          </div>
          <div>
            <label htmlFor="gpio" className="label">GPIO pin</label>
            <input id="gpio" type="number" className="input" placeholder="4" value={form.gpio} onChange={(e) => setForm({ ...form, gpio: e.target.value })} required />
          </div>
        </div>
        <div>
          <label htmlFor="chName" className="label">Name</label>
          <input id="chName" className="input" placeholder="Ceiling light" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="type" className="label">Type</label>
            <select id="type" className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="room" className="label">Room</label>
            <input id="room" className="input" placeholder="Living room" value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} />
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Creating…" : "Create channel"}
        </button>
      </form>
    </Modal>
  )
}

export default AddChannelModal
