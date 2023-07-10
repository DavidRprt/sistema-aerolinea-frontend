import React, { useState, useEffect } from "react"
import avionesService from "../../services/avionesService"
import { RiDeleteBin5Line } from "react-icons/ri"

const ModelosLista = () => {
  const [modelos, setModelos] = useState([])

  async function obtenerModelos() {
    try {
      const modelos = await avionesService.getModelos()
      setModelos(modelos)
    } catch (error) {
      console.error("Error al obtener los modelos:", error)
    }
  }

  const confirmarEliminacion = (idModelo) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      // Lógica para eliminar el modelo con el id correspondiente
      console.log("Modelo eliminado:", idModelo)
    }
  }

  useEffect(() => {
    obtenerModelos()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Modelo</th>
            <th className="py-2 px-4 border-b">Autonomía</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {modelos.map((modelo) => (
            <tr key={modelo.idModelo}>
              <td className="py-2 px-4 border-b text-center">
                {modelo.idModelo}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {modelo.modelo}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {modelo.autonomia} kilometros
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => confirmarEliminacion(modelo.idModelo)}
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

export default ModelosLista
