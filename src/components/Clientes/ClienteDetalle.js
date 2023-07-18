import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import clientesService from "../../services/clientesService"
import { cargarSingleCliente } from "../../reducers/clienteReducer"

const ClienteDetalle = () => {
  const { id } = useParams()
  const clientes = useSelector((state) => state.clientes.clientes)
  const clienteCargado = useSelector((state) => state.clientes.clienteCargado)
  console.log(clienteCargado)

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

  useEffect(() => {
    // Primero verificamos si el cliente está cargado en el estado de Redux
    const clienteExistente = clientes.find(
      (cliente) => cliente.idcliente === Number(id)
    )
  
    if (!clienteExistente) {
      // Si el cliente no se encuentra en el estado de Redux, lo buscamos desde el backend
   
      obtenerClientePorIdDesdeBackend(id)
    } else {
      // Si el cliente está en el estado de Redux, lo guardamos en la propiedad clienteCargado
      console.log(clienteExistente)
      dispatch(cargarSingleCliente(clienteExistente))
    }
  })

  const obtenerClientePorIdDesdeBackend = async (id) => {
    try {
      const cliente = await clientesService.getClienteById(id)
      // Enviamos el cliente al estado de Redux en la propiedad clienteCargado
      dispatch(cargarSingleCliente(cliente))
    } catch (error) {
      console.error("Error al obtener el cliente desde el backend:", error)
    }
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
            <h2 className="text-2xl font-bold">Pasajes Asociados</h2>
            <ul>
              {clienteCargado.pasajes.map((pasaje) => (
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
                    <div className="font-semibold">Fecha de Ida:</div>
                    <div>{pasaje.fechaida}</div>
                  </div>
                  <div className="flex gap-1">
                    <div className="font-semibold">Fecha de Vuelta:</div>
                    <div> {pasaje.fechavuelta}</div>
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
