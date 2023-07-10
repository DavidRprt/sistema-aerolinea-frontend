import React from "react"
import { useNavigate } from "react-router-dom"
import {
  MdAirlineSeatReclineNormal,
  MdAirlineSeatReclineExtra,
  MdAirlineSeatFlat,
} from "react-icons/md"

const flightData = [
  {
    id: 1,
    from: "Buenos Aires",
    to: "New York",
    departure: "15/06/2023 10:30",
    arrival: "15/06/2023 20:30",
    duration: "10h",
    days: ["Lun", "Mie", "Vie"],
    aircraft: "Airbus A380",
    economyPrice: 600,
    premiumEconomyPrice: 900,
    businessPrice: 1300,
    flightNumber: "AR1234",
  },
  {
    id: 2,
    from: "Buenos Aires",
    to: "Cordoba",
    departure: "16/06/2023 09:30",
    arrival: "16/06/2023 11:00",
    duration: "1h 30m",
    days: ["Mar", "Jue", "Sab"],
    aircraft: "Airbus A320",
    economyPrice: 100,
    premiumEconomyPrice: 150,
    businessPrice: 200,
    flightNumber: "AR5678",
  }
]

const FlightResultsDashboard = () => {
  const navigate = useNavigate()
  const [selectedFlight, setSelectedFlight] = React.useState(null)

  return (
    <div className="mx-4 w-auto bg-white rounded-xl shadow-md overflow-hidden md:w-auto m-3 p-4 flex flex-col">
      <div className="overflow-auto h-96">
        <table>
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
                Número de Vuelo
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
                Vuelo
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
                Salida
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
                Llegada
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
                Duración
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
                Dias
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
                Avión
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600">
                Precios
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {flightData.map((flight) => (
              <tr key={flight.id}>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  {flight.flightNumber}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  {flight.from} - {flight.to}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  {flight.departure}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  {flight.arrival}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  {flight.duration}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  {flight.days.join(", ")}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  {flight.aircraft}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <div className="flex items-center gap-1">
                    <MdAirlineSeatReclineNormal className="text-xl" /> $
                    {flight.economyPrice} <br />
                  </div>
                  <div className="flex items-center gap-1">
                    <MdAirlineSeatReclineExtra className="text-xl" /> $
                    {flight.premiumEconomyPrice} <br />
                  </div>
                  <div className="flex items-center gap-1">
                    <MdAirlineSeatFlat className="text-xl" /> $
                    {flight.businessPrice} <br />
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <button
                    className={`px-0 py-2 rounded text-white w-28 ${
                      selectedFlight === flight.id
                        ? "bg-green-800"
                        : "bg-green-500"
                    }`}
                    onClick={() => setSelectedFlight(flight.id)}
                  >
                    {selectedFlight === flight.id
                      ? "Seleccionado"
                      : "Seleccionar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => navigate("/pasajes")}
        >
          Volver
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/checkout")}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

export default FlightResultsDashboard
