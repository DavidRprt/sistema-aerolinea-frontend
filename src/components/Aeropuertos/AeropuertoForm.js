import React, { useState } from "react";

const AgregarAeropuerto = () => {
  const [aeropuerto, setAeropuerto] = useState({
    codigo: "",
    nombre: "",
    ciudad: "",
    pais: "",
    latitud: "",
    longitud: "",
    zonaHoraria: "",
  })

  const handleChange = (e) => {
    setAeropuerto({ ...aeropuerto, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(aeropuerto)

    setAeropuerto({
      codigo: "",
      nombre: "",
      ciudad: "",
      pais: "",
      latitud: "",
      longitud: "",
      zonaHoraria: "",
    })
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="  bg-white p-4 border border-gray-300 rounded">
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="codigo">
              Código
            </label>
            <input
              type="text"
              name="codigo"
              value={aeropuerto.codigo}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={aeropuerto.nombre}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ciudad">
              Ciudad
            </label>
            <input
              type="text"
              name="ciudad"
              value={aeropuerto.ciudad}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pais">
              País
            </label>
            <input
              type="text"
              name="pais"
              value={aeropuerto.pais}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitud">
              Latitud
            </label>
            <input
              type="text"
              name="latitud"
              value={aeropuerto.latitud}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitud">
              Longitud
            </label>
            <input
              type="text"
              name="longitud"
              value={aeropuerto.longitud}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zonaHoraria">
              Zona Horaria
            </label>
            <input
              type="text"
              name="zonaHoraria"
              value={aeropuerto.zonaHoraria}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
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

export default AgregarAeropuerto
