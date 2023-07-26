import React from "react"
import {
  MdAirlineSeatReclineNormal,
  MdAirlineSeatReclineExtra,
  MdAirlineSeatFlat,
} from "react-icons/md"

const FlightPrices = ({
  precioBase,
  setSelectedClass,
  selectedClass,
  flightId,
  setSelectedPrice,
}) => {
  const calculatePrice = (option) => {
    if (option === "Turista") return precioBase
    if (option === "Premium") return precioBase * 2
    if (option === "Business") return precioBase * 3
    return 0
  }

  const handleSelectionChange = (value) => {
    setSelectedClass(value)
    setSelectedPrice(calculatePrice(value))
  }

  return (
    <div className="flex-col gap-2 justify-start items-start">
      <div className="flex gap-2 justify-center items-center">
        <input
          type="radio"
          name={`precioOption${flightId}`}
          value="Turista"
          checked={selectedClass === "Turista"}
          onChange={(e) => handleSelectionChange(e.target.value)}
        />
        <div className="flex items-center gap-1">
          <MdAirlineSeatReclineNormal className="text-xl" /> $
          {calculatePrice("Turista")} <br />
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <input
          type="radio"
          name={`precioOption${flightId}`}
          value="Premium"
          checked={selectedClass === "Premium"}
          onChange={(e) => handleSelectionChange(e.target.value)}
        />
        <div className="flex items-center gap-1">
          <MdAirlineSeatReclineExtra className="text-xl" /> $
          {calculatePrice("Premium")} <br />
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <input
          type="radio"
          name={`precioOption${flightId}`}
          value="Business"
          checked={selectedClass === "Business"}
          onChange={(e) => handleSelectionChange(e.target.value)}
        />
        <div className="flex items-center gap-1">
          <MdAirlineSeatFlat className="text-xl" /> $
          {calculatePrice("Business")} <br />
        </div>
      </div>
    </div>
  )
}

export default FlightPrices
