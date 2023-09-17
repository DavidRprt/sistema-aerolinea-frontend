import React from "react"
import { useSelector } from "react-redux"

const CargoSelect = ({ name, value, onChange }) => {
  const cargos = []

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      required
    >
      <option value="" disabled>
        Selecciona un cargo
      </option>
      {cargos.map((cargo) => (
        <option key={cargo.idCargo} value={cargo.idCargo}>
          {cargo.nombre}
        </option>
      ))}
    </select>
  )
}

export default CargoSelect
