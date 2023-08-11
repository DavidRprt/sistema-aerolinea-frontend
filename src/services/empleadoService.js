import axios from "axios"

const url = `http://localhost:3001/api` 

const login = async (credentials) => {
  try {
    const response = await axios.post(`${url}/login`, credentials) 
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error al realizar la solicitud de inicio de sesión:", error)
    throw error
  }
}

const signUp = async (empleadoData) => {
  try {
    const response = await axios.post(`${url}/signup`, empleadoData) 
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error al realizar la solicitud de registro:", error)
    throw error
  }
}

// eslint-disable-next-line
export default { login, signUp }
