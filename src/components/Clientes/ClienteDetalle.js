import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import clientesService from "../../services/clientesService"
import { Spin } from "antd"
import { cargarSingleCliente } from "../../reducers/clienteReducer"
import { useNavigate } from "react-router-dom"

const ClienteDetalle = () => {
  const { id } = useParams()
  const clienteCargado = useSelector((state) => state.clientes.clienteCargado)
  const navigate = useNavigate()

  const getStatus = (millas) => {
    if (millas === 0) {
      return "N/A"
    } else if (millas < 1500) {
      return "Silver"
    } else if (millas < 3000) {
      return "Gold"
    } else {
      return "Platinum"
    }
  }

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  const pasajesActivos =
    clienteCargado && clienteCargado.pasajes
      ? clienteCargado.pasajes.filter(
          (pasaje) => new Date(pasaje.fecha) > new Date()
        )
      : []

  const pasajesExpirados =
    clienteCargado && clienteCargado.pasajes
      ? clienteCargado.pasajes.filter(
          (pasaje) => new Date(pasaje.fecha) <= new Date()
        )
      : []

  const agruparPasajesPorReserva = (pasajes) => {
    return pasajes.reduce((acc, pasaje) => {
      const idReserva = pasaje.idreserva ?? "Sin Reserva"
      if (!acc[idReserva]) {
        acc[idReserva] = []
      }
      acc[idReserva].push(pasaje)
      return acc
    }, {})
  }

  const pasajesActivosAgrupados = agruparPasajesPorReserva(pasajesActivos)
  console.log(pasajesActivos)

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const cliente = await clientesService.getClienteById(id)
        console.log(cliente)
        dispatch(cargarSingleCliente(cliente))
      } catch (error) {
        console.error("Error al obtener el cliente desde el backend:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCliente()
  }, [id, dispatch])

  const handleVerReservaClick = (idreserva) => {
    navigate(`/reserva/${idreserva}`)
  }

  // Muestra un indicador de carga si los datos están cargándose
  if (loading) {
    return <Spin size="large" />
  }

  return (
    <div className="container mx-auto p-4 flex items-center">
      {clienteCargado ? (
        <div>
          <div>
            <h2 className="text-2xl font-bold">Información del Cliente</h2>
            <p className="my-2">
              <span className="font-semibold">Nombre:</span>{" "}
              {clienteCargado.nombre}
            </p>
            <p className="my-2">
              <span className="font-semibold">Apellido:</span>{" "}
              {clienteCargado.apellido}
            </p>
            <p className="my-2">
              <span className="font-semibold">Email:</span>{" "}
              {clienteCargado.email}
            </p>
            <p className="my-2">
              <span className="font-semibold">Millas:</span>{" "}
              {clienteCargado.millas}
            </p>
            <p className="my-2">
              <span className="font-semibold">Status:</span>{" "}
              {getStatus(clienteCargado.millas)}
            </p>
            <p className="my-2">
              <span className="font-semibold">Pasaporte:</span>{" "}
              {clienteCargado.pasaporte}
            </p>
            <p className="my-2">
              <span className="font-semibold">Teléfono:</span>{" "}
              {clienteCargado.telefono}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Reservas Activas</h2>
            {Object.entries(pasajesActivosAgrupados).map(
              ([idReserva, pasajes]) => (
                <div
                  key={idReserva}
                  className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold my-2">
                      Reserva {idReserva}
                    </h3>
                    <button
                      onClick={() => handleVerReservaClick(idReserva)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Ver Reserva
                    </button>
                  </div>
                  <ul>
                    {pasajes.map((pasaje, index) => (
                      <li
                        key={pasaje.idpasaje}
                        className={`my-2 ml-4 ${
                          index < pasajes.length - 1 ? "mb-4" : ""
                        }`}
                      >
                        <div className="flex flex-col gap-1 text-lg">
                          <div>
                            <span className="font-semibold">
                              Código de pasaje:
                            </span>{" "}
                            {pasaje.idpasaje}
                          </div>
                          <div>
                            <span className="font-semibold">Origen:</span>{" "}
                            {pasaje.rutum.idorigen}
                          </div>
                          <div>
                            <span className="font-semibold">Destino:</span>{" "}
                            {pasaje.rutum.iddestino}
                          </div>
                          <div>
                            <span className="font-semibold">Fecha:</span>{" "}
                            {pasaje.fecha}
                          </div>
                          <div>
                            <span className="font-semibold">Menú:</span>{" "}
                            {pasaje.menu.nombre}
                          </div>
                          <div>
                            <span className="font-semibold">
                              Horario de salida:
                            </span>{" "}
                            {pasaje.rutum.horariosalida}
                          </div>
                          <div>
                            <span className="font-semibold">Duración:</span>{" "}
                            {pasaje.rutum.duracion} horas
                          </div>
                          <div>
                            <span className="font-semibold">Avión:</span>{" "}
                            {pasaje.rutum.avion.nombre}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-red-600">
              Reservas Expiradas
            </h2>
            <ul>
              {pasajesExpirados.map((pasaje) => (
                <li key={pasaje.idpasaje} className="my-2 flex-col">
                  <div className="flex gap-1 text-xl">
                    <div className="font-semibold">Codigo de pasaje:</div>
                    <div> {pasaje.idpasaje}</div>
                  </div>
                  <div className="flex gap-1">
                    <div className="font-semibold">Origen:</div>
                    <div> {pasaje.rutum.idorigen}</div>
                  </div>
                  <div className="flex gap-1">
                    <div className="font-semibold">Destino:</div>
                    <div> {pasaje.rutum.iddestino} </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="font-semibold">Fecha:</div>
                    <div>{pasaje.fecha}</div>
                  </div>
                  <div className="flex gap-1">
                    <div className="font-semibold">Menú:</div>
                    <div> {pasaje.menu.nombre}</div>
                  </div>
                  <div className="flex gap-1">
                    <div className="font-semibold">Horario:</div>
                    <div> {pasaje.rutum.horariosalida}</div>
                  </div>
                  <div className="flex gap-1">
                    <div className="font-semibold">Duración:</div>
                    <div> {pasaje.rutum.duracion} horas </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="font-semibold">Avión:</div>
                    <div> {pasaje.rutum.avion.nombre} </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>No se ha encontrado el cliente.</p>
      )}
    </div>
  )
}

export default ClienteDetalle
