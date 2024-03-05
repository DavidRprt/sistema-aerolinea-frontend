import React, { useState, useEffect } from "react"
import tripulacionService from "../../services/tripulacionService"

const TripulantesDashboard = () => {
  const [tripulaciones, setTripulaciones] = useState([])

  useEffect(() => {
    const fetchTripulaciones = async () => {
      try {
        const data = await tripulacionService.getAllTripulaciones()
        setTripulaciones(data)
      } catch (error) {
        console.error("Error al obtener las tripulaciones:", error)
      }
    }

    fetchTripulaciones()
  }, [])

   const tripulacionCompleta = (tripulacion) => {
     const { tripulantes, esquema_tripulacion } = tripulacion
     const { cantidad_tripulantes_min, cantidad_tripulantes_max } =
       esquema_tripulacion

     // Contadores de los diferentes cargos
     let pilotos = 0
     let copilotos = 0
     let jefesDeCabina = 0
     let tcps = 0

     tripulantes.forEach((tripulante) => {
       if (tripulante.idcargo === 1) {
         pilotos++
       } else if (tripulante.idcargo === 2) {
         copilotos++
       } else if (tripulante.idcargo === 3) {
         jefesDeCabina++
       } else if (tripulante.idcargo === 4) {
         tcps++
       }
     })

     return (
       pilotos === 1 &&
       copilotos === 1 &&
       jefesDeCabina === 1 &&
       tcps >= cantidad_tripulantes_min &&
       tcps <= cantidad_tripulantes_max
     )
   }


  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tripulaciones.map((tripulacion) => (
        <div
          key={tripulacion.idtripulacion}
          className="bg-white rounded-lg shadow-md p-4"
        >
          <h2 className="text-xl font-bold mb-2">{tripulacion.nombre}</h2>
          <p className="mb-2">
            <span className="font-semibold">Tipo de tripulación:</span>{" "}
            {tripulacion.esquema_tripulacion.nombre}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Cantidad Mínima de TCP:</span>{" "}
            {tripulacion.esquema_tripulacion.cantidad_tripulantes_min}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Cantidad Máxima de TCP:</span>{" "}
            {tripulacion.esquema_tripulacion.cantidad_tripulantes_max}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Duración Mínima:</span>{" "}
            {tripulacion.esquema_tripulacion.duracion_minima} horas
          </p>
          <p className="mb-2">
            <span className="font-semibold">Duración Máxima:</span>{" "}
            {tripulacion.esquema_tripulacion.duracion_maxima} horas
          </p>
          <h3 className="text-xl font-semibold mb-2">Pilotos:</h3>
          <ul>
            {tripulacion.tripulantes.map((tripulante) =>
              tripulante.idcargo === 1 ? (
                <li key={tripulante.idtripulante}>
                  {tripulante.nombre} {tripulante.apellido}
                </li>
              ) : null
            )}
            {tripulacion.tripulantes.filter(
              (tripulante) => tripulante.idcargo === 1
            ).length === 0 && <li>No asignado</li>}
          </ul>
          <h3 className="text-xl font-semibold mb-2">Copilotos:</h3>
          <ul>
            {tripulacion.tripulantes.map((tripulante) =>
              tripulante.idcargo === 2 ? (
                <li key={tripulante.idtripulante}>
                  {tripulante.nombre} {tripulante.apellido}
                </li>
              ) : null
            )}
            {tripulacion.tripulantes.filter(
              (tripulante) => tripulante.idcargo === 2
            ).length === 0 && <li>No asignado</li>}
          </ul>
          <h3 className="text-xl font-semibold mb-2">Jefes de Cabina:</h3>
          <ul>
            {tripulacion.tripulantes.map((tripulante) =>
              tripulante.idcargo === 3 ? (
                <li key={tripulante.idtripulante}>
                  {tripulante.nombre} {tripulante.apellido}
                </li>
              ) : null
            )}
            {tripulacion.tripulantes.filter(
              (tripulante) => tripulante.idcargo === 3
            ).length === 0 && <li>No asignado</li>}
          </ul>
          <h3 className="text-xl font-semibold mb-2">TCP:</h3>
          <ul>
            {tripulacion.tripulantes.map((tripulante) =>
              tripulante.idcargo === 4 ? (
                <li key={tripulante.idtripulante}>
                  {tripulante.nombre} {tripulante.apellido}
                </li>
              ) : null
            )}
            {tripulacion.tripulantes.filter(
              (tripulante) => tripulante.idcargo === 4
            ).length === 0 && <li>No asignado</li>}
          </ul>
          {!tripulacionCompleta(tripulacion) && (
            <div className="bg-red-600 rounded-lg shadow-md text-white p-4 mt-4 flex items-center justify-center">
              <svg
                className="h-8 w-8 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <div>
                <p className="text-lg font-semibold">
                  Tripulación incompleta
                </p>
                <p className="text-sm">
                  Verifica que todos los roles estén cubiertos correctamente.
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default TripulantesDashboard
