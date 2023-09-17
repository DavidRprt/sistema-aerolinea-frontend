import React, { useState } from "react"
import CargoSelect from "./CargoSelect" 

const AgregarTripulanteForm = ({ onAdd }) => {
  const [tripulante, setTripulante] = useState({
    nombre: "",
    apellido: "",
    antiguedad: "",
    idCargo: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setTripulante((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(tripulante)
    console.log(tripulante) // Imprime el objeto con los datos
    setTripulante({
      nombre: "",
      apellido: "",
      antiguedad: "",
      idCargo: "",
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto p-4">
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
          htmlFor="antiguedad"
        >
          Fecha de Ingreso
        </label>
        <input
          type="date"
          name="antiguedad"
          value={tripulante.antiguedad}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="idCargo"
        >
          Cargo
        </label>
        <CargoSelect
          name="idCargo"
          value={tripulante.idCargo}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2"
      >
        Agregar Tripulante
      </button>
    </form>
  )
}

export default AgregarTripulanteForm
