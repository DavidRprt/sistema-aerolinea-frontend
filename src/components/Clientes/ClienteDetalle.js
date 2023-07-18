import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import clientesService from "../../services/clientesService"
import { cargarSingleCliente } from "../../reducers/clienteReducer"

const ClienteDetalle = () => {
  const { id } = useParams()
  const clientes = useSelector((state) => state.clientes.clientes)
  const clienteCargado = useSelector((state) => state.clientes.clienteCargado)

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

  const [pasajes, setPasajes] = useState([
    {
      id: 1,
      origen: "Ciudad A",
      destino: "Ciudad B",
      fechaIda: "2023-07-20",
      fechaVuelta: "2023-07-25",
    },
    {
      id: 2,
      origen: "Ciudad B",
      destino: "Ciudad C",
      fechaIda: "2023-08-10",
      fechaVuelta: "2023-08-15",
    },
    {
      id: 3,
      origen: "Ciudad C",
      destino: "Ciudad D",
      fechaIda: "2023-09-05",
      fechaVuelta: "2023-09-10",
    },
  ])

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
              {pasajes.map((pasaje) => (
                <li key={pasaje.id} className="my-2">
                  <span className="font-semibold">Origen:</span> {pasaje.origen}
                  , <span className="font-semibold">Destino:</span>{" "}
                  {pasaje.destino}
                  <br />
                  <span className="font-semibold">Fecha de Ida:</span>{" "}
                  {pasaje.fechaIda},{" "}
                  <span className="font-semibold">Fecha de Vuelta:</span>{" "}
                  {pasaje.fechaVuelta}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>No se han encontrado clientes.</p>
      )}
    </div>
  )
}

export default ClienteDetalle
