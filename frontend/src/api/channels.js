import api from "./axios"

export const fetchChannels = (deviceMongoId) =>
  api.get(`/channels/${deviceMongoId}`)

export const createChannel = (deviceMongoId, data) =>
  api.post(`/channels/${deviceMongoId}`, data)

export const toggleChannel = (channelMongoId) =>
  api.put(`/channels/toggle/${channelMongoId}`)

export const deleteChannel = (channelMongoId) =>
  api.delete(`/channels/remove/${channelMongoId}`)
