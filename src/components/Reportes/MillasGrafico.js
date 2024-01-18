import clientesService from "../../services/clientesService"
import React, { useEffect, useState } from "react"
import MillasBarra from "./MillasBarra"
import Button from "@mui/material/Button"

const MillasGrafico = () => {
 const [topClientes, setTopClientes] = useState([])

 useEffect(() => {
   const cargarTopClientes = async () => {
     const clientes = await clientesService.getTopClientes()
     setTopClientes(clientes)
   }

   cargarTopClientes()
 }, [])

 const barData = topClientes.map((cliente) => ({
   cliente: `${cliente.nombre} ${cliente.apellido}`,
   millas: cliente.millas,
   millasPromedioPorVuelo: cliente.millasPromedioPorVuelo.toFixed(2),
 }))

 const convertToCSV = (data) => {
   const headers = "Cliente,Millas,Millas Promedio Por Vuelo\n"
   const rows = data
     .map(
       (cliente) =>
         `${cliente.cliente},${cliente.millas},${cliente.millasPromedioPorVuelo}`
     )
     .join("\n")
   return headers + rows
 }

 const downloadCSV = (data) => {
   const csvData = convertToCSV(data)
   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" })
   const url = URL.createObjectURL(blob)
   const link = document.createElement("a")
   link.setAttribute("href", url)
   link.setAttribute("download", "topClientes.csv")
   document.body.appendChild(link)
   link.click()
   document.body.removeChild(link)
 }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "500px",
      }}
    >
      <MillasBarra barData={barData} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => downloadCSV(barData)}
        style={{ marginTop: "20px" }}
      >
        Descargar CSV
      </Button>
    </div>
  )
}

export default MillasGrafico
