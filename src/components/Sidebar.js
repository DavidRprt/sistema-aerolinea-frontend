import { Link } from "react-router-dom"
import { GiExplodingPlanet } from "react-icons/gi"
import { MdOutlineAirplaneTicket } from "react-icons/md"
import { AiOutlineUser } from "react-icons/ai"
import {
  MdConnectingAirports,
  MdOutlinePeople,
  MdOutlinePersonOutline,
} from "react-icons/md"
import { CiAirportSign1 } from "react-icons/ci"
import { BsFillAirplaneFill, BsFillAirplaneEnginesFill } from "react-icons/bs"
import { useSelector } from "react-redux"

// MenuComponent: Clase base para elementos de menú
class MenuComponent {
  constructor(name) {
    this.name = name
  }

  render() {
    // Método de renderizado base, será sobreescrito
  }
}

// MenuItem: Representa un enlace individual del menú
class MenuItem extends MenuComponent {
  constructor(name, icon, to) {
    super(name)
    this.icon = icon
    this.to = to
  }

  render() {
    return (
      <div className="flex items-center px-3 my-3 text-gray-200 transition-colors duration-300 hover:text-gray-400">
        {this.icon}
        <Link className="mx-2 text-lg font-medium" to={this.to}>
          {this.name}
        </Link>
      </div>
    )
  }
}

// MenuGroup: Representa un grupo de elementos de menú
class MenuGroup extends MenuComponent {
  constructor(name, items = []) {
    super(name)
    this.items = items
  }

  render() {
    return (
      <div className="my-6">
        <label className="px-3 text-xl text-gray-400">{this.name}</label>
        {this.items.map((item, index) => (
          <div key={item.name + index}>{item.render()}</div>
        ))}
      </div>
    )
  }
}

// Sidebar: Componente de barra lateral con elementos de menú
const Sidebar = () => {
  const user = useSelector((state) => state.user)

  const venderItems = [
    new MenuItem(
      "Emitir pasajes",
      <MdOutlineAirplaneTicket className="text-xl" />,
      "/pasajes"
    ),
    new MenuItem(
      "Gestionar cliente",
      <AiOutlineUser className="text-xl" />,
      "/usuarios"
    ),
  ]

  const administrarItems = [
    new MenuItem(
      "Rutas",
      <MdConnectingAirports className="text-xl" />,
      "/rutas"
    ),
    new MenuItem(
      "Aviones",
      <BsFillAirplaneFill className="text-xl" />,
      "/aviones"
    ),
    new MenuItem(
      "Modelos",
      <BsFillAirplaneEnginesFill className="text-xl" />,
      "/modelos"
    ),
    new MenuItem(
      "Aeropuertos",
      <CiAirportSign1 className="text-xl" />,
      "/aeropuertos"
    ),
    new MenuItem(
      "Tripulantes",
      <MdOutlinePersonOutline className="text-xl" />,
      "/tripulantes"
    ),
    new MenuItem(
      "Tripulaciones",
      <MdOutlinePeople className="text-xl" />,
      "/tripulaciones"
    ),
  ]

  const venderGroup = new MenuGroup("Vender", venderItems)
  const administrarGroup = new MenuGroup("Administrar", administrarItems)

  return (
    <div className="flex flex-col w-64 px-5 overflow-y-auto bg-gray-900 border-r border-gray-700 min-w-min">
      <div className="h-screen sticky top-0">
        <div className="flex flex-col flex-1 mt-6">
          <Link className="text-white text-4xl my-3 flex gap-3" to="/">
            <GiExplodingPlanet /> <h3>AirFLY</h3>
          </Link>
          <nav className="-mx-3 space-y-6">
            {user && user.idempleo === 2 && venderGroup.render()}
            {user && user.idempleo === 1 && administrarGroup.render()}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
