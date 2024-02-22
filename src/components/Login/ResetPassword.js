import React, { useState } from "react"
import { useParams } from "react-router-dom"
import authService from "../../services/authService"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const { token } = useParams()

  const handleForm = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {
      const data = await authService.resetPassword(token, password)
      setMessage(data.message)
      setError("")
    } catch (err) {
      setError(err.response?.data.error || "Ocurrió un error desconocido")
      setMessage("")
    }
  }

  return (
    <div className="flex min-h-screen items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Restablecer Contraseña
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleForm}>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded mt-1 focus:outline-none focus:border-indigo-500"
              placeholder="Nueva Contraseña"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded mt-1 focus:outline-none focus:border-indigo-500"
              placeholder="Confirmar Nueva Contraseña"
              required
            />
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          {message && <div className="text-green-500 mt-2">{message}</div>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Restablecer Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
