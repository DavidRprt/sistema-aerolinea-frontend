import React, { useState } from "react"
import avionesService from "../../services/avionesService"
import { eliminarAvion } from "../../reducers/avionReducer"
import { useDispatch, useSelector } from "react-redux"
import { RiDeleteBin5Line } from "react-icons/ri"

const AvionesLista = () => {
  const dispatch = useDispatch()
  const aviones = useSelector((state) => state.aviones)
  const [filtro, setFiltro] = useState("todos")

  const confirmarEliminacion = async (idAvion) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      await avionesService.deleteAvion(idAvion)
      dispatch(eliminarAvion(idAvion))
    }
  }

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value)
  }

  const avionesFiltrados = aviones.slice().sort((a, b) => {
    switch (filtro) {
      case "capacidad":
        return a.capacidadturista - b.capacidadturista
      case "año":
        return a.año - b.año
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
            <option value="capacidad">Capacidad Turista</option>
            <option value="año">Año</option>
          </select>
        </div>
      </div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Año</th>
            <th>Turista</th>
            <th>Premium</th>
            <th>Business</th>
            <th>Modelo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {avionesFiltrados.map((avion) => (
            <tr key={avion.idavion}>
              <td>{avion.nombre}</td>
              <td>{avion.año}</td>
              <td>{avion.capacidadturista}</td>
              <td>{avion.capacidadpremium}</td>
              <td>{avion.capacidadbusiness}</td>
              <td>{avion.modeloavion.modelo}</td>
              <td>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => confirmarEliminacion(avion.idavion)}
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
