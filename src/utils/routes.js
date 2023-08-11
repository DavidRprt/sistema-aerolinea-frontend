import React from "react"
import { Route, Routes } from "react-router-dom"
import PrivateRoute from "./privateRoute"
import HomeDashboard from "../components/Home/HomeDashboard"
import PasajesDashboard from "../components/Pasajes/PasajesDashboard"
import FlightResultsDashboard from "../components/Pasajes/FlightResultsDashboard"
import ClientDashboard from "../components/Clientes/ClientDashboard"
import AeropuertosDashboard from "../components/Aeropuertos/AeropuertosDashboard"
import AvionesDashboard from "../components/Aviones/AvionesDashboard"
import ModelosDashboard from "../components/Modelos/ModelosDashboard"
import RutasDashboard from "../components/Rutas/RutasDashboard"
import ClienteDetalle from "../components/Clientes/ClienteDetalle"
import Checkout from "../components/Pasajes/Checkout"
import LoginForm from "../components/LoginForm"
import NotFound from "../components/NotFound"
import SignUpForm from "../components/SignUpForm"

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeDashboard />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="signup" element={<SignUpForm />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<PrivateRoute />}>
        <Route path="/rutas" element={<RutasDashboard />} />
        <Route path="/pasajes" element={<PasajesDashboard />} />
        <Route path="/resultados" element={<FlightResultsDashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/usuarios" element={<ClientDashboard />} />
        <Route path="/aeropuertos" element={<AeropuertosDashboard />} />
        <Route path="/aviones" element={<AvionesDashboard />} />
        <Route path="/modelos" element={<ModelosDashboard />} />
        <Route path="/usuarios/:id" element={<ClienteDetalle />} />
      </Route>
    </Routes>
  )
}

export default RoutesConfig
