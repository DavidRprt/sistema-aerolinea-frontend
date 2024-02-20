import axios from "axios"

const url = `${process.env.REACT_APP_API_URL}/reservas`

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

// eslint-disable-next-line
export default {
  crearReserva,
}
