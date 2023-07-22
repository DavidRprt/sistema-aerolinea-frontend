import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import rutasService from "../../services/rutasService"
import SelectDate from "./selectDates"
import FlightPrices from "./FlightPrices"

const FlightResultsDashboard = () => {
  const navigate = useNavigate()
  const [vuelos, setVuelos] = useState([])
  const [vuelosVuelta, setVuelosVuelta] = useState([])
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedDateVuelta, setSelectedDateVuelta] = useState(null)
  const busqueda = useSelector((state) => state.busqueda)

 useEffect(() => {
   const obtenerVuelos = async () => {
     try {
       const vuelosObtenidos = await rutasService.getRutasByAirport(
         busqueda.idorigen,
         busqueda.iddestino
       )
       setVuelos(vuelosObtenidos)

       if (!busqueda.oneway) {
         const vuelosObtenidosVuelta = await rutasService.getRutasByAirport(
           busqueda.iddestino,
           busqueda.idorigen
         )
         setVuelosVuelta(vuelosObtenidosVuelta)
       }
     } catch (error) {
       console.error("Error al obtener los vuelos:", error)
     }
   }

   obtenerVuelos()
 }, [busqueda])


  const getDaysOfMonthWithWeekdays = (dateString) => {
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

    const year = parseInt(dateString.slice(0, 4))
    const month = parseInt(dateString.slice(5, 7)) - 1 // Restamos 1 porque los meses son 0-based en JavaScript

    for (let day = 1; day <= 31; day++) {
      const date = new Date(year, month, day)

      if (date.getMonth() !== month) {
        // Salir del ciclo si llegamos al final del mes
        break
      }

      const dayOfWeekName = daysOfWeek[date.getDay()]
      if (dayOfWeekName) {
        daysOfMonth.push({
          fecha: date.toISOString().slice(0, 10),
          dia: dayOfWeekName,
        })
      }
    }

    return daysOfMonth
  }

  const daysOfMonthWithWeekdays = getDaysOfMonthWithWeekdays(busqueda.fechhaida)

  const filteredDays = daysOfMonthWithWeekdays.filter((day) => {
    const weekday = day.dia.toLowerCase()
    const flightAvailabilityForDay =
      vuelos.length > 0 ? vuelos[0][weekday] : false
    return flightAvailabilityForDay
  })

  let filteredDaysVuelta = []
  if (vuelosVuelta) {
    const daysOfMonthWithWeekdaysVuelta = getDaysOfMonthWithWeekdays(
      busqueda.fechavuelta
    )
    filteredDaysVuelta = daysOfMonthWithWeekdaysVuelta.filter((day) => {
      const weekday = day.dia.toLowerCase()
      const flightAvailabilityForDay =
        vuelosVuelta.length > 0 ? vuelosVuelta[0][weekday] : false
      return flightAvailabilityForDay
    })
  }

  const handleContinue = () => {
    const checkoutData = {
      idcliente: null,
      idruta: vuelos[0].idruta,
      idclase: selectedClass, // Usamos el estado para el valor seleccionado en el radio button
      fechaida: selectedDate, // Usamos el estado para la fecha seleccionada en el componente SelectDate
      fechavuelta: selectedDateVuelta,
    }

    if (!checkoutData.fechaida) {
      // Mostrar mensaje si la fecha seleccionada está vacía
      alert("Por favor, seleccione una fecha.")
    } else if (!checkoutData.idclase) {
      // Mostrar mensaje si la clase seleccionada está vacía
      alert("Por favor, seleccione una clase.")
    } else if (!busqueda.oneway && !checkoutData.fechavuelta) {
      // Mostrar mensaje si es viaje de ida y vuelta pero no se ha seleccionado la fecha de vuelta
      alert("Por favor, seleccione la fecha de vuelta.")
    } else {
      // Si todo está bien, mostrar confirmación antes de redireccionar
/*       navigate("/checkout") // Redireccionar a la página "/checkout" */
    }
    console.log(checkoutData) // Imprimir el objeto construido
  }

  return (
    <div className="container mx-auto p-4">
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
      {!busqueda.oneway && (
        <div>
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
                  Precio total
                </th>
              </tr>
            </thead>
            <tbody>
              {vuelosVuelta.map((vuelo) => (
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
                      filteredDates={filteredDaysVuelta}
                      setSelectedDate={setSelectedDateVuelta}
                    />
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm ">
                    {vuelo.avion.nombre}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button
          className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => navigate("/pasajes")}
        >
          Volver
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleContinue} // Llamamos a la función handleContinue al hacer clic en el botón "Continuar"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

export default FlightResultsDashboard
