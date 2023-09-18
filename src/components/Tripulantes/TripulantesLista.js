import React, { useState, useEffect } from "react"
import tripulacionService from "../../services/tripulacionService"
import CargoSelect from "./CargoSelect"

const TripulanteTable = () => {
  const [tripulantes, setTripulantes] = useState([])
  const [filteredTripulantes, setFilteredTripulantes] = useState([])
  const [selectedCargo, setSelectedCargo] = useState("all")

  const updateCargo = (cargo) => {
    setSelectedCargo(cargo)

  }

  useEffect(() => {
    const fetchTripulantes = async () => {
      try {
        const data = await tripulacionService.getAllTripulantes()
        setTripulantes(data)
        setFilteredTripulantes(data)
      } catch (error) {
        console.error("Error al obtener los tripulantes:", error)
      }
    }

    fetchTripulantes()
  }, [])

useEffect(() => {
  if (selectedCargo === "all") {
    setFilteredTripulantes(tripulantes)
  } else {
   const filtered = tripulantes.filter(
     (tripulante) =>
       tripulante.cargo &&
       tripulante.cargo.idCargo &&
       tripulante.cargo.idCargo.toString() === selectedCargo
   )
    setFilteredTripulantes(filtered)
  }
}, [selectedCargo, tripulantes])


  return (
    <div className="container mx-auto p-4">
      <h2>Listado de Tripulantes</h2>
      <label>Filtrar por cargo: </label>
      <CargoSelect
        value={selectedCargo}
        onChange={(e) => updateCargo(e.target.value)}
      />
      <table className="min-w-full bg-white border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Apellido</th>
            <th className="py-2 px-4 border-b">Cargo</th>
            <th className="py-2 px-4 border-b">Nombre Tripulación</th>
          </tr>
        </thead>
        <tbody>
          {filteredTripulantes.map((tripulante) => (
            <tr key={tripulante.idtripulante}>
              <td className="py-2 px-4 border-b text-center">
                {tripulante.nombre}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {tripulante.apellido}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {tripulante.cargo.nombre}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {tripulante.tripulacion.nombre}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TripulanteTable
