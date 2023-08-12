import React, { useState, useEffect } from "react"
import empleadoService from "../../services/empleadoService"

const SelectEmpleo = ({ onSelect }) => {
  const [empleos, setEmpleos] = useState([])

  useEffect(() => {
    const fetchEmpleos = async () => {
      const data = await empleadoService.getAllEmpleos()
      setEmpleos(data)
    }

    fetchEmpleos()
  }, [])

  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="" disabled>
        Selecciona tu empleo
      </option>
      {empleos.map((e) => (
        <option key={e.idempleo} value={e.idempleo}>
          {e.nombre}
        </option>
      ))}
    </select>
  )
}

export default SelectEmpleo
