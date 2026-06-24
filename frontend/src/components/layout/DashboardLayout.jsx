import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function DashboardLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-app py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
