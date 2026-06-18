import api from "./axios"

export const fetchDevices = () => api.get("/devices")

export const registerDevice = (data) => api.post("/devices", data)

export const deleteDevice = (deviceId) => api.delete(`/devices/${deviceId}`)
