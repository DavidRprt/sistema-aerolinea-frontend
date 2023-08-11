import React, { useState } from "react"
import { Link } from "react-router-dom"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleForm = (e) => {
    e.preventDefault()
    console.log("Username:", email)
    console.log("Password:", password)
  }

  return (
    <div className="flex min-h-screen items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md space-y-8">
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
            <p>¿No tienes una cuenta?</p>
            <Link
              className="font-medium text-teal-500 hover:text-teal-700"
              to="/signup"
            >
              Registrate
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
