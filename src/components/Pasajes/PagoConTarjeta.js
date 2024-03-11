import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import reservaService from "../../services/reservaService"
import pasajesService from "../../services/pasajesService"
import { useNavigate } from "react-router-dom"

const PagoConTarjeta = () => {
  const stripe = useStripe()
  const elements = useElements()
  const location = useLocation()
  const navigate = useNavigate()
  const { precioTotal, fechaemision, vuelos, equipajeExtra } = location.state || {}

  const [isPagoExitoso, setIsPagoExitoso] = useState(false)
  const [mensajeError, setMensajeError] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      console.log(
        "Stripe aún no está listo o no se ha inicializado correctamente."
      )
      return
    }

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    })

    if (error) {
      console.log("[error]", error)
      setMensajeError(
        error.message || "Ocurrió un error con el método de pago."
      )
    } else {
      console.log("[PaymentMethod]", paymentMethod)

      try {
        await reservaService.procesarPago(paymentMethod.id, precioTotal)
        setIsPagoExitoso(true)
        setMensajeError("")


        const reservaResponse = await reservaService.crearReserva({
          idmetodo: "credito", 
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
            precio: vuelo.precio + 50 * equipajeExtra,
            equipajeExtra: equipajeExtra,
          }
          return pasajesService.crearPasaje(pasaje)
        })
        await Promise.all(pasajesPromises)
        console.log(idReserva, "HOLUS")
        navigate(`/reserva/${idReserva}`)
      } catch (error) {
        console.error("Error al procesar el pago:", error)
        setMensajeError("El pago no pudo ser procesado.")
        setIsPagoExitoso(false)
      }
    }
  }

  return (
    <main className="flex flex-col items-center justify-between p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl mx-auto px-4 py-8 shadow-md rounded-md flex flex-col lg:flex-row"
      >
        <div className="w-full lg:w-1/2 lg:pr-8 lg:border-r-2 lg:border-slate-300">
          <div className="mb-4">
            <label className="text-neutral-800 font-bold text-sm mb-2 block">
              Detalles de la tarjeta:
            </label>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="p-6 flex flex-col justify-center">
          <button
            type="submit"
            disabled={!stripe}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            Pagar {precioTotal}$
          </button>
          {mensajeError && (
            <div className="text-red-500 mt-2">{mensajeError}</div>
          )}
          {isPagoExitoso && (
            <div className="text-green-500 mt-2">
              El pago ha sido procesado exitosamente.
            </div>
          )}
        </div>
      </form>
    </main>
  )
}

export default PagoConTarjeta
