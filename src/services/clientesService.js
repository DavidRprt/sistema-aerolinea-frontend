import axios from "axios"

const baseURL = `${process.env.REACT_APP_API_URL}/clientes`

const getTokenFromCookie = () => {
  const tokenName = "token"
  const match = document.cookie.match(
    "(^|;)\\s*" + tokenName + "\\s*=\\s*([^;]+)"
  )
  return match ? match.pop() : ""
}

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

  updateClienteMillas: async (idcliente, millas) => {
    const millasSumar = idcliente.millas
    const token = getTokenFromCookie()
    try {
      const response = await axios.patch(
        `${baseURL}/${idcliente.idcliente}`,
        { millas: millasSumar },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      console.error("Error al actualizar las millas del cliente:", error)
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

  getTopClientes: async () => {
    const url = `http://localhost:3001/api/topclientes`
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.error("Error al obtener los clientes con mas millas:", error)
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

  postCliente: async (cliente) => {
    const token = getTokenFromCookie()
    try {
      const response = await axios.post(baseURL, cliente, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error)
      throw error
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
