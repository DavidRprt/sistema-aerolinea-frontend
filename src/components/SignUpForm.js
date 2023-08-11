import React, { useState } from "react"
import { Link } from "react-router-dom"

const SignUpForm = () => {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [empleo, setEmpleo] = useState("")

  const handleForm = (e) => {
    e.preventDefault()
    console.log("Nombre:", nombre)
    console.log("Apellido:", apellido)
    console.log("Email:", email)
    console.log("Empleo:", empleo)
  }

  return (
    <div className="flex min-h-screen items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md space-y-8">
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
              <select
                value={empleo}
                onChange={(e) => setEmpleo(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled>
                  Selecciona tu empleo
                </option>
                <option value="administrador">Administrador</option>
                <option value="vendedor">Vendedor</option>
                <option value="todo">Todo</option>
              </select>
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

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Regístrate
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpForm
