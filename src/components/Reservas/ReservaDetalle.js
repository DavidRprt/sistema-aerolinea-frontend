import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import reservaService from "../../services/reservaService"
import pasajesService from "../../services/pasajesService"
import { PDFDownloadLink } from "@react-pdf/renderer"
import PasajePDF from "./PasajePDF"

const ReservaDetalle = () => {
  const { id } = useParams()
  const [reserva, setReserva] = useState(null)
  const [equipajes, setEquipajes] = useState([])
  const [error, setError] = useState("")
  const [reservaPasada, setReservaPasada] = useState(false)
  const [menues, setMenues] = useState([])
  const [menuSeleccionados, setMenuSeleccionados] = useState({})

  useEffect(() => {
    const fetchReservaDetalleYMenues = async () => {
      try {
        // Solicitar detalles de la reserva y menús de manera concurrente
        const reservaPromise = reservaService.getReservaById(id)
        const menuesPromise = pasajesService.getTodosLosMenues()
        const equipajesPromise = await pasajesService.getTodosLosEquipajes()
        setEquipajes(equipajesPromise)
        const [reservaResult, menuesResult] = await Promise.all([
          reservaPromise,
          menuesPromise,
        ])

        setReserva(reservaResult)
        setMenues(menuesResult)

        const hoy = new Date()
        const todosPasados = reservaResult.pasajes.every((pasaje) => {
          const fechaPasaje = new Date(pasaje.fecha)
          return fechaPasaje < hoy
        })
        setReservaPasada(todosPasados)
      } catch (error) {
        console.error(
          "Error al obtener los detalles de la reserva o los menús:",
          error
        )
        setError(
          "No se pudieron obtener los detalles de la reserva o los menús."
        )
      }
    }

    fetchReservaDetalleYMenues()
  }, [id])

  const hayCambiosPendientes = Object.keys(menuSeleccionados).length > 0

  console.log(equipajes)

  const contarEquipajes = (idpasaje) => {
    return equipajes.filter((equipaje) => equipaje.idpasaje === idpasaje).length
  }

  const hayCambiosParaGuardar = Object.entries(menuSeleccionados).some(
    ([idpasaje, id_menu]) =>
      id_menu !==
      reserva.pasajes
        .find((p) => p.idpasaje.toString() === idpasaje)
        .id_menu.toString()
  )

  const guardarCambiosMenues = async () => {
    try {
      const cambios = Object.entries(menuSeleccionados).reduce(
        (acc, [idpasaje, id_menu]) => {
          if (
            id_menu !==
            reserva.pasajes
              .find((p) => p.idpasaje.toString() === idpasaje)
              .id_menu.toString()
          ) {
            acc[idpasaje] = id_menu
          }
          return acc
        },
        {}
      )

      if (Object.keys(cambios).length > 0) {
        await pasajesService.actualizarMenusDePasajes(cambios)
        alert("Cambios guardados correctamente.")
      }
    } catch (error) {
      console.error("Error al guardar los cambios de menús:", error)
      alert("Error al guardar los cambios.")
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!reserva) {
    return <div>Cargando detalles de la reserva...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold mb-4">Detalles de la Reserva</h1>
        {hayCambiosPendientes && (
          <button
            onClick={guardarCambiosMenues}
            disabled={!hayCambiosParaGuardar}
            className={`${
              hayCambiosParaGuardar
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-500 cursor-not-allowed"
            } text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out`}
          >
            Guardar cambios
          </button>
        )}
      </div>

      {reservaPasada && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
          role="alert"
        >
          <p>Esta reserva ya sucedió.</p>
        </div>
      )}
      <div className="bg-white p-4 border border-gray-300 rounded mb-4">
        <h2 className="text-xl mb-2">
          <b>Número de reserva:</b> {reserva.idreserva}
        </h2>
        <p>
          <strong>Fecha de Emisión:</strong> {reserva.fechaemision}
        </p>
        <p>
          <strong>Método de Pago:</strong> {reserva.idmetodo}
        </p>
        <p>
          <strong>Precio Total:</strong> ${reserva.preciototal}
        </p>
      </div>

      <h2 className="text-xl font-bold mb-4">Pasajes</h2>
      {reserva.pasajes.map((pasaje, index) => {
        const esPasajePasado = new Date(pasaje.fecha) < new Date()
        const handleMenuChange = (idpasaje, nuevoIdMenu) => {
          setMenuSeleccionados((prev) => ({
            ...prev,
            [idpasaje]: nuevoIdMenu,
          }))
        }
        return (
          <div
            key={index}
            className={`p-4 border mb-4 rounded ${
              esPasajePasado
                ? "bg-red-100 border-red-400"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            <div className="flex justify-between items-center">
              <h3
                className={`text-lg font-semibold ${
                  esPasajePasado ? "text-red-700" : "text-gray-900"
                }`}
              >
                Pasaje {index + 1}
              </h3>
              <div className="flex items-center justify-center gap-2">
                <PDFDownloadLink
                  document={<PasajePDF pasaje={pasaje} />}
                  fileName={`pasaje_${pasaje.idpasaje}.pdf`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Cargando documento..." : "Descargar Ticket"
                  }
                </PDFDownloadLink>
              </div>
            </div>
            <p className={`${esPasajePasado ? "text-red-700" : ""}`}>
              <strong>Clase:</strong> {pasaje.idclase}
            </p>
            <p className={`${esPasajePasado ? "text-red-700" : ""}`}>
              <strong>Fecha:</strong> {pasaje.fecha}
            </p>
            <p className={`${esPasajePasado ? "text-red-700" : ""}`}>
              <strong>Precio:</strong> ${pasaje.precio}
            </p>
            <p className={`${esPasajePasado ? "text-red-700" : ""}`}>
              <strong>Origen:</strong> {pasaje.rutum.idorigen} -{" "}
              <strong>Destino:</strong> {pasaje.rutum.iddestino}
            </p>
            <p className={`${esPasajePasado ? "text-red-700" : ""}`}>
              <strong>Salida:</strong> {pasaje.rutum.horariosalida}{" "}
              <strong>Duración:</strong> {pasaje.rutum.duracion} horas
            </p>
            <p className={`${esPasajePasado ? "text-red-700" : ""}`}>
              <strong>Avión:</strong> {pasaje.rutum.avion.nombre}
            </p>
            <p className={`${esPasajePasado ? "text-red-700" : ""}`}>
              <strong>Maletas:</strong> {contarEquipajes(pasaje.idpasaje)}
            </p>

            <p className={`${esPasajePasado ? "text-red-700" : ""}`}>
              <strong>Cliente:</strong> {pasaje.cliente.nombre}{" "}
              {pasaje.cliente.apellido}
            </p>
            <div className="mt-1">
              <select
                value={menuSeleccionados[pasaje.idpasaje] || pasaje.id_menu}
                onChange={(e) =>
                  handleMenuChange(pasaje.idpasaje, e.target.value)
                }
                className="border border-gray-300 rounded py-2 px-4 mb-4"
              >
                {menues.map((menu) => (
                  <option key={menu.id_menu} value={menu.id_menu}>
                    {menu.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ReservaDetalle
