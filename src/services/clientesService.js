import axios from "axios"

const baseURL = "http://localhost:3001/api/clientes"

const clientesService = {
  getClientes: async () => {
    try {
      const response = await axios.get(baseURL)
      return response.data
    } catch (error) {
      console.error("Error al obtener los clientes:", error)
      throw error
    }
  },

  getClientesPasaporte: async (busqueda) => {
    const url = `${baseURL}/pasaporte/${busqueda}`
    try {
      const response = await axios.get(url)
  
      return response.data
    } catch (error) {
      console.error("Error al obtener los clientes por pasaporte:", error)
      return []
    }
  },

  getClientesEmail: async (busqueda) => {
    const url = `${baseURL}/email/${busqueda}`
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.error("Error al obtener los clientes por email:", error)
      return []
    }
  },

  getClienteById: async (idcliente) => {
    try {
      const response = await axios.get(`${baseURL}/${idcliente}`)
      return response.data
    } catch (error) {
      console.error("Error al obtener el cliente por id:", error)
      throw error
    }
  },
}

export default clientesService
