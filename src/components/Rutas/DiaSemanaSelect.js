import React from "react"

const DiasSemanaSelect = ({ diasSeleccionados, onChange }) => {
  const dias = [
    { nombre: "Lunes", value: "lunes" },
    { nombre: "Martes", value: "martes" },
    { nombre: "Miércoles", value: "miercoles" },
    { nombre: "Jueves", value: "jueves" },
    { nombre: "Viernes", value: "viernes" },
    { nombre: "Sábado", value: "sabado" },
    { nombre: "Domingo", value: "domingo" },
  ]

  return (
    <div className="flex flex-col mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Días de la semana
      </label>
      <div className="flex gap-2 p-2 rounded">
        {dias.map((dia) => (
          <label
            key={dia.value}
            className="inline-flex items-center justify-center"
          >
            <input
              type="checkbox"
              name={dia.value}
              checked={diasSeleccionados[dia.value]}
              onChange={onChange}
              className="form-checkbox text-indigo-600 h-5 w-5"
            />
            <span className="ml-2">{dia.nombre}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default DiasSemanaSelect
