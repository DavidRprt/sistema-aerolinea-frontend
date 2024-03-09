import axios from "axios"

const url = `${process.env.REACT_APP_API_URL}/pasajes`

const getTokenFromCookie = () => {
  const tokenName = "token"
  const match = document.cookie.match(
    "(^|;)\\s*" + tokenName + "\\s*=\\s*([^;]+)"
  )
  return match ? match.pop() : ""
}

const getPasajesByAirport = async (idorigen, iddestino) => {
  try {
    const response = await axios.get(`${url}/:idorigen/:iddestino`)
    return response.data
  } catch (error) {
    console.error("Error al obtener los pasajes:", error)
    throw new Error("Error al obtener los pasajes")
  }
}

const getTodosLosEquipajes = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/equipajes`,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error("Error al obtener los equipajes:", error)
    throw new Error("Error al obtener los equipajes")
  }
}

const crearPasaje = async (pasaje) => {
  try {
    const token = getTokenFromCookie()
    const response = await axios.post(url, pasaje, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error al crear el pasaje:", error)
    throw new Error("Error al crear el pasaje")
  }
}

const getTodosLosMenues = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/menues`,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromCookie()}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error("Error al obtener los menús:", error)
    throw new Error("Error al obtener los menús")
  }
}

const getFrecuenciaPorClase = async () => {
  try {
    const token = getTokenFromCookie()
    const response = await axios.get(`${url}/frecuenciaPorClase`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error al obtener la frecuencia de pasajes por clase:", error)
    throw new Error("Error al obtener la frecuencia de pasajes por clase")
  }
}

const actualizarMenusDePasajes = async (cambios) => {
  const token = getTokenFromCookie()
  const response = await axios.patch(`${url}/menus`, cambios, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

// eslint-disable-next-line
export default {
  getPasajesByAirport,
  crearPasaje,
  getFrecuenciaPorClase,
  getTodosLosMenues,
  actualizarMenusDePasajes,
  getTodosLosEquipajes
}
