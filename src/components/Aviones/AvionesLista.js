import React, { useState, useEffect } from "react"
import avionesService from "../../services/avionesService"
import { RiDeleteBin5Line } from "react-icons/ri"

const AvionesLista = () => {
  const [aviones, setAviones] = useState([])

  async function obtenerAviones() {
    try {
      const aviones = await avionesService.getAll()
      console.log(aviones)
      setAviones(aviones)
    } catch (error) {
      console.error("Error al obtener los aviones:", error)
    }
  }

  const confirmarEliminacion = (idAvion) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      console.log("Avión eliminado:", idAvion)
    }
  }

  useEffect(() => {
    obtenerAviones()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Año</th>
            <th className="py-2 px-4 border-b">Turista</th>
            <th className="py-2 px-4 border-b">Premium</th>
            <th className="py-2 px-4 border-b">Business</th>
            <th className="py-2 px-4 border-b">Modelo</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {aviones.map((avion) => (
            <tr key={avion.idAvion}>
              <td className="py-2 px-4 border-b text-center">{avion.nombre}</td>
              <td className="py-2 px-4 border-b text-center">{avion.año}</td>
              <td className="py-2 px-4 border-b text-center">
                {avion.capacidadTurista}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {avion.capacidadPremium}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {avion.capacidadBusiness}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {avion.ModeloAvion.modelo}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => confirmarEliminacion(avion.idAvion)}
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

export default AvionesLista
