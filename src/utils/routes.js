import React from "react"
import { Route, Routes } from "react-router-dom"
import HomeDashboard from "../components/Home/HomeDashboard"
import PasajesDashboard from "../components/Pasajes/PasajesDashboard"
import FlightResultsDashboard from "../components/Pasajes/FlightResultsDashboard"
import ClientDashboard from "../components/Clientes/ClientDashboard"
import AeropuertosDashboard from "../components/Aeropuertos/AeropuertosDashboard"
import AvionesDashboard from "../components/Aviones/AvionesDashboard"
import ModelosDashboard from "../components/Modelos/ModelosDashboard"
import RutasDashboard from "../components/Rutas/RutasDashboard"
import ClienteDetalle from "../components/Clientes/ClienteDetalle"

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeDashboard />} />
      <Route path="/pasajes" element={<PasajesDashboard />} />
      <Route path="/resultados" element={<FlightResultsDashboard />} />
      <Route path="/usuarios" element={<ClientDashboard />} />
      <Route path="/rutas" element={<RutasDashboard />} />
      <Route path="/aeropuertos" element={<AeropuertosDashboard />} />
      <Route path="/aviones" element={<AvionesDashboard />} />
      <Route path="/modelos" element={<ModelosDashboard />} />
      <Route path="/usuarios/:id" element={<ClienteDetalle />} />
    </Routes>
  )
}

export default RoutesConfig
