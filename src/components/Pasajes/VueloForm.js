import React from "react"
import SelectDate from "./selectDates"
import FlightPrices from "./FlightPrices"

const VueloForm = ({
  vuelos,
  filteredDays,
  setSelectedDate,
  selectedClass,
  setSelectedClass,
}) => {
  return (
    <div className="container mx-auto p-4">
      <div className="">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600 ">
                Número de Vuelo
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
                Vuelo
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
                Duración
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
                Fecha
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
                Avión
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
                Precios
              </th>
            </tr>
          </thead>
          <tbody>
            {vuelos.map((vuelo) => (
              <tr key={vuelo.idruta}>
                <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
                  AIRF-{vuelo.idruta}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
                  {vuelo.idorigen} - {vuelo.iddestino}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
                  {vuelo.duracion} horas
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
                  <SelectDate
                    filteredDates={filteredDays}
                    setSelectedDate={setSelectedDate}
                  />
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm ">
                  {vuelo.avion.nombre}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
                  <FlightPrices
                    precioBase={vuelo.preciobase}
                    setSelectedClass={setSelectedClass}
                    selectedClass={selectedClass} // Pasar el estado selectedClass como prop
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VueloForm
