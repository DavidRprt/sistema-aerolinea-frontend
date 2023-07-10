import React, { useState } from "react"

const AvionForm = () => {
  const [avion, setAvion] = useState({
    nombre: "",
    anio: "",
    capacidadTurista: "",
    capacidadPremium: "",
    capacidadBusiness: "",
    idModelo: "",
  })

  const handleChange = (e) => {
    setAvion({ ...avion, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Lógica para enviar el objeto `avion` mediante una solicitud POST
    console.log(avion)
    // Resetear el formulario
    setAvion({
      nombre: "",
      anio: "",
      capacidadTurista: "",
      capacidadPremium: "",
      capacidadBusiness: "",
      idModelo: "",
    })
  }

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border border-gray-300 rounded"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={avion.nombre}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="anio"
            >
              Año
            </label>
            <input
              type="text"
              name="anio"
              value={avion.anio}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="capacidadTurista"
            >
              Capacidad Turista
            </label>
            <input
              type="text"
              name="capacidadTurista"
              value={avion.capacidadTurista}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="capacidadPremium"
            >
              Capacidad Premium
            </label>
            <input
              type="text"
              name="capacidadPremium"
              value={avion.capacidadPremium}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="capacidadBusiness"
            >
              Capacidad Business
            </label>
            <input
              type="text"
              name="capacidadBusiness"
              value={avion.capacidadBusiness}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="idModelo"
            >
              ID Modelo
            </label>
            <input
              type="text"
              name="idModelo"
              value={avion.idModelo}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-end mt-4">
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

export default AvionForm
