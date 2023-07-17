import React from "react"
import { Link } from "react-router-dom"
import { BiUserPlus } from "react-icons/bi"
import { useSelector } from "react-redux"

const ClientesLista = () => {

  const clientes = useSelector((state) => state.clientes)
  return (
    <div className="container mx-auto p-4">
      {clientes.length === 0 ? (
        <p>No se han encontrado clientes.</p> 
      ) : (
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Apellido</th>
            <th className="py-2 px-4 border-b">Pasaporte</th>
            <th className="py-2 px-4 border-b">Reservas Activas</th>
            <th className="py-2 px-4 border-b">Millas</th>
            <th className="py-2 px-4 border-b">Gestionar</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.idcliente}>
              <td className="py-2 px-4 border-b text-center">
                {cliente.nombre}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {cliente.apellido}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {cliente.pasaporte}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {cliente.reservasActivas}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {cliente.millas}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <Link to={`/clientes/${cliente.id}`}>
                  <button className="text-gray-500 hover:text-gray-700 text-4xl">
                    <BiUserPlus />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}</div>
  )
}

export default ClientesLista
