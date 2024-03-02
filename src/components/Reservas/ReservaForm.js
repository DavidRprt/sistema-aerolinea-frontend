import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import reservaService from "../../services/reservaService"

const ReservaForm = () => {
  const [numeroReserva, setNumeroReserva] = useState("")
  const [error, setError] = useState("")
  const [buscar, setBuscar] = useState(false)

  const navigate = useNavigate() 

  useEffect(() => {
    const fetchReserva = async () => {
      if (buscar) {
        try {
          const result = await reservaService.getReservaById(numeroReserva)
          console.log(result)
          setBuscar(false) 
          navigate(`/reserva/${numeroReserva}`) // Redirigir al componente de detalle de la reserva
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setError("Reserva no encontrada.")
          } else {
            setError("Error al buscar la reserva.")
          }
          console.error("Error al buscar la reserva:", error)
          setBuscar(false)
        }
      }
    }

    fetchReserva()
  }, [buscar, numeroReserva, navigate]) 

  const handleSubmit = (event) => {
    event.preventDefault()
    setBuscar(true)
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
            htmlFor="numeroReserva"
          >
            Ingresa el número de reserva
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numeroReserva"
            placeholder="123456"
            value={numeroReserva}
            onChange={(e) => setNumeroReserva(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Buscar
          </button>
        </div>
      </form>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}

export default ReservaForm
