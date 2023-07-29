import axios from "axios"

const url = `http://localhost:3001/api/reservas`

const crearReserva = async (reserva) => {
  try {
    const response = await axios.post(url, reserva)
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
