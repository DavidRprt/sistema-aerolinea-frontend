import axios from "axios"

const baseURL = process.env.REACT_APP_API_URL

const avionesURL = `${baseURL}/aviones`
const modelosURL = `${baseURL}/modelos`

const getTokenFromCookie = () => {
  const tokenName = "token"
  const match = document.cookie.match(
    "(^|;)\\s*" + tokenName + "\\s*=\\s*([^;]+)"
  )
  return match ? match.pop() : ""
}

const getAll = async () => {
  const response = await axios.get(avionesURL)
  console.log(response)
  return response.data
}

const postAvion = async (avion) => {
  try {
    const token = getTokenFromCookie()
    const response = await axios.post(avionesURL, avion, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error al realizar la solicitud POST:", error)
    throw error
  }
}

const getModelos = async () => {
  const response = await axios.get(modelosURL)
  return response.data
}

const postModelo = async (modelo) => {
  try {
    const token = getTokenFromCookie()
    const response = await axios.post(modelosURL, modelo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error al realizar la solicitud POST:", error)
    throw error
  }
}

const deleteModelo = async (idModelo) => {
  try {
    const token = getTokenFromCookie()
    const response = await axios.delete(modelosURL, {
      data: { idModelo: idModelo },
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

const deleteAvion = async (idAvion) => {
  try {
    const token = getTokenFromCookie()
    const response = await axios.delete(avionesURL, {
      data: { idAvion: idAvion },
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

// eslint-disable-next-line
export default {
  getAll,
  getModelos,
  postModelo,
  deleteModelo,
  deleteAvion,
  postAvion,
}
