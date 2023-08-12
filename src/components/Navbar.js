import { Link } from "react-router-dom"
import { TbUserCircle } from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux"
import Cookies from "js-cookie"
import { clearUser } from "../reducers/userReducer"

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    // Eliminar las cookies
    Cookies.remove("token")
    Cookies.remove("userInfo")

    // Actualizar el estado de Redux
    dispatch(clearUser())
  }

  return (
    <nav className="flex items-center justify-end gap-3 flex-wrap bg-gray-600 px-8 py-2 mb-5">
      <div className="text-sm flex items-center gap-3 justify-end">
        <Link to="/" className="mr-4">
          <TbUserCircle className="text-white text-5xl hover:text-gray-300" />
        </Link>

        {user ? (
          <>
            <span className="text-white text-lg font-semibold mr-4">
              {user.nombre} {user.apellido}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/signup"
              className="bg-white hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
