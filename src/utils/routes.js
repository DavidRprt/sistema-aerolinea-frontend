import React from "react"
import { Route, Routes } from "react-router-dom"
import HomeDashboard from "../components/HomeDashboard"


const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeDashboard />} />
      <Route path="/pasajes" />
      <Route path="/usuarios" />
      <Route path="/rutas" />
      <Route path="/aeropuertos" />
    </Routes>
  )
};

export default RoutesConfig
