import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import rutasService from "../../services/rutasService"
import SelectDate from "./selectDates"
import FlightPrices from "./FlightPrices"
import VueloForm from "./VueloForm"

const FlightResultsDashboard = () => {

  const navigate = useNavigate()
  const [vuelos, setVuelos] = useState([])
  const [selectedClass, setSelectedClass] = useState("") 
  const [selectedDate, setSelectedDate] = useState("")
  const busqueda = useSelector((state) => state.busqueda)

useEffect(() => {
  const obtenerVuelos = async () => {
    try {
      const vuelosObtenidos = await rutasService.getRutasByAirport(
        busqueda.idorigen,
        busqueda.iddestino
      )
      setVuelos(vuelosObtenidos) // Actualizar el estado con los vuelos obtenidos
    } catch (error) {
      console.error("Error al obtener los vuelos:", error)
    }
  }

  obtenerVuelos()
}, [busqueda.idorigen, busqueda.iddestino])

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

  const handleContinue = () => {
    const checkoutData = {
      idcliente: null,
      idruta: vuelos[0].idruta,
      idclase: selectedClass, // Usamos el estado para el valor seleccionado en el radio button
      fechaida: selectedDate, // Usamos el estado para la fecha seleccionada en el componente SelectDate
      fechavuelta: "",
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
      navigate("/checkout") // Redireccionar a la página "/checkout"
    }
    console.log(checkoutData) // Imprimir el objeto construido

  
  }


  return (
    <div className="container mx-auto p-4">
      <VueloForm 
      vuelos={vuelos}
      filteredDays={filteredDays}
      setSelectedClass={selectedClass}
      setSelectedDate={selectedDate}
      selectedClass={selectedClass}
      />
      {!busqueda.oneway && (
        <div>
          <h2 className="text-xl mt-4">
            Aqui se encuentra el componente para el viaje de vuelta
          </h2>
          {/* Agregar aquí el código para mostrar los vuelos de vuelta */}
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
