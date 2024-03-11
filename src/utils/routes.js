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
import Forgot from "../components/Login/Forgot"
import LoginForm from "../components/Login/LoginForm"
import ResetPassword from "../components/Login/ResetPassword"
import NotFound from "../components/NotFound"
import AdminPanel from "../components/Administrar/AdminPanel"
import SignUpForm from "../components//Login/SignUpForm"
import TripulantesDashboard from "../components/Tripulantes/TripulantesDashboard"
import TripulacionDashboard from "../components/Tripulacion/TripulacionDashboard"
import TripulanteDetalles from "../components/Tripulantes/TripulanteDetalles"
import ReservaForm from "../components/Reservas/ReservaForm"
import ReservaDetalle from "../components/Reservas/ReservaDetalle"
import PagoConTarjeta from "../components/Pasajes/PagoConTarjeta"

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeDashboard />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="*" element={<NotFound />} />

      <Route
        path="/rutas"
        element={<PrivateRoute component={RutasDashboard} />}
      />
      <Route path="/admin" element={<PrivateRoute component={AdminPanel} />} />
      <Route
        path="/pago-con-tarjeta"
        element={<PrivateRoute component={PagoConTarjeta} />}
      />
      <Route
        path="/pasajes"
        element={<PrivateRoute component={PasajesDashboard} />}
      />
      <Route
        path="/resultados"
        element={<PrivateRoute component={FlightResultsDashboard} />}
      />
      <Route
        path="/reserva"
        element={<PrivateRoute component={ReservaForm} />}
      />
      <Route
        path="/reserva/:id"
        element={<PrivateRoute component={ReservaDetalle} />}
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
      <Route
        path="/tripulaciones"
        element={<PrivateRoute component={TripulacionDashboard} />}
      />
      <Route
        path="/detalles-del-tripulante/:idtripulante"
        element={<PrivateRoute component={TripulanteDetalles} />}
      />
    </Routes>
  )
}

export default RoutesConfig
