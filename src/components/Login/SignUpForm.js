import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import SelectEmpleo from "./SelectBoxEmpleos"
import empleadoService from "../../services/empleadoService"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

const SignUpForm = () => {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [idempleo, setEmpleo] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

    // Reset error al inicio
    setError("")

    // Validación: Campos vacíos
    if (
      !nombre ||
      !apellido ||
      !email ||
      !idempleo ||
      !password ||
      !confirmPassword
    ) {
      setError("Por favor completa todos los campos.")
      return
    }

    // Validación: Formato de email
    if (!isValidEmail(email)) {
      setError("Por favor ingresa un email válido.")
      return
    }

    // Validación: Coincidencia de contraseñas
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }

    // Si hay un error en las validaciones anteriores, regresa
    if (error) {
      return
    }

    // Preparar la data del formulario para enviar
    const formData = {
      nombre,
      apellido,
      email,
      idempleo,
      password,
    }

    // Intentar registrar el usuario
    try {
      const responseData = await empleadoService.signUp(formData)
      console.log("Respuesta del servidor:", responseData)
      // Redireccionar al formulario de login después de un registro exitoso
      navigate("/login")
    } catch (err) {
      setError("Error al registrar. Por favor intenta de nuevo.")
    }
  }

  const handleEmpleoSelect = (empleoId) => {
    setEmpleo(empleoId)
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
                Regístrate para una nueva cuenta
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleForm}>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded mt-1 focus:outline-none focus:border-indigo-500"
                    placeholder="Nombre"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded mt-1 focus:outline-none focus:border-indigo-500"
                    placeholder="Apellido"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded mt-1 focus:outline-none focus:border-indigo-500"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <SelectEmpleo onSelect={handleEmpleoSelect} />
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
                <div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded mt-1 focus:outline-none focus:border-indigo-500"
                    placeholder="Confirmar Contraseña"
                  />
                </div>
              </div>

              <div className="text-sm flex gap-2">
                <p>¿Ya tienes una cuenta?</p>
                <Link
                  className="font-medium text-cyan-500 hover:text-cyan-700"
                  to="/login"
                >
                  Inicia sesión
                </Link>
              </div>
              {error && <div className="text-red-500 mt-2 mb-2">{error}</div>}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Regístrate
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )

}

export default SignUpForm
