import {
  GiAirplaneArrival,
  GiAirplaneDeparture,
  GiAirplane,
} from "react-icons/gi"
import { BiError } from "react-icons/bi"


const FleetStatsCard = () => {
  const aircraftList = [
    {
      model: "Boeing 737",
      status: "Fuera de servicio",
      count: 2,
      seats: 160,
      flightRange: "3 horas",
    },
    {
      model: "Airbus A320",
      status: "En servicio",
      count: 7,
      seats: 165,
      flightRange: "3 horas",
    },
    {
      model: "Airbus A380",
      status: "En servicio",
      count: 2,
      seats: 525,
      flightRange: "15 horas",
    },
    {
      model: "Embraer 190",
      status: "En servicio",
      count: 3,
      seats: 100,
      flightRange: "3 horas",
    },
  ]

  const totalAircraft = aircraftList.reduce((total, aircraft) => total + aircraft.count, 0);
  const aircraftInService = aircraftList.filter(aircraft => aircraft.status === "En servicio").reduce((total, aircraft) => total + aircraft.count, 0)
  const aircraftInMaintenance = aircraftList.filter(aircraft => aircraft.status === "En mantenimiento").reduce((total, aircraft) => total + aircraft.count, 0)
  const aircraftOutOfService = aircraftList.filter(aircraft => aircraft.status === "Fuera de servicio").reduce((total, aircraft) => total + aircraft.count, 0)

  return (
    <div className="mx-4 w-auto bg-white rounded-xl shadow-md overflow-hidden md:w-auto m-3 p-4">
      <div className="md:flex justify-between p-8">
        <div className="flex items-center">
          <GiAirplaneArrival className="text-4xl text-gray-500" />
          <p className="ml-2 text-gray-500">Total aeronaves: {totalAircraft}</p>
        </div>
        <div className="flex items-center ml-4">
          <GiAirplaneDeparture className="text-4xl text-gray-500" />
          <p className="ml-2 text-gray-500">
            Aeronaves en servicio: {aircraftInService}
          </p>
        </div>
        <div className="flex items-center ml-4">
          <GiAirplane className="text-4xl text-yellow-500" />
          <p className="ml-2 text-gray-500">
            Aeronaves en mantenimiento: {aircraftInMaintenance}
          </p>
        </div>
        <div className="flex items-center ml-4">
          <BiError className="text-4xl text-red-500" />
          <p className="ml-2 text-gray-500">
            Aeronaves fuera de servicio: {aircraftOutOfService}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-600">
          Detalles de la flota:
        </h2>
        {aircraftList.map((aircraft, index) => (
          <div className="mt-2" key={index}>
            <p className="text-gray-500">
              Modelo: {aircraft.model}, Status: {aircraft.status}, Cantidad:{" "}
              {aircraft.count}, Asientos: {aircraft.seats}, Autonomía de vuelo:{" "}
              {aircraft.flightRange}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FleetStatsCard
