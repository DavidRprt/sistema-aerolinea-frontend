import React from "react"
import {
  MdAirlineSeatReclineNormal,
  MdAirlineSeatReclineExtra,
  MdAirlineSeatFlat,
} from "react-icons/md"


const FlightPrices = ({ precioBase, setSelectedClass, selectedClass }) => {

  const calculatePrice = (option) => {
    if (option === "Turista") return precioBase
    if (option === "Premium") return precioBase * 2
    if (option === "Business") return precioBase * 3
    return 0
  }

  return (
    <div className="flex-col gap-2 justify-start items-start">
      <div className="flex gap-2 justify-center items-center">
        <input
          type="radio"
          name="precioOption"
          value="Turista"
          checked={selectedClass === "Turista"}
          onChange={(e) => setSelectedClass(e.target.value)}
        />
        <div className="flex items-center gap-1">
          <MdAirlineSeatReclineNormal className="text-xl" /> $
          {calculatePrice("Turista")} <br />
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <input
          type="radio"
          name="precioOption"
          value="Premium"
          checked={selectedClass === "Premium"}
          onChange={(e) => setSelectedClass(e.target.value)}
        />
        <div className="flex items-center gap-1">
          <MdAirlineSeatReclineExtra className="text-xl" /> $
          {calculatePrice("Premium")} <br />
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <input
          type="radio"
          name="precioOption"
          value="Business"
          checked={selectedClass === "Business"}
          onChange={(e) => setSelectedClass(e.target.value)}
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
