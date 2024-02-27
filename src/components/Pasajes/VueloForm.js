import React, { useState, useEffect } from "react"
import FlightPrices from "./FlightPrices"
import SelectDate from "./SelectDate"

const VueloForm = ({ vuelo, fecha, setReserva }) => {
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    const vueloSeleccionado = {
      idcliente: null,
      idruta: vuelo.idruta,
      idclase: selectedClass,
      idreserva: null,
      fecha: selectedDate,
      precio: selectedPrice
    }
    if (isSelected) {
      setReserva(vueloSeleccionado)
    }
  }, [selectedClass, selectedDate, vuelo, isSelected, setReserva, selectedPrice])


const getFlightDates = (vuelo, dateStr) => {
  const daysOfMonth = []
  const daysOfWeek = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ]

  const year = parseInt(dateStr.slice(0, 4))
  const month = parseInt(dateStr.slice(5, 7)) - 1 // Restamos 1 porque los meses son 0-based en JavaScript

  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month, day)

    // Si ya pasamos al siguiente mes, rompemos el ciclo
    if (date.getMonth() !== month) {
      break
    }

    const dayOfWeek = daysOfWeek[date.getDay()]

    // Si el vuelo sale en este día de la semana, lo añadimos al array
    if (vuelo[dayOfWeek]) {
      daysOfMonth.push(date.toISOString().slice(0, 10))
    }
  }

  return daysOfMonth
}

  const flightDates = getFlightDates(vuelo, fecha)


  return (
    <div className="flex flex-col items-end p-6 bg-white rounded-lg shadow-lg m-2">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
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
              Horario
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
              Avión
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
              Precio
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
              AF-{vuelo.idruta}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
              {vuelo.idorigen} - {vuelo.iddestino}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
              {vuelo.duracion} horas
            </td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
              <SelectDate
                filteredDates={flightDates}
                setSelectedDate={setSelectedDate}
              />
            </td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
              {vuelo.horariosalida}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
              {vuelo.avion.nombre}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
              <FlightPrices
                precioBase={vuelo.preciobase}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                flightId={vuelo.idruta}
                setSelectedPrice={setSelectedPrice}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={() => setIsSelected(!isSelected)}
        className={`text-white font-bold py-2 px-4 mt-4 rounded items-end justify-end ${
          isSelected
            ? "bg-green-700 hover:bg-green-900"
            : "bg-green-500 hover:bg-green-700"
        }`}
      >
        {isSelected ? "Seleccionado" : "Reservar"}
      </button>
    </div>
  )
}

export default VueloForm
