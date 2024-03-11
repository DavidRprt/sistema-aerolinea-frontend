import axios from "axios"

const url = `${process.env.REACT_APP_API_URL}/reservas`
const urlPago = `${process.env.REACT_APP_API_URL}/pagar`

const getTokenFromCookie = () => {
  const tokenName = "token"
  const match = document.cookie.match(
    "(^|;)\\s*" + tokenName + "\\s*=\\s*([^;]+)"
  )
  return match ? match.pop() : ""
}

const crearReserva = async (reserva) => {
  try {
    const token = getTokenFromCookie()
    const response = await axios.post(url, reserva, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.idreserva
  } catch (error) {
    console.error("Error al crear la reserva:", error)
    throw error
  }
}

const getReservaById = async (idreserva) => {
  try {
    const token = getTokenFromCookie()
    const response = await axios.get(`${url}/${idreserva}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error al obtener la reserva:", error)
    throw error
  }
}

const procesarPago = async (id, precio) => {

  try {
    const token = getTokenFromCookie()
    const datosPago = {
      paymentMethodId: id,
      precioTotal: precio,
      currency: "usd", 
    }

    const response = await axios.post(urlPago, datosPago, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    console.error("Error al procesar el pago:", error)
    throw error
  }
}

// eslint-disable-next-line
export default {
  crearReserva,
  getReservaById,
  procesarPago,
}
