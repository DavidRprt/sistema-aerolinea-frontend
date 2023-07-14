import React, { useState, useEffect } from "react"
import rutasService from "../../services/rutasService"
import { RiDeleteBin5Line } from "react-icons/ri"

const RutasLista = () => {
  const [rutas, setRutas] = useState([])

  async function obtenerRutas() {
    try {
      const rutas = await rutasService.getAll()
      setRutas(rutas)
    } catch (error) {
      console.error("Error al obtener las rutas:", error)
    }
  }

  const confirmarEliminacion = (idRuta) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      // Lógica para eliminar la ruta con el id correspondiente
      console.log("Ruta eliminada:", idRuta)
    }
  }

  useEffect(() => {
    obtenerRutas()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID Ruta</th>
            <th className="py-2 px-4 border-b">Origen</th>
            <th className="py-2 px-4 border-b">Destino</th>
            <th className="py-2 px-4 border-b">Precio Base</th>
            <th className="py-2 px-4 border-b">Horario de Salida</th>
            <th className="py-2 px-4 border-b">Días de Operación</th>
            <th className="py-2 px-4 border-b">Duración</th>
            <th className="py-2 px-4 border-b">Avión</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {rutas.map((ruta) => (
            <tr key={ruta.idruta}>
              <td className="py-2 px-4 border-b text-center">{ruta.idruta}</td>
              <td className="py-2 px-4 border-b text-center">
                {ruta.idorigen}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {ruta.iddestino}
              </td>
              <td className="py-2 px-4 border-b text-center">
                ${ruta.preciobase}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {ruta.horariosalida}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {ruta.lunes && "Lunes "}
                {ruta.martes && "Martes "}
                {ruta.miercoles && "Miércoles "}
                {ruta.jueves && "Jueves "}
                {ruta.viernes && "Viernes "}
                {ruta.sabado && "Sábado "}
                {ruta.domingo && "Domingo "}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {ruta.duracion} horas
              </td>
              <td className="py-2 px-4 border-b text-center">
                {ruta.avion.nombre}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => confirmarEliminacion(ruta.idruta)}
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

export default RutasLista
