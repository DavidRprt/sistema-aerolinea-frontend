import React, { useState } from "react"

const Checkout = () => {
  const [numPassengers, setNumPassengers] = useState(1)
  const [passengerPassports, setPassengerPassports] = useState([""])

  const handleNumPassengersChange = (e) => {
    const newNum = parseInt(e.target.value)
    setNumPassengers(newNum)

    // Asegurarse de que hay suficientes entradas de pasaporte
    const newPassports = [...passengerPassports]
    while (newPassports.length < newNum) {
      newPassports.push("")
    }

    setPassengerPassports(newPassports)
  }

  const handlePassportChange = (e, index) => {
    const newPassports = [...passengerPassports]
    newPassports[index] = e.target.value
    setPassengerPassports(newPassports)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <label className="flex flex-col items-start">
        <span className="text-lg font-medium text-gray-700">
          Cantidad de Pasajeros:
        </span>
        <input
          type="number"
          value={numPassengers}
          onChange={handleNumPassengersChange}
          min={1}
          className="w-20 mt-1 border rounded-md p-1"
        />
      </label>
      {passengerPassports.slice(0, numPassengers).map((passport, index) => (
        <div key={index} className="w-full">
          <label className="flex flex-col items-start w-1/2">
            <span className="text-lg font-medium text-gray-700">
              Pasaporte del Pasajero {index + 1}:
            </span>
            <input
              type="text"
              value={passport}
              onChange={(e) => handlePassportChange(e, index)}
              className="mt-1 w-full border rounded-md p-1"
            />
          </label>
        </div>
      ))}
    </div>
  )
}

export default Checkout
