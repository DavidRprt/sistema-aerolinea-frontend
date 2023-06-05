import { useState } from "react"

const SearchClientCard = () => {
  const [user, setUser] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    // Agregar logica del submit
  }

  return (
    <div className="mx-4 w-auto bg-white rounded-xl shadow-md overflow-hidden md:w-auto m-3 p-4">
      <h2 className="text-xl mb-4">Encontrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="flightCode">
            Código de cliente
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="flightCode"
            type="text"
            placeholder="Ingresar código de vuelo"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Buscar
        </button>
      </form>
    </div>
  )
}

export default SearchClientCard
