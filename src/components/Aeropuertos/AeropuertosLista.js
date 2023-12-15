import React, { useState } from "react"
import aeropuertosService from "../../services/aeropuertosService"
import { eliminarAeropuerto } from "../../reducers/aeropuertoReducer"
import { useDispatch, useSelector } from "react-redux"
import { RiDeleteBin5Line } from "react-icons/ri"

const AeropuertosLista = () => {
  const dispatch = useDispatch()
  const aeropuertos = useSelector((state) => state.aeropuertos)
  const [filtro, setFiltro] = useState("todos")

  const confirmarEliminacion = async (idAeropuerto) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      await aeropuertosService.deleteAeropuerto(idAeropuerto)
      dispatch(eliminarAeropuerto(idAeropuerto))
    }
  }

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value)
  }

  const aeropuertosFiltrados = aeropuertos.slice().sort((a, b) => {
    switch (filtro) {
      case "pais":
        return a.pais.localeCompare(b.pais)
      case "zonaHoraria":
        return a.timezone.localeCompare(b.timezone)
      default:
        return 0
    }
  })

  return (
    <div className="overflow-x-auto p-4">
      <div className="mb-4">
        <div className="flex items-center justify-start gap-2">
          <h2 className="text-lg">Filtrar por:</h2>
          <select
            className="select select-bordered w-full max-w-xs"
            value={filtro}
            onChange={handleFiltroChange}
          >
            <option value="todos">Todos</option>
            <option value="pais">País</option>
            <option value="zonaHoraria">Zona Horaria</option>
          </select>
        </div>
      </div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>País</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Zona Horaria</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {aeropuertosFiltrados.map((objeto) => (
            <tr key={objeto.idaeropuerto}>
              <td>{objeto.idaeropuerto}</td>
              <td>{objeto.nombre}</td>
              <td>{objeto.ciudad}</td>
              <td>{objeto.pais}</td>
              <td>{objeto.latitud}</td>
              <td>{objeto.longitud}</td>
              <td>{objeto.timezone}</td>
              <td>
                <button
                  className="btn btn-xs btn-error"
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
