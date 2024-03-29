import axios from "axios"

const url = `${process.env.REACT_APP_API_URL}`

const signUp = async (empleadoData) => {
  try {
    const response = await axios.post(`${url}/signup`, empleadoData)
    return response.data
  } catch (error) {
    console.error("Error al realizar la solicitud POST para registrar:", error)
    throw error
  }
}

const getAllEmpleos = async () => {
  try {
    const response = await axios.get(`${url}/empleos`)
    return response.data
  } catch (error) {
    console.error(
      "Error al realizar la solicitud GET para obtener empleos:",
      error
    )
    throw error
  }
}

const login = async (loginData) => {
  try {
    const response = await axios.post(`${url}/login`, loginData)
    return response.data
  } catch (error) {
    console.error(
      "Error al realizar la solicitud POST para iniciar sesión:",
      error
    )
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error) // Lanzamos el error con el mensaje del backend
    } else {
      throw new Error("Error desconocido durante el inicio de sesión")
    }
  }
}


// eslint-disable-next-line
export default { signUp, getAllEmpleos, login }
