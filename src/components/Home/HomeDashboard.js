import React, { useState } from "react"
import MillasGrafico from "../Reportes/MillasGrafico"
import ClasesGrafico from "../Reportes/ClasesGrafico"
import AeropuertosGrafico from "../Reportes/AeropuertosGrafico"

const HomeDashboard = () => {
  const [activeReport, setActiveReport] = useState("clases")

  const renderReport = () => {
    switch (activeReport) {
      case "millas":
        return <MillasGrafico />
      case "clases":
        return <ClasesGrafico />
      case "aeropuertos":
        return <AeropuertosGrafico />
      default:
        return <div>Seleccione un reporte</div>
    }
  }

  return (
    <div>
      <div className="bg-gray-800 p-4 text-white">
        <button onClick={() => setActiveReport("millas")} className="mr-4">
          Reporte de Millas
        </button>
        <button onClick={() => setActiveReport("clases")} className="mr-4">
          Reporte de Clases
        </button>
        <button onClick={() => setActiveReport("aeropuertos")}>
          Reporte de Aeropuertos
        </button>
      </div>
      <div className="p-4">{renderReport()}</div>
    </div>
  )
}

export default HomeDashboard
