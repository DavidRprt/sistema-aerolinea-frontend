import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { eliminarModelo } from "../../reducers/modeloReducer"
import avionesService from "../../services/avionesService"
import { RiDeleteBin5Line } from "react-icons/ri"

const ModelosLista = () => {
  const dispatch = useDispatch()
  const modelos = useSelector((state) => state.modelos)
  const [filtro, setFiltro] = useState("todos")

  const confirmarEliminacion = async (idModelo) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      await avionesService.deleteModelo(idModelo)
      dispatch(eliminarModelo(idModelo))
    }
  }

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value)
  }

  const modelosFiltrados = modelos.slice().sort((a, b) => {
    switch (filtro) {
      case "autonomia":
        return a.autonomia - b.autonomia
      case "marca":
        return a.modelo.localeCompare(b.modelo)
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
            <option value="autonomia">Autonomía</option>
            <option value="marca">Marca (Alfabético)</option>
          </select>
        </div>
      </div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Autonomía</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {modelosFiltrados.map((modelo) => (
            <tr key={modelo.idmodelo}>
              <td>{modelo.idmodelo}</td>
              <td>{modelo.modelo}</td>
              <td>{modelo.autonomia} kilómetros</td>
              <td>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => confirmarEliminacion(modelo.idmodelo)}
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
