import React from "react"
import { useSelector } from "react-redux"

const CodigoAeropuertoSelect = ({ name, value, onChange }) => {
  const aeropuertos = useSelector((state) => state.aeropuertos)

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      required
    >
      <option value="" disabled>
        Selecciona un aeropuerto
      </option>
      {aeropuertos.map((aeropuerto) => (
        <option key={aeropuerto.idaeropuerto} value={aeropuerto.idaeropuerto}>
          {aeropuerto.nombre} ({aeropuerto.idaeropuerto})
        </option>
      ))}
    </select>
  )
}

export default CodigoAeropuertoSelect
