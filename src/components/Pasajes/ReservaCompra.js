import React, { useState, useEffect } from "react"
import reservaService from "../../services/reservaService"
import pasajesService from "../../services/pasajesService"
import clientesService from "../../services/clientesService"
import { useNavigate } from "react-router-dom"

const ReservaCompra = ({ vuelos }) => {
  const [metodoPago, setMetodoPago] = useState("") // Estado para almacenar el método de pago seleccionado
  const [precioTotal, setPrecioTotal] = useState(0) // Estado para almacenar el precio total de la reserva
  const [cardNumber, setCardNumber] = useState("")
  const [expDate, setExpDate] = useState("")
  const [ccvNumber, setCcvNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const isCardFormDisabled = metodoPago !== "credito"
  const [millas, setMillas] = useState(0)
  const navigate = useNavigate()
  const tasaConversion = 2
  const precioPorCliente = {}

    const isCardFormValid = () => {
      if (metodoPago === "credito") {
        return (
          cardNumber.length >= 19 && 
          expDate.length === 5 &&
          ccvNumber.length === 3 && 
          cardName.length > 0 
        )
      }
      return true 
    }

    // Determina si el botón debe estar deshabilitado
    const isConfirmButtonDisabled =
      metodoPago === "" || (metodoPago === "credito" && !isCardFormValid())

  vuelos.forEach((vuelo) => {
    if (precioPorCliente[vuelo.cliente.id]) {
      precioPorCliente[vuelo.cliente.id] += vuelo.precio
    } else {
      precioPorCliente[vuelo.cliente.id] = vuelo.precio
    }
  })

  const todosTienenSuficientesMillas = Object.keys(precioPorCliente).every(
    (clienteId) => {
      const millasNecesarias = Math.round(
        precioPorCliente[clienteId] * tasaConversion
      )
      const cliente = vuelos.find(
        (v) => v.cliente.id === parseInt(clienteId)
      ).cliente
      return cliente.millas >= millasNecesarias
    }
  )

  const millasPorCliente = vuelos.reduce((acc, vuelo) => {
    if (!acc[vuelo.cliente.id]) {
      acc[vuelo.cliente.id] = vuelo.cliente.millas
    }
    return acc
  }, {})

  const precioPorPasajero = precioTotal / vuelos.length
  const millasPorPasajero = Math.round(precioPorPasajero * tasaConversion)

  useEffect(() => {
    const precio = vuelos.reduce((total, vuelo) => total + vuelo.precio, 0)
    setPrecioTotal(precio)
    setMillas(Math.round(precio * tasaConversion))
  }, [vuelos])

  const handleConfirm = async () => {
    const fecha = new Date()
    const year = fecha.getFullYear()
    const month = String(fecha.getMonth() + 1).padStart(2, "0")
    const day = String(fecha.getDate()).padStart(2, "0")
    const fechaemision = `${year}-${month}-${day}`

    try {
      const reservaResponse = await reservaService.crearReserva({
        idmetodo: metodoPago,
        fechaemision: fechaemision,
        preciototal: precioTotal,
      })

      const idReserva = reservaResponse

      const vuelosConIdReserva = vuelos.map((vuelo) => ({
        ...vuelo,
        idreserva: idReserva,
      }))

      const pasajesPromises = vuelosConIdReserva.map((vuelo) => {
        const pasaje = {
          idcliente: vuelo.cliente.id,
          idruta: vuelo.idruta,
          idclase: vuelo.idclase,
          idreserva: vuelo.idreserva,
          fecha: vuelo.fecha,
          precio: vuelo.precio,
        }
        return pasajesService.crearPasaje(pasaje)
      })

      for (const vuelo of vuelos) {
        let millasASumar = vuelo.precio / 2
        if (metodoPago === "MILLAS") {
          millasASumar = -millasPorPasajero
        }
        try {
          await clientesService.updateClienteMillas({
            idcliente: vuelo.cliente.id,
            millas: millasASumar,
          })
        } catch (error) {
          console.error("Error al actualizar las millas del cliente:", error)
        }
      }

      await Promise.all(pasajesPromises)

      // Redirige al usuario a su página después de que la compra se realiza correctamente
      navigate(`/reserva/${idReserva}`)
    } catch (error) {
      console.error("Error al confirmar la reserva:", error)
    }
  }

  const handlePaymentMethodChange = (event) => {
    setMetodoPago(event.target.value)
  }

  const handleCardNumberChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
    setCardNumber(value)
  }
  const handleExpDateChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .replace(/(.{2})/, "$1/")
      .substr(0, 5)
    setExpDate(value)
  }
  const handleCcvNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").substr(0, 3)
    setCcvNumber(value)
  }
  const handleCardNameChange = (e) => {
    setCardName(e.target.value)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-700">
        Resumen de la reserva
      </h2>

      <div className="flex flex-row justify-between w-full gap-3 p-3">
        <div className="flex flex-col space-y-2 bg-white p-4 rounded-md shadow-sm w-full">
          <p className="text-xl font-medium text-gray-600">
            Precio total: {precioTotal}$
          </p>
          <p className="text-xl font-medium text-gray-600">
            Equivalente en millas: {millas} millas
          </p>
          <p className="text-xl font-medium text-gray-600">
            Precio por tramo: {precioPorPasajero}$ ({millasPorPasajero} millas)
          </p>
        </div>

        <div className="flex flex-col space-y-2 bg-white p-4 rounded-md shadow-sm w-full">
          <p className="text-xl font-medium text-gray-600">
            Selecciona un método de pago:
          </p>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              className="form-radio"
              value="credito"
              checked={metodoPago === "credito"}
              onChange={handlePaymentMethodChange}
            />
            <span className="text-gray-700">Tarjeta</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              className="form-radio"
              value="MILLAS"
              disabled={!todosTienenSuficientesMillas}
              checked={metodoPago === "MILLAS"}
              onChange={handlePaymentMethodChange}
            />
            <span className="text-gray-700">
              Pagar con millas (Disponibles:{" "}
              {Object.entries(millasPorCliente)
                .map(([id, millas]) => `${millas}`)
                .join(", ")}
              )
            </span>
          </label>
        </div>
      </div>

      <main className="flex flex-col items-center justify-between p-6">
        <form className="bg-white w-full max-w-3xl mx-auto px-4 py-8 shadow-md rounded-md flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pr-8 lg:border-r-2 lg:border-slate-300">
            {/* Inputs for card details */}
            <div className="mb-4">
              <label className="text-neutral-800 font-bold text-sm mb-2 block">
                Card number:
              </label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg"
                maxLength="19"
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={handleCardNumberChange}
                disabled={isCardFormDisabled}
              />
            </div>
            <div className="flex gap-x-2 mb-4">
              <div className="block">
                <label className="text-neutral-800 font-bold text-sm mb-2 block">
                  Exp. date:
                </label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg"
                  maxLength="5"
                  placeholder="MM/YY"
                  value={expDate}
                  onChange={handleExpDateChange}
                  disabled={isCardFormDisabled}
                />
              </div>
              <div className="block">
                <label className="text-neutral-800 font-bold text-sm mb-2 block">
                  CCV:
                </label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg"
                  maxLength="3"
                  placeholder="123"
                  value={ccvNumber}
                  onChange={handleCcvNumberChange}
                  disabled={isCardFormDisabled}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-neutral-800 font-bold text-sm mb-2 block">
                Card holder:
              </label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg"
                placeholder="John Doe"
                value={cardName}
                onChange={handleCardNameChange}
                disabled={isCardFormDisabled}
              />
            </div>
          </div>

          <div className="p-6">
            <div className="w-96 h-56  bg-red-100 rounded-xl text-white shadow-2xl transition-transform transform hover:scale-110">
              <img
                className="relative object-cover w-full h-full rounded-xl"
                src="https://i.imgur.com/kGkSg1v.png"
                alt="Background"
              />
              <div className="w-full px-8 absolute top-8">
                <div className="flex justify-between">
                  <div>
                    <p className="font-light">Name</p>
                    <p className="font-medium tracking-widest">{cardName}</p>
                  </div>
                  <img
                    className="w-14 h-14"
                    src="https://i.imgur.com/bbPHJVe.png"
                    alt="Avatar"
                  />
                </div>
                <div className="pt-1">
                  <p className="font-light">Card Number</p>
                  <p className="font-medium tracking-more-wider">
                    {cardNumber}
                  </p>
                </div>
                <div className="pt-6 pr-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-light text-xs">Expiry</p>
                      <p className="font-medium tracking-wider text-sm">
                        {expDate}
                      </p>
                    </div>
                    <div>
                      <p className="font-light text-xs">CVV</p>
                      <p className="font-bold tracking-more-wider text-sm">
                        {ccvNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <div className="flex justify-end items-end w-full p-5">
        <button
          className={`font-bold py-2 px-4 rounded text-white ${
            isConfirmButtonDisabled
              ? "bg-green-300 cursor-not-allowed" // Estilo cuando está desactivado
              : "bg-green-500 hover:bg-green-700" // Estilo normal
          }`}
          onClick={handleConfirm}
          disabled={isConfirmButtonDisabled}
        >
          Confirmar compra
        </button>
      </div>
    </div>
  )
}

export default ReservaCompra
