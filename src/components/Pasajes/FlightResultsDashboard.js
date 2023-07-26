import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import rutasService from "../../services/rutasService"
import VueloForm from "./VueloForm"
import { useNavigate } from "react-router-dom"

const FlightsResultDashboard = () => {
  const navigate = useNavigate()
  const busqueda = useSelector((state) => state.busqueda)
  const dispatch = useDispatch()
  const [vuelosIda, setVuelosIda] = useState([])
  const [vuelosVuelta, setVuelosVuelta] = useState([])
  const [reservaIda, setReservaIda] = useState({})
  const [reservaVuelta, setReservaVuelta] = useState({})

  const handleContinue = () => {
    // Si es solo ida y los campos requeridos de reservaIda están vacíos
    if (!reservaIda.fecha || !reservaIda.idclase) {
      alert("Por favor, completa todos los campos para el vuelo de ida")
      return
    }

    // Si no es solo ida y los campos requeridos de reservaVuelta están vacíos
    if (!busqueda.oneway && (!reservaVuelta.fecha || !reservaVuelta.idclase)) {
      alert("Por favor, completa todos los campos para el vuelo de vuelta")
      return
    }

    // Si todo está bien, imprime los objetos de reserva
    navigate("/checkout")
    console.log("Reserva de ida:", reservaIda)
    if (!busqueda.oneway) console.log("Reserva de vuelta:", reservaVuelta)
  }

  useEffect(() => {
    const buscarVuelos = async () => {
      try {
        const vuelosObtenidosIda = await rutasService.getRutasByAirport(
          busqueda.idorigen,
          busqueda.iddestino
        )
        setVuelosIda(vuelosObtenidosIda)

        if (!busqueda.oneway) {
          const vuelosObtenidosVuelta = await rutasService.getRutasByAirport(
            busqueda.iddestino,
            busqueda.idorigen
          )
          setVuelosVuelta(vuelosObtenidosVuelta)
        }
      } catch (error) {
        console.error("Error al buscar vuelos:", error)
      }
    }

    buscarVuelos()
  }, [busqueda, dispatch])

  return (
    <div>
      <h1 className="text-4xl font-bold m-2">
        Resultado de búsqueda de vuelos
      </h1>
      {!busqueda.oneway &&
        vuelosIda.length === 0 &&
        vuelosVuelta.length === 0 && (
          <p>No se encontraron rutas disponibles de ida ni vuelta.</p>
        )}
      {busqueda.oneway && vuelosIda.length === 0 && (
        <p className="text-2xl text-gray-600 m-2">
          No se encontraron rutas disponibles de ida.
        </p>
      )}
      {vuelosIda.length > 0 && (
        <div>
          <h2 className="text-2xl text-gray-600 m-2">Vuelos de ida:</h2>
          {vuelosIda.map((vuelo) => (
            <VueloForm
              key={vuelo.idruta}
              vuelo={vuelo}
              fecha={busqueda.fechhaida}
              setReserva={setReservaIda}
            />
          ))}
        </div>
      )}
      {!busqueda.oneway && vuelosVuelta.length > 0 && (
        <div>
          <h2 className="text-2xl text-gray-600 m-2">Vuelos de vuelta:</h2>
          {vuelosVuelta.map((vuelo) => (
            <VueloForm
              key={vuelo.idruta}
              vuelo={vuelo}
              fecha={busqueda.fechavuelta}
              setReserva={setReservaVuelta}
            />
          ))}
        </div>
      )}
      <div className="flex justify-between mt-4 mx-2">
        <button
          className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => navigate("/pasajes")}
        >
          Volver
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleContinue()}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

export default FlightsResultDashboard
