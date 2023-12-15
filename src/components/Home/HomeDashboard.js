import clientesService from "../../services/clientesService"
import React, { useEffect, useState } from "react"

const HomeDashboard = () => {
  const [topClientes, setTopClientes] = useState([])

  useEffect(() => {
    const cargarTopClientes = async () => {
      const clientes = await clientesService.getTopClientes()
      setTopClientes(clientes)
    }

    cargarTopClientes()
  }, [])

  return (
    <div>
      <h1 className="text-4xl p-3">Reportes:</h1>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl mb-4">Top 5 Clientes con Más Millas</h2>
        {topClientes.length > 0 ? (
          <ul>
            {topClientes.map((cliente, index) => (
              <li key={index}>
                <span>
                  {cliente.nombre} {cliente.apellido} - Millas: {cliente.millas}{" "}
                  - Vuelos: {cliente.cantidadVuelos} - Millas Promedio por
                  Vuelo: {cliente.millasPromedioPorVuelo.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay datos de clientes disponibles.</p>
        )}
      </div>
    </div>
  )
}

export default HomeDashboard