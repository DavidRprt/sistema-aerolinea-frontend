import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router } from "react-router-dom"
import RoutesConfig from "./utils/routes"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { cargarAeropuertos } from "./reducers/aeropuertoReducer"
import aeropuertosService from "./services/aeropuertosService"
import avionesService from "./services/avionesService"
import { cargarAviones } from "./reducers/avionReducer"
import { cargarModelos } from "./reducers/modeloReducer"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const aeropuertos = await aeropuertosService.getAll()
        const aviones = await avionesService.getAll()
        const modelos = await avionesService.getModelos()
        dispatch(cargarAeropuertos(aeropuertos))
        dispatch(cargarAviones(aviones))
        dispatch(cargarModelos(modelos))
        console.log("Datos cargados exitosamente")
      } catch (error) {
        console.error("Error al cargar los datos:", error)
      }
    }

    cargarDatos()
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <div className="flex bg-gray-200">
          <Sidebar />
          <div className="flex flex-col w-full">
            <Navbar />
            <RoutesConfig />
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
