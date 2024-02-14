import React from "react"
import { useSelector } from "react-redux"

const ModeloAvionSelect = ({ value, onChange }) => {
  const modelos = useSelector((state) => state.modelos)

  const handleChange = (e) => {
    const selectedModeloId = e.target.value
    onChange(selectedModeloId)
  }

  return (
    <select
      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={value}
      onChange={handleChange}
    >
      <option value="">Seleccionar modelo</option>
      {modelos.map((modelo) => (
        <option key={modelo.idmodelo} value={modelo.idmodelo}>
          {modelo.modelo}
        </option>
      ))}
    </select>
  )
}

export default ModeloAvionSelect
