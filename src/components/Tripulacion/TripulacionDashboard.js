import React, { useState, useEffect } from "react"
import tripulacionService from "../../services/tripulacionService"

const TripulantesDashboard = () => {
  const [tripulantes, setTripulantes] = useState([])

  useEffect(() => {
    const fetchTripulantes = async () => {
      try {
        const data = await tripulacionService.getAllTripulantes()
        setTripulantes(data)
      } catch (error) {
        console.error("Error al obtener los tripulantes:", error)
      }
    }

    fetchTripulantes()
  }, [])

  // Agrupar tripulantes por tripulación y luego por cargo
  const tripulacionesConCargos = tripulantes.reduce((acc, tripulante) => {
    const nombreTripulacion = tripulante.tripulacion.nombre
    const nombreCargo = tripulante.cargo.nombre

    if (!acc[nombreTripulacion]) {
      acc[nombreTripulacion] = {}
    }

    if (!acc[nombreTripulacion][nombreCargo]) {
      acc[nombreTripulacion][nombreCargo] = []
    }

    acc[nombreTripulacion][nombreCargo].push(tripulante.nombre)

    return acc
  }, {})

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(tripulacionesConCargos).map(
          ([nombreTripulacion, cargos]) => (
            <div
              key={nombreTripulacion}
              className="mb-6 p-4 bg-white shadow-md rounded"
            >
              <h2 className="text-2xl font-bold mb-4">{nombreTripulacion}</h2>
              {Object.entries(cargos).map(
                ([nombreCargo, nombresTripulantes]) => (
                  <div key={nombreCargo}>
                    <h3 className="text-xl font-semibold mb-2">
                      {nombreCargo}
                    </h3>
                    <ul>
                      {nombresTripulantes.map((nombreCompleto) => (
                        <li key={nombreCompleto} className="ml-4 list-disc">
                          {nombreCompleto}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default TripulantesDashboard
