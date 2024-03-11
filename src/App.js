import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router } from "react-router-dom"
import RoutesConfig from "./utils/routes"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { cargarAeropuertos } from "./reducers/aeropuertoReducer"
import aeropuertosService from "./services/aeropuertosService"
import avionesService from "./services/avionesService"
import rutasService from "./services/rutasService"
import { cargarAviones } from "./reducers/avionReducer"
import { cargarModelos } from "./reducers/modeloReducer"
import { cargarRutas } from "./reducers/rutaReducer"
import Cookies from "js-cookie"
import { setUser } from "./reducers/userReducer"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(
  "pk_test_51OtERiCIkjrHMdYqtQUNIQb0PQbGR1uunHTn6JRLMwZmmzpn0tGTqqK74NfZDYxyy6ff0pvq2bkV5ykKNCIkp2TH00yKoK3Ky2"
)

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const aeropuertos = await aeropuertosService.getAll()
        const aviones = await avionesService.getAll()
        const modelos = await avionesService.getModelos()
        const rutas = await rutasService.getAll()
        dispatch(cargarAeropuertos(aeropuertos))
        dispatch(cargarAviones(aviones))
        dispatch(cargarModelos(modelos))
        dispatch(cargarRutas(rutas))
      } catch (error) {
        console.error("Error al cargar los datos:", error)
      }
    }

    cargarDatos()
  }, [dispatch])

  useEffect(() => {
    // Leer la cookie que contiene la información del usuario
    const userDataInCookie = Cookies.get("userInfo")

    if (userDataInCookie) {
      const parsedData = JSON.parse(userDataInCookie)
      dispatch(setUser(parsedData))
    }
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <Elements stripe={stripePromise}>
          <div className="flex bg-gray-200">
            <Sidebar />
            <div className="flex flex-col w-full">
              <Navbar />
              <RoutesConfig />
            </div>
          </div>
        </Elements>
      </Router>
    </div>
  )
}

export default App
