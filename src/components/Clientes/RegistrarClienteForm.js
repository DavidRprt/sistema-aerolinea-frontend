import React, { useState } from "react"

const AgregarCliente = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    pasaporte: "",
    email: "",
    telefono: "",
  })

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(cliente)
  }

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border border-gray-300 rounded"
      >
        <div className="grid grid-cols-2 gap-4">
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
              value={cliente.nombre}
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
              value={cliente.apellido}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pasaporte"
            >
              Pasaporte
            </label>
            <input
              type="text"
              name="pasaporte"
              value={cliente.pasaporte}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={cliente.email}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="telefono"
            >
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={cliente.telefono}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Registrar Cliente
          </button>
        </div>
      </form>
    </div>
  )
}

export default AgregarCliente
