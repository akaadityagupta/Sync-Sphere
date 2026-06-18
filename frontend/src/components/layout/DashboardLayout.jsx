import { Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"
import Navbar from "./Navbar"

function DashboardLayout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
          
        <Outlet />

      </main>
    </div>
  )
}

export default DashboardLayout
