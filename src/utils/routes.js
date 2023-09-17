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
import LoginForm from "../components/Login/LoginForm"
import NotFound from "../components/NotFound"
import SignUpForm from "../components//Login/SignUpForm"
import TripulantesDashboard from "../components/Tripulantes/TripulantesDashboard"

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeDashboard />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="*" element={<NotFound />} />

      <Route
        path="/rutas"
        element={<PrivateRoute component={RutasDashboard} />}
      />
      <Route
        path="/pasajes"
        element={<PrivateRoute component={PasajesDashboard} />}
      />
      <Route
        path="/resultados"
        element={<PrivateRoute component={FlightResultsDashboard} />}
      />
      <Route path="/checkout" element={<PrivateRoute component={Checkout} />} />
      <Route
        path="/usuarios"
        element={<PrivateRoute component={ClientDashboard} />}
      />
      <Route
        path="/aeropuertos"
        element={<PrivateRoute component={AeropuertosDashboard} />}
      />
      <Route
        path="/aviones"
        element={<PrivateRoute component={AvionesDashboard} />}
      />
      <Route
        path="/modelos"
        element={<PrivateRoute component={ModelosDashboard} />}
      />
      <Route
        path="/usuarios/:id"
        element={<PrivateRoute component={ClienteDetalle} />}
      />
      <Route
        path="/tripulantes"
        element={<PrivateRoute component={TripulantesDashboard} />}
      />
    </Routes>
  )
}

export default RoutesConfig