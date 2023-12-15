import React, { useState } from "react"
import rutasService from "../../services/rutasService"
import { RiDeleteBin5Line } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { eliminarRuta } from "../../reducers/rutaReducer"

const RutasLista = () => {
  const dispatch = useDispatch()
  const rutas = useSelector((state) => state.rutas)
  const [filtro, setFiltro] = useState("todos")

  const confirmarEliminacion = async (idRuta) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      await rutasService.deleteRuta(idRuta)
      dispatch(eliminarRuta(idRuta))
    }
  }

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value)
  }

const rutasFiltradas = rutas.slice().sort((a, b) => {
  switch (filtro) {
    case "duracion":
      return a.duracion - b.duracion
    case "precio":
      return a.preciobase - b.preciobase
    case "horario":
      return a.horariosalida.localeCompare(b.horariosalida)
    default:
      return 0
  }
})

  return (
    <div className="overflow-x-auto p-4">
      <div className="mb-4">
        <div className="flex items-center justify-start gap-2">
          <h2 className="text-lg">Ordenar por:</h2>
          <select
            className="select select-bordered w-full max-w-xs"
            value={filtro}
            onChange={handleFiltroChange}
          >
            <option value="todos">Todos</option>
            <option value="duracion">Duración</option>
            <option value="precio">Precio</option>
            <option value="horario">Horario de Salida</option>
          </select>
        </div>
      </div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th>ID Ruta</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Precio Base</th>
            <th>Horario de Salida</th>
            <th>Días de Operación</th>
            <th>Duración</th>
            <th>Avión</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rutasFiltradas.map((ruta) => (
            <tr key={ruta.idruta}>
              <td>{ruta.idruta}</td>
              <td>{ruta.idorigen}</td>
              <td>{ruta.iddestino}</td>
              <td>${ruta.preciobase}</td>
              <td>{ruta.horariosalida}</td>
              <td>
                {ruta.lunes && "Lunes "}
                {ruta.martes && "Martes "}
                {ruta.miercoles && "Miércoles "}
                {ruta.jueves && "Jueves "}
                {ruta.viernes && "Viernes "}
                {ruta.sabado && "Sábado "}
                {ruta.domingo && "Domingo "}
              </td>
              <td>{ruta.duracion} horas</td>
              <td>{ruta.avion.nombre}</td>
              <td>
                <button
                  className="btn btn-xs btn-error"
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
