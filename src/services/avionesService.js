import axios from "axios"

const getAll = async () => {
  const url = `http://localhost:3001/api/aviones`
  const response = await axios.get(url)
  console.log(response)
  return response.data
}

const getModelos = async () => {
  const url = `http://localhost:3001/api/modelos`
  const response = await axios.get(url)
  console.log(response)
  return response.data
}

const postModelo = async (modelo) => {
  try {
     const url = `http://localhost:3001/api/modelos`
    const response = await axios.post(url, modelo)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error al realizar la solicitud POST:", error)
    throw error
  }
}

const deleteModelo = async (idModelo) => {
  try {
    const response = await axios.delete(`http://localhost:3001/api/modelos`, {
      data: { idModelo: idModelo },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error al realizar la solicitud DELETE:", error)
    throw error
  }
}

// eslint-disable-next-line
export default { getAll, getModelos, postModelo, deleteModelo }
