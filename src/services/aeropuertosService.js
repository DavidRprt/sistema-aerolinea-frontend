import axios from "axios"

const url = `${process.env.REACT_APP_API_URL}/aeropuertos`

const getTokenFromCookie = () => {
  const tokenName = "token"
  const match = document.cookie.match(
    "(^|;)\\s*" + tokenName + "\\s*=\\s*([^;]+)"
  )
  return match ? match.pop() : ""
}

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const postAeropuerto = async (aeropuerto) => {
  try {
    const token = getTokenFromCookie()
    const response = await axios.post(url, aeropuerto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error al realizar la solicitud POST:", error)
    throw error
  }
}

const deleteAeropuerto = async (idAeropuerto) => {
  try {
    const token = getTokenFromCookie()
    const response = await axios.delete(url, {
      data: { idAeropuerto: idAeropuerto },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error al realizar la solicitud DELETE:", error)
    throw error
  }
}

const getAeropuertosConMasRutas = async () => {
  try {
    const response = await axios.get(`${url}/mas-rutas`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error al obtener los aeropuertos con más rutas:", error)
    throw error
  }
}

// eslint-disable-next-line
export default {
  getAll,
  postAeropuerto,
  deleteAeropuerto,
  getAeropuertosConMasRutas,
}
