import axios from "axios"

const url = `http://localhost:3001/api/rutas`

const getTokenFromCookie = () => {
  const tokenName = "token"
  const match = document.cookie.match(
    "(^|;)\\s*" + tokenName + "\\s*=\\s*([^;]+)"
  )
  return match ? match.pop() : ""
}

const getAll = async () => {
  try {
    const response = await axios.get(url)
    console.log(response)
    return response.data
  } catch (error) {
    console.error("Error al obtener todas las rutas:", error)
    throw error
  }
}

const getRutasByAirport = async (idorigen, iddestino) => {
  try {
    const response = await axios.get(`${url}/${idorigen}/${iddestino}`)
    return response.data
  } catch (error) {
    console.error("Error al obtener las rutas:", error)
    throw new Error("Error al obtener las rutas")
  }
}

const postRuta = async (ruta) => {
  try {
    const token = getTokenFromCookie()
    const response = await axios.post(url, ruta, {
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

const deleteRuta = async (idRuta) => {
  try {
    const token = getTokenFromCookie()
    const response = await axios.delete(url, {
      data: { idruta: idRuta },
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
export default { getAll, postRuta, deleteRuta, getRutasByAirport }
