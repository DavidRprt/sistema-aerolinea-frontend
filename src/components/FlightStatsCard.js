import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa"

const FlightStatsCard = () => {
  const flightsToday = 25
  const flightsInAir = 10
  const flightsDelayed = 3
  const flightsCancelled = 1

  return (
    <div className="mx-4 w-auto bg-white rounded-xl shadow-md overflow-hidden md:w-auto m-3 p-4">
      <div className="md:flex justify-between p-8">
        <div className="flex items-center">
          <FaPlaneDeparture className="text-4xl text-gray-500" />
          <p className="ml-2 text-gray-500">Vuelos hoy: {flightsToday}</p>
        </div>
        <div className="flex items-center ml-4">
          <FaPlaneArrival className="text-4xl text-gray-500" />
          <p className="ml-2 text-gray-500">
            Vuelos en el aire: {flightsInAir}
          </p>
        </div>
        <div className="flex items-center ml-4">
          <FaExclamationCircle className="text-4xl text-yellow-500" />
          <p className="ml-2 text-gray-500">
            Vuelos retrasados: {flightsDelayed}
          </p>
        </div>
        <div className="flex items-center ml-4">
          <FaTimesCircle className="text-4xl text-red-500" />
          <p className="ml-2 text-gray-500">
            Vuelos cancelados: {flightsCancelled}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FlightStatsCard
