import React, { useState } from "react"
import clientesService from "../../services/clientesService"
import ReservaCompra from "../Pasajes/ReservaCompra"

const Checkout = ({ oneway, vueloIda, vueloVuelta }) => {
  const [numPassengers, setNumPassengers] = useState(1)
  const [passengerPassports, setPassengerPassports] = useState([""])
  const [clientesValidados, setClientesValidados] = useState([])
  const [isProcessingPurchase, setIsProcessingPurchase] = useState(false)
  const [vuelos, setVuelos] = useState([])

  const handleContinue = async () => {
    let clientesTemp = []

    // Comprobar que todos los números de pasaporte son válidos
    for (let i = 0; i < numPassengers; i++) {
      if (passengerPassports[i] === "") {
        alert(`Por favor, ingresa el pasaporte para el pasajero ${i + 1}`)
        return
      }

      // Verificar que el cliente esté en la base de datos
      const cliente = await clientesService.getClientesPasaporte(
        passengerPassports[i]
      )

      console.log(cliente)

      if (cliente.length === 0) {
        alert(
          `El pasajero con pasaporte ${passengerPassports[i]} no está registrado en nuestra base de datos`
        )
        return
      }

      // Agregar el cliente a la lista temporal de clientes
      clientesTemp.push(cliente[0])
    }

    // Actualizar el estado de clientesValidados
    setClientesValidados(clientesTemp)
  }

  const handlePurchase = async () => {
    let vuelosTemp = []

    clientesValidados.forEach((cliente) => {
      let vueloIdaCopia = {
        ...vueloIda,
        cliente: { id: cliente.idcliente, millas: cliente.millas },
      }
      vuelosTemp.push(vueloIdaCopia)

      if (!oneway) {
        let vueloVueltaCopia = {
          ...vueloVuelta,
          cliente: { id: cliente.idcliente, millas: cliente.millas },
        }
        vuelosTemp.push(vueloVueltaCopia)
      }
    })

    setVuelos(vuelosTemp)
    setIsProcessingPurchase(true)
  }

  const handleNumPassengersChange = (e) => {
    const newNum = parseInt(e.target.value)
    setNumPassengers(newNum)

    // Asegurarse de que hay suficientes entradas de pasaporte
    const newPassports = [...passengerPassports]
    while (newPassports.length < newNum) {
      newPassports.push("")
    }

    // Si el número de pasajeros se reduce, actualizar clientesValidados también
    if (newNum < newPassports.length) {
      const newClientesValidados = clientesValidados.slice(0, newNum)
      setClientesValidados(newClientesValidados)
    }

    setPassengerPassports(newPassports)
  }

  const handlePassportChange = (e, index) => {
    const newPassports = [...passengerPassports]
    newPassports[index] = e.target.value
    setPassengerPassports(newPassports)
  }

  return (
    <div>
      {isProcessingPurchase ? (
        <ReservaCompra vuelos={vuelos} />
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-700">
            Información de la reserva
          </h2>
          <div className="flex flex-row justify-between w-full gap-3 p-3">
            <div className="flex flex-col space-y-2 bg-white p-4 rounded-md shadow-sm w-full">
              <h3 className="text-xl font-medium text-gray-600">
                Vuelo de ida
              </h3>
              <p>Numero de vuelo: AF-{vueloIda.idruta} </p>
              <p>Clase: {vueloIda.idclase} </p>
              <p>Fecha: {vueloIda.fecha}</p>
              <p>Precio: {vueloIda.precio}$</p>
            </div>

            {oneway ? (
              <h3 className="flex flex-col space-y-2 bg-white p-4 rounded-md shadow-sm w-full">
                El vuelo es solo de ida
              </h3>
            ) : (
              <div className="flex flex-col space-y-2 bg-white p-4 rounded-md shadow-sm w-full">
                <h3 className="text-xl font-medium text-gray-600">
                  Vuelo de vuelta
                </h3>
                <p>Numero de vuelo: AF-{vueloVuelta.idruta} </p>
                <p>Clase: {vueloVuelta.idclase} </p>
                <p>Fecha: {vueloVuelta.fecha}</p>
                <p>Precio: {vueloVuelta.precio}$</p>
              </div>
            )}
          </div>
          <div className="flex flex-row justify-between w-full p-3">
            <div className="w-1/4">
              <label className="flex flex-col items-start">
                <span className="text-lg font-medium text-gray-700">
                  Cantidad de Pasajeros:
                </span>
                <input
                  type="number"
                  value={numPassengers}
                  onChange={handleNumPassengersChange}
                  min={1}
                  max={4}
                  className="w-full mt-1 border rounded-md p-1"
                />
              </label>
            </div>
            <div className="flex flex-row justify-start items-center gap-3 w-2/3">
              {passengerPassports
                .slice(0, numPassengers)
                .map((passport, index) => (
                  <div key={index} className="w-full">
                    <label className="flex flex-col items-start">
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
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleContinue()}
                >
                  Verificar Pasaportes
                </button>
              </div>
            </div>
          </div>
          {clientesValidados.map((cliente, index) => (
            <div
              key={index}
              className="w-full p-3 bg-white rounded-md shadow-sm"
            >
              <p>
                Nombre: {cliente.nombre} {cliente.apellido}
              </p>
              <p>Email: {cliente.email}</p>
              <p>Millas: {cliente.millas}</p>
            </div>
          ))}

          <div className="flex justify-end items-end">
            <button
              onClick={() => handlePurchase()}
              className={`font-bold py-2 px-4 rounded text-white ${
                numPassengers !== clientesValidados.length
                  ? "bg-green-800"
                  : "bg-green-500 hover:bg-green-700"
              }`}
              disabled={numPassengers !== clientesValidados.length}
            >
              Realizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout
