import axios from "axios"

const baseURL = "http://localhost:3001/api"

const getTokenFromCookie = () => {
  const tokenName = "token"
  const match = document.cookie.match(
    "(^|;)\\s*" + tokenName + "\\s*=\\s*([^;]+)"
  )
  return match ? match.pop() : ""
}

const getAllCargos = async () => {
  try {
    const response = await axios.get(`${baseURL}/cargos`)
    return response.data
  } catch (error) {
    console.error("Error al obtener todos los cargos:", error)
    throw error
  }
}

const getAllTripulantes = async () => {
  try {
    const response = await axios.get(`${baseURL}/tripulantes`)
    return response.data
  } catch (error) {
    console.error("Error al obtener todos los tripulantes:", error)
    throw error
  }
}

const getAllTripulaciones = async () => {
  try {
    const response = await axios.get(`${baseURL}/tripulaciones`)
    return response.data
  } catch (error) {
    console.error("Error al obtener todas las tripulaciones:", error)
    throw error
  }
}

const addTripulante = async (tripulante) => {
  try {
    const token = getTokenFromCookie()
    const response = await axios.post(`${baseURL}/tripulantes`, tripulante, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.idtripulante
  } catch (error) {
    console.error("Error al agregar el tripulante:", error)
    throw error
  }
}

// eslint-disable-next-line
export default { getAllCargos, getAllTripulantes, getAllTripulaciones, addTripulante }