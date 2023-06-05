import React from "react"
import MilesStatus from "./MilesStatus"

const ClientInfo = ({ user }) => {

   const handleCancel = (reservationCode) => {
     const confirmCancel = window.confirm(
       "¿Estás seguro de que quieres cancelar la reserva?"
     )
     if (confirmCancel) {
       // Aquí puedes agregar el código para cancelar la reserva en tu sistema
       console.log(`La reserva ${reservationCode} ha sido cancelada.`)
     }
   }

  // Cliente ficticio
  const client = {
    firstName: "Micaela",
    lastName: "Soto",
    clientId: "123456",
    miles: 1500,
    status: "Gold",
    reservations: [
      {
        origin: "Buenos Aires",
        destination: "New York",
        date: "15/06/2023",
        reservationCode: "XYZ123",
      },
      {
        origin: "Cordoba",
        destination: "Santiago",
        date: "25/06/2023",
        reservationCode: "ABC456",
      },
    ],
  }

  // Mostrar tabla si usuario existe
  return user !== "" ? (
    <div className="mx-4 w-auto bg-white rounded-xl shadow-md overflow-hidden md:w-auto m-3 px-10 py-6 flex justify-between">
      <div className="flex flex-col">
        <h4 className="text-xl font-medium">Información del cliente</h4>
        <div className="flex flex-col">
          <div className="flex gap-1">
            <p className="font-bold">Nombre:</p> {client.firstName}
          </div>
          <div className="flex gap-1">
            <p className="font-bold">Apellido:</p> {client.lastName}
          </div>
          <div className="flex gap-1">
            <p className="font-bold">Codigo de cliente:</p> {client.clientId}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h4 className="text-xl font-medium">Millas y status</h4>
        <div className="flex gap-1">
          <p className="font-bold">Millas:</p> {client.miles}
        </div>
        <MilesStatus miles={client.miles} />
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl font-medium">Reservas</h3>
        {client.reservations.map((reservation, index) => (
          <div key={index} className="flex justify-between">
            <p>
              Origen: {reservation.origin} - Destino: {reservation.destination}
              <br />
              Fecha: {reservation.date} - Código: {reservation.reservationCode}
            </p>
            <button
              onClick={() => handleCancel(reservation.reservationCode)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mx-2 my-2"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  ) : null
}

export default ClientInfo
