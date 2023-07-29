import axios from "axios"

const url = `http://localhost:3001/api/pasajes`

const getPasajesByAirport = async (idorigen, iddestino) => {
  try {
    const response = await axios.get(`${url}/:idorigen/:iddestino`)
    return response.data
  } catch (error) {
    console.error("Error al obtener los pasajes:", error)
    throw new Error("Error al obtener los pasajes")
  }
}

const crearPasaje = async (pasaje) => {
  try {
    const response = await axios.post(url, pasaje)
    return response.data
  } catch (error) {
    console.error("Error al crear el pasaje:", error)
    throw new Error("Error al crear el pasaje")
  }
}

// eslint-disable-next-line
export default { getPasajesByAirport, crearPasaje }
