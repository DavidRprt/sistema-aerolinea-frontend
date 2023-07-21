import axios from "axios"

const url = `http://localhost:3001/api/rutas`

const getAll = async () => {
  const response = await axios.get(url)
  console.log(response)
  return response.data
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
    const response = await axios.post(
      url,
      ruta
    )
    return response.data
  } catch (error) {
    console.error("Error al realizar la solicitud POST:", error)
    throw error
  }
}

const deleteRuta = async (idRuta) => {
  try {
    const response = await axios.delete(url, {
      data: { idruta: idRuta },
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
