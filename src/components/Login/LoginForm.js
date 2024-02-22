import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import empleadoService from "../../services/empleadoService"
import Cookies from "js-cookie"
import { setUser } from "../../reducers/userReducer"
import { useDispatch } from "react-redux"

const LoginForm = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = Cookies.get("userInfo")
    if (userInfo) {
      setIsLoggedIn(true)
    }
  }, [])

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return regex.test(email)
  }

  const handleForm = async (e) => {
    e.preventDefault()

    // Validación de campos vacíos
    if (!email || !password) {
      setError("Por favor completa todos los campos.")
      return
    }

    // Validación de formato de email
    if (!isValidEmail(email)) {
      setError("Por favor ingresa un email válido.")
      return
    }

    const loginData = {
      email,
      password,
    }

    try {
      const response = await empleadoService.login(loginData)
      setError("") // Si no hay errores, reseteamos cualquier error anterior
      Cookies.set("token", response.token, { expires: 1 / 24 })
      // Guardar la información del usuario en otra cookie
      Cookies.set("userInfo", JSON.stringify(response.user), {
        expires: 1 / 24,
      })
      dispatch(setUser(response.user))
      navigate("/")
    } catch (err) {
      setError(err.message) // Seteamos el mensaje de error proveniente del backend
    }
  }

  return (
    <div className="flex min-h-screen items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md space-y-8">
        {isLoggedIn ? (
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Ya has iniciado sesión
            </h2>
          </div>
        ) : (
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Inicia sesión en tu cuenta
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleForm}>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded mt-1 focus:outline-none focus:border-indigo-500"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded mt-1 focus:outline-none focus:border-indigo-500"
                    placeholder="Contraseña"
                  />
                </div>
              </div>

              <div className="text-sm flex gap-2">
                <Link
                  className="font-medium text-red-600 hover:text-red-700"
                  to="/forgot"
                >
                  ¿Olvidaste la contraseña?
                </Link>
              </div>

              <div className="text-sm flex gap-2">
                <p>¿No tienes una cuenta?</p>
                <Link
                  className="font-medium text-teal-500 hover:text-teal-700"
                  to="/signup"
                >
                  Registrate
                </Link>
              </div>

              {error && <div className="text-red-500 mt-2 mb-2">{error}</div>}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default LoginForm
