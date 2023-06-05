import React from "react"
import { Route, Routes } from "react-router-dom"
import HomeDashboard from "../components/HomeDashboard"
import TicketsDashboard from "../components/TicketsDashboard"
import FlightResultsDashboard from "../components/FlightResultsDashboard"
import ClientDashboard from "../components/ClientDashboard"

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeDashboard />} />
      <Route path="/pasajes" element={<TicketsDashboard />} />
      <Route path="/resultados" element={<FlightResultsDashboard />} />
      <Route path="/usuarios" element={<ClientDashboard />}/>
      <Route path="/rutas" />
      <Route path="/aeropuertos" />
    </Routes>
  )
}

export default RoutesConfig
