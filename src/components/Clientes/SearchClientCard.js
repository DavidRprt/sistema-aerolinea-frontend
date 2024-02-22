import React, { useState } from "react"
import { useDispatch } from "react-redux"
import clientesService from "../../services/clientesService"
import { cargarClientes } from "../../reducers/clienteReducer" 
const BuscarCliente = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState({
    type: "pasaporte",
    label: "Pasaporte",
  })

  const dispatch = useDispatch() 

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSelectChange = (e) => {
    setSearchType({
      type: e.target.value,
      label: e.target.options[e.target.selectedIndex].text,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const busqueda = { busqueda: searchQuery }

    try {
      if (searchType.type === "pasaporte") {
        const response = await clientesService.getClientesPasaporte(
          busqueda.busqueda
        )
        dispatch(cargarClientes(response)) 
      } else if (searchType.type === "email") {
        const response = await clientesService.getClientesEmail(
          busqueda.busqueda
        )
        dispatch(cargarClientes(response)) 
      }
    } catch (error) {
      console.error("Error al obtener clientes:", error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border border-gray-300 rounded"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="searchType"
          >
            Buscar cliente por:
          </label>
          <select
            value={searchType.type}
            onChange={handleSelectChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="pasaporte">Pasaporte</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="searchQuery"
            value={searchQuery}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  )
}

export default BuscarCliente
