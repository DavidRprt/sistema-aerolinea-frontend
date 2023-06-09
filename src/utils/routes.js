import React from "react"
import { Route, Routes } from "react-router-dom"
import HomeDashboard from "../components/Home/HomeDashboard"
import TicketsDashboard from "../components/Tickets/TicketsDashboard"
import FlightResultsDashboard from "../components/Tickets/FlightResultsDashboard"
import ClientDashboard from "../components/Clientes/ClientDashboard"
import AeropuertosDashboard from "../components/Aeropuertos/AeropuertosDashboard"
import AvionesDashboard from "../components/Aviones/AvionesDashboard"
import ModelosDashboard from "../components/Modelos/ModelosDashboard"
import RutasDashboard from "../components/Rutas/RutasDashboard"

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeDashboard />} />
      <Route path="/pasajes" element={<TicketsDashboard />} />
      <Route path="/resultados" element={<FlightResultsDashboard />} />
      <Route path="/usuarios" element={<ClientDashboard />} />
      <Route path="/rutas" element={<RutasDashboard />} />
      <Route path="/aeropuertos" element={<AeropuertosDashboard />} />
      <Route path="/aviones" element={<AvionesDashboard />} />
      <Route path="/modelos" element={<ModelosDashboard />} />
    </Routes>
  )
}

export default RoutesConfig
