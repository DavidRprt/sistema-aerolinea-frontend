import { useState } from "react"
import { useNavigate } from "react-router-dom"

const FlightForm = () => {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [oneWay, setOneWay] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate("/resultados")
  }

  return (
    <div className="mx-4 w-auto bg-white rounded-xl shadow-md overflow-hidden md:w-auto m-3 p-4">
      <h2 className="text-xl mb-4">Buscar Vuelo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-sm mb-2" htmlFor="origin">
            Origen
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="origin"
            type="text"
            placeholder="Ingresar ciudad de origen"
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="destination">
            Destino
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="destination"
            type="text"
            placeholder="Ingresar ciudad de destino"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="departure-date">
            Fecha de Salida
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="departure-date"
            type="date"
            value={departureDate}
            onChange={(event) => setDepartureDate(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="return-date">
            Fecha de Regreso
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="return-date"
            type="date"
            value={returnDate}
            onChange={(event) => setReturnDate(event.target.value)}
            disabled={oneWay}
          />
        </div>
        <div className="mb-4">
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Buscar Vuelo
        </button>
      </form>
    </div>
  )
}

export default FlightForm
