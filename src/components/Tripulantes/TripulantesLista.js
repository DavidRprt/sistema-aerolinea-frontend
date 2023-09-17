import React, { useState } from "react"
import { RiDeleteBin5Line } from "react-icons/ri"
import FiltrarTripulantes from "./FiltrarTripulantes"

const TripulantesLista = () => {
  const [filtro, setFiltro] = useState({}) // Para almacenar los filtros seleccionados
  const tripulantes = [] // Lista vacía de tripulantes

  // Función para filtrar la lista de tripulantes basado en los filtros seleccionados
  const tripulantesFiltrados = () => {
    return tripulantes.filter((tripulante) => {
      let pasaFiltro = true

      if (filtro.nombre) {
        pasaFiltro = pasaFiltro && tripulante.nombre.includes(filtro.nombre)
      }
      if (filtro.cargo) {
        pasaFiltro = pasaFiltro && tripulante.cargo === filtro.cargo
      }
      if (filtro.antiguedad) {
        const fechaIngreso = new Date(tripulante.fechaIngreso)
        const fechaFiltro = new Date(filtro.antiguedad)
        pasaFiltro = pasaFiltro && fechaIngreso <= fechaFiltro
      }

      return pasaFiltro
    })
  }

  return (
    <div className="container mx-auto p-4">
      <FiltrarTripulantes setFiltro={setFiltro} />
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Cargo</th>
            <th className="py-2 px-4 border-b">Fecha Ingreso</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {tripulantesFiltrados().map((tripulante) => (
            <tr key={tripulante.id}>
              <td className="py-2 px-4 border-b text-center">
                {tripulante.id}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {tripulante.nombre}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {tripulante.cargo}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {tripulante.fechaIngreso}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="text-red-500 hover:text-red-700"
                >
                  <RiDeleteBin5Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TripulantesLista
