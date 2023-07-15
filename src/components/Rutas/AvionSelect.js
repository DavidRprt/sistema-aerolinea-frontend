import React from "react"
import { useSelector } from "react-redux"

const AvionSelect = ({ value, onChange }) => {
  const aviones = useSelector((state) => state.aviones)

  return (
    <select
      name="idavion"
      value={value}
      onChange={onChange}
      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      required
    >
      <option value="" disabled>
        Selecciona un avión
      </option>
      {aviones.map((avion) => (
        <option key={avion.idavion} value={avion.idavion}>
          {avion.nombre}
        </option>
      ))}
    </select>
  )
}

export default AvionSelect
