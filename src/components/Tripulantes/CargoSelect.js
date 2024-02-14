import React, { useState, useEffect } from "react"
import tripulacionService from "../../services/tripulacionService"

const CargoSelect = ({ name, value, onChange }) => {
  const [cargos, setCargos] = useState([])

  useEffect(() => {
    const fetchCargos = async () => {
      try {
        const data = await tripulacionService.getAllCargos()
        setCargos(data)
      } catch (error) {
        console.error("Error al obtener los cargos:", error)
      }
    }

    fetchCargos()
  }, [])

  const handleSelectChange = (e) => {
    onChange(e) 
  }

  return (
    <select
      name={name}
      value={value}
      onChange={handleSelectChange}
      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      required
    >
      <option value="all" defaultValue>
        Mostrar todos
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
