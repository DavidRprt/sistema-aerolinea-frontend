import React, { useState } from "react"
import DatePicker from "react-datepicker"
import { useNavigate } from "react-router-dom"
import CodigoAeropuertoSelect from "../Rutas/CodigoAeropuertoSelect"
import "react-datepicker/dist/react-datepicker.css"
import { useDispatch } from "react-redux"
import { guardarBusqueda } from "../../reducers/busquedaReducer"

const FlightForm = () => {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [oneWay, setOneWay] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  

    const formatDate = (date) => {
      if (date === "") return ""
      else
     { const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      return `${year}-${month}-${day}`}
    }

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date)
    setReturnDate("")
  }

   const handleReturnDateChange = (date) => {
     setReturnDate(date)
   }

    const handleOrigin = (selectedOrigin) => {
      setOrigin(selectedOrigin)
    }

    const handleReturn = (selectedReturn) => {
      setDestination(selectedReturn)
    }
   
   
  const handleSubmit = (event) => {
    event.preventDefault()
     const busqueda = {
       oneway: oneWay,
       idorigen: origin,
       iddestino: destination,
       fechhaida: formatDate(departureDate),
       fechavuelta: oneWay ? null : formatDate(returnDate),
     }
    dispatch(guardarBusqueda(busqueda))
    navigate("/resultados")
  }

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border border-gray-300 rounded"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="origin"
            >
              Origen
            </label>
            <CodigoAeropuertoSelect
              value={origin}
              onChange={(event) => handleOrigin(event.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="destination"
            >
              Destino
            </label>
            <CodigoAeropuertoSelect
              value={destination}
              onChange={(event) => handleReturn(event.target.value)}
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="departure-date"
            >
              Fecha de Salida
            </label>
            <DatePicker
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              selected={departureDate}
              dateFormat="yyyy-MM-dd"
              onChange={(newDate) => handleDepartureDateChange(newDate)}
              minDate={new Date()} // Fecha mínima es el día de hoy
              placeholderText="Seleccione una fecha"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="return-date"
            >
              Fecha de Regreso
            </label>
            <DatePicker
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              selected={returnDate}
              onChange={handleReturnDateChange}
              minDate={departureDate ? departureDate : new Date()} // Fecha mínima es la fecha de ida si es de ida y vuelta
              required
              placeholderText="Seleccione una fecha"
              disabled={oneWay}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm mb-2" htmlFor="one-way">
              <input
                className="mr-2 leading-tight"
                id="one-way"
                type="checkbox"
                checked={oneWay}
                onChange={(event) => setOneWay(event.target.checked)}
              />
              <span className="text-sm">Solo ida</span>
            </label>
          </div>
        </div>
        <div className="flex items-center justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Buscar Vuelo
          </button>
        </div>
      </form>
    </div>
  )
}

export default FlightForm
