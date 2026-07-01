import { Link } from "react-router-dom"
import ChannelToggle from "../components/channels/ChannelToggle"
import PageHeader from "../components/layout/PageHeader"
import EmptyState from "../components/ui/EmptyState"
import Spinner from "../components/ui/Spinner"
import StatusBadge from "../components/ui/StatusBadge"
import { useHomeData } from "../hooks/useHomeData"
import { getRecentActiveDevice } from "../utils/device"
import { formatRelativeTime } from "../utils/format"
import MagicRings from "../components/MagicRings"
import { useTheme } from "../hooks/useTheme"

const RING_COLORS = {
  light: { color: "#3b82f6", colorTwo: "#60a5fa" },
  dark: { color: "#ef4444", colorTwo: "#f87171" },
}

function Dashboard() {
  const { isDark } = useTheme()
  const ringColors = isDark ? RING_COLORS.dark : RING_COLORS.light
  const { devices, channels, loading, error, reload } = useHomeData()
  const activeDevice = getRecentActiveDevice(devices)
  const activeChannels = activeDevice
    ? channels.filter((ch) => String(ch.device?._id ?? ch.device) === activeDevice._id)
    : []



  return (
    <div>
      <PageHeader title="Overview" subtitle="Quick control for your most recently active device" />
      
      {/* {error && <p className="alert-error">{error}</p>} */}

      {loading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : !activeDevice ? (
        <EmptyState
          title="No devices yet"
          description="Register a device to see its channels here for quick control."
          action={<Link to="/devices" className="btn btn-primary">Add device</Link>}
        />
      ) : (
        <section>
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
            <div className="order-1 min-h-[220px] w-full shrink-0 sm:min-h-[260px] lg:order-2 lg:h-[280px] lg:w-1/2 lg:min-h-0">
              <MagicRings color={ringColors.color} colorTwo={ringColors.colorTwo} />
            </div>

            <div className="card order-2 flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:order-1">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="heading-md text-xl">{activeDevice.name}</h2>
                  <StatusBadge online={activeDevice.online} />

                </div>
                <p className="text-body-sm mt-1">
                  {activeDevice.deviceId} · Last seen {formatRelativeTime(activeDevice.lastSeen)}
                </p>
              </div>
              <Link to={`/devices/${activeDevice._id}`} className="btn btn-secondary shrink-0">Device settings</Link>
            </div>
          </div>

          {activeChannels.length === 0 ? (
            <EmptyState
              title="No channels on this device"
              description="Add channels to control lights, fans, and switches from here."
              action={<Link to={`/devices/${activeDevice._id}`} className="btn btn-primary">Add channels</Link>}
            />
          ) : (
            <>
              <h3 className="eyebrow mb-4">Channels</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {activeChannels.map((channel) => (
                  <ChannelToggle key={channel._id} channel={{ ...channel, deviceName: activeDevice.name }} onToggle={reload} />
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </div>
  )
}

export default Dashboard
