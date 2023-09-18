import React, { useState } from "react"
import CargoSelect from "./CargoSelect"
import tripulacionService from "../../services/tripulacionService"

const AgregarTripulante = () => {
  const [tripulante, setTripulante] = useState({
    idTripulacion: null,
    nombre: "",
    apellido: "",
    cargo: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setTripulante({ ...tripulante, [name]: value })
  }

const handleSubmit = (e) => {
  e.preventDefault()

  // Verificación de campos llenos
  if (!tripulante.nombre || !tripulante.apellido || !tripulante.cargo) {
    window.alert("Por favor, complete todos los campos.")
    return
  }

  if (tripulante.cargo === "all") {
    window.alert("No se seleccionó ningún campo.")
    return
  }

  tripulacionService.addTripulante(tripulante)

  setTripulante({
    idTripulacion: null,
    nombre: "",
    apellido: "",
    cargo: "",
  })
}

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border border-gray-300 rounded"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={tripulante.nombre}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="apellido"
          >
            Apellido
          </label>
          <input
            type="text"
            name="apellido"
            value={tripulante.apellido}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cargo"
          >
            Cargo
          </label>
          <CargoSelect
            name="cargo"
            value={tripulante.cargo}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  )
}

export default AgregarTripulante
