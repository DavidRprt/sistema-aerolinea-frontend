import { Link } from "react-router-dom"
import { GiExplodingPlanet } from "react-icons/gi"
import { MdOutlineAirplaneTicket } from "react-icons/md"
import { AiOutlineUser } from "react-icons/ai"
import { MdConnectingAirports } from "react-icons/md"
import { CiAirportSign1 } from "react-icons/ci"
import { BsFillAirplaneFill, BsFillAirplaneEnginesFill } from "react-icons/bs"

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 px-5 overflow-y-auto bg-gray-900 border-r border-gray-700 min-w-min">
      <div className="h-screen sticky top-0">
        <div className="flex flex-col flex-1 mt-6">
          <Link className="text-white text-4xl my-3 flex gap-3" to="/">
            <GiExplodingPlanet /> <h3>AirFLY</h3>
          </Link>

          <nav className="-mx-3 space-y-6 ">
            <div className="my-6 ">
              <label className="px-3 text-xl text-gray-400">Vender</label>

              <div className="flex items-center px-3 my-3 text-gray-200 transition-colors duration-300 hover:text-gray-400">
                <MdOutlineAirplaneTicket className="text-xl" />
                <Link className="mx-2 text-lg font-medium" to="/pasajes">
                  Emitir pasajes
                </Link>
              </div>

              <div className="flex items-center px-3 my-3 text-gray-200 transition-colors duration-300 hover:text-gray-400">
                <AiOutlineUser className="text-xl" />
                <Link className="mx-2 text-lg font-medium" to="/usuarios">
                  Gestionar cliente
                </Link>
              </div>

            </div>

            <div className="my-6 ">
              <label className="px-3 text-xl text-gray-400">Administrar</label>

              <div className="flex items-center px-3 my-3 text-gray-200 transition-colors duration-300 hover:text-gray-400">
                <MdConnectingAirports className="text-xl" />
                <Link className="mx-2 text-lg font-medium" to="/rutas">
                  Rutas
                </Link>
              </div>

              <div className="flex items-center px-3 my-3 text-gray-200 transition-colors duration-300 hover:text-gray-400">
                <BsFillAirplaneFill className="text-xl" />
                <Link className="mx-2 text-lg font-medium" to="/aviones">
                  Aviones
                </Link>
              </div>

              <div className="flex items-center px-3 my-3 text-gray-200 transition-colors duration-300 hover:text-gray-400">
                <BsFillAirplaneEnginesFill className="text-xl" />
                <Link className="mx-2 text-lg font-medium" to="/modelos">
                  Modelos
                </Link>
              </div>

              <div className="flex items-center px-3 my-3 text-gray-200 transition-colors duration-300 hover:text-gray-400">
                <CiAirportSign1 className="text-xl" />
                <Link className="mx-2 text-lg font-medium" to="/aeropuertos">
                  Aeropuertos
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

