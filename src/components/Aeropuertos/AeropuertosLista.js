import React, { useState, useEffect } from "react"
import aeropuertosService from "../../services/aeropuertosService"
import { RiDeleteBin5Line } from "react-icons/ri"

const AeropuertosLista = () => {
  const [aeropuertos, setAeropuertos] = useState([])

  async function obtenerAeropuertos() {
    try {
      const aeropuertos = await aeropuertosService.getAll()
      setAeropuertos(aeropuertos)
    } catch (error) {
      console.error("Error al obtener los aeropuertos:", error)
    }
  }

  const confirmarEliminacion = (idAeropuerto) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      aeropuertosService.deleteAeropuerto(idAeropuerto)
    }
  }

  useEffect(() => {
    obtenerAeropuertos()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Código</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Ciudad</th>
            <th className="py-2 px-4 border-b">País</th>
            <th className="py-2 px-4 border-b">Latitud</th>
            <th className="py-2 px-4 border-b">Longitud</th>
            <th className="py-2 px-4 border-b">Zona Horaria</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {aeropuertos.map((objeto) => (
            <tr key={objeto.idaeropuerto}>
              <td className="py-2 px-4 border-b text-center">
                {objeto.idaeropuerto}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {objeto.nombre}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {objeto.ciudad}
              </td>
              <td className="py-2 px-4 border-b text-center">{objeto.pais}</td>
              <td className="py-2 px-4 border-b text-center">
                {objeto.latitud}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {objeto.longitud}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {objeto.timezone}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => confirmarEliminacion(objeto.idaeropuerto)}
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

export default AeropuertosLista
