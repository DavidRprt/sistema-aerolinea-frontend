import React, { useState, useEffect } from "react"
import reservaService from "../../services/reservaService"
import pasajesService from "../../services/pasajesService"
import { useNavigate } from "react-router-dom"

const ReservaCompra = ({ vuelos }) => {
  const [metodoPago, setMetodoPago] = useState("") // Estado para almacenar el método de pago seleccionado
  const [precioTotal, setPrecioTotal] = useState(0) // Estado para almacenar el precio total de la reserva
  const [millas, setMillas] = useState(0)
  const navigate = useNavigate()
  const tasaConversion = 2
  const precioPorCliente = {}

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
      const idReserva = reservaResponse.id // Asegúrate de usar la propiedad correcta para obtener el ID de la reserva.

      const vuelosConIdReserva = vuelos.map((vuelo) => ({
        ...vuelo,
        idreserva: idReserva, // Asume que idReserva es el ID devuelto por la API
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

      await Promise.all(pasajesPromises)

      // Redirige al usuario a su página después de que la compra se realiza correctamente
      navigate(`/usuarios/${vuelos[0].cliente.id}`)
    } catch (error) {
      console.error("Error al confirmar la reserva:", error)
    }
  }

  const handlePaymentMethodChange = (event) => {
    setMetodoPago(event.target.value)
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
              value="TARJETA"
              checked={metodoPago === "TARJETA"}
              onChange={handlePaymentMethodChange}
            />
            <span className="text-gray-700">Tarjeta</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              className="form-radio"
              value="PAYPAL"
              checked={metodoPago === "PAYPAL"}
              onChange={handlePaymentMethodChange}
            />
            <span className="text-gray-700">PayPal</span>
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

      <div className="flex justify-end items-end w-full">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleConfirm}
        >
          Confirmar compra
        </button>
      </div>
    </div>
  )
}

export default ReservaCompra
