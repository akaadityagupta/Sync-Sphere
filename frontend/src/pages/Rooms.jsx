import PageHeader from "../components/layout/PageHeader"
import Spinner from "../components/ui/Spinner"
import EmptyState from "../components/ui/EmptyState"
import ChannelToggle from "../components/channels/ChannelToggle"
import { useHomeData } from "../hooks/useHomeData"
import { groupChannelsByRoom } from "../utils/format"

function Rooms() {
  const { channels, loading, error, reload } = useHomeData()
  const byRoom = groupChannelsByRoom(channels)
  const roomNames = Object.keys(byRoom).sort()

  return (
    <div>
      <PageHeader title="Rooms" subtitle="Channels grouped by room — control your home by space" />
      {error && <p className="alert-error">{error}</p>}

      {loading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : roomNames.length === 0 ? (
        <EmptyState title="No rooms yet" description="Assign a room when creating channels on a device. They will appear here automatically." />
      ) : (
        <div className="space-y-10">
          {roomNames.map((room) => (
            <section key={room}>
              <h2 className="heading-md">
                {room} <span className="text-body-sm font-normal">({byRoom[room].length})</span>
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {byRoom[room].map((channel) => (
                  <ChannelToggle key={channel._id} channel={channel} onToggle={reload} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

export default Rooms
