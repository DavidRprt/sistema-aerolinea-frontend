import React from "react"
import MillasGrafico from "../Reportes/MillasGrafico"
import ClasesGrafico from "../Reportes/ClasesGrafico"

const HomeDashboard = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="col-span-1">
        <MillasGrafico />
      </div>
      <div className="col-span-1">
        <ClasesGrafico />
      </div>
    </div>
  )
}

export default HomeDashboard
