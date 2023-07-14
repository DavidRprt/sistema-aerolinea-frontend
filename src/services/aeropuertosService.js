import axios from "axios"

const url = `http://localhost:3001/api/aeropuertos`

const getAll = async () => {
  const response = await axios.get(url)
  console.log(response)
  return response.data
}

const postAeropuerto = async (aeropuerto) => {
  try {
    const response = await axios.post(url, aeropuerto)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error al realizar la solicitud POST:", error)
    throw error
  }
}

const deleteAeropuerto = async (idAeropuerto) => {
  try {
    const response = await axios.delete(url, {
      data: { idAeropuerto: idAeropuerto },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error al realizar la solicitud DELETE:", error)
    throw error
  }
}


// eslint-disable-next-line
export default { getAll, postAeropuerto, deleteAeropuerto }
