import React, { useState } from "react"
import avionesService from "../../services/avionesService"

const ModeloForm = () => {
  const [modelo, setModelo] = useState({
    modelo: "",
    autonomia: "",
  })

  const handleChange = (e) => {
    setModelo({ ...modelo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await avionesService.postModelo(modelo)
      console.log("Modelo agregado exitosamente")

      setModelo({
        modelo: "",
        autonomia: "",
      })
    } catch (error) {
      console.error("Error al aregar el modelo:", error)
      window.alert("Ocurrió un error al agregar el modelo")
    }
  }

  

  return (
    <div className="container mx-auto px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border border-gray-300 rounded"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="modelo"
          >
            Nombre del Modelo
          </label>
          <input
            type="text"
            name="modelo"
            value={modelo.modelo}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="autonomia"
          >
            Autonomía
          </label>
          <input
            type="text"
            name="autonomia"
            value={modelo.autonomia}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
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

export default ModeloForm
