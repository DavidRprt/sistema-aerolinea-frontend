import React, { useState, useEffect } from "react"
import { ResponsiveBar } from "@nivo/bar"
import authService from "../../services/authService"

const LoginReporte = () => {
  const [data, setData] = useState([])
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const logs = await authService.getAllLogs()
      setLogs(logs)
      // Filtrar por 'Inicio sesion' y contar por usuario
      const countByUser = logs
        .filter((log) => log.tipo_log.nombre === "Inicio sesion")
        .reduce((acc, curr) => {
          const key = curr.empleado.email // o nombre y apellido según prefieras
          if (!acc[key]) {
            acc[key] = 0
          }
          acc[key] += 1
          return acc
        }, {})

      // Transformar a formato aceptado por Nivo
      const formattedData = Object.keys(countByUser).map((key) => ({
        usuario: key,
        IniciosDeSesion: countByUser[key],
      }))

      setData(formattedData)
    }

    fetchData()
  }, [])

  console.log(data)

  const downloadCSV = (logs) => {
    const formattedLogs = logs.map((log) => ({
      nombre: log.empleado.nombre,
      apellido: log.empleado.apellido,
      email: log.empleado.email,
      tipo: log.tipo_log.nombre,
      fecha: new Date(log.creado_en).toLocaleDateString("es-ES"),
    }))

    let csvContent = "data:text/csv;charset=utf-8,"
    csvContent += "Nombre,Apellido,Email,Tipo,Fecha\n" // Encabezados
    formattedLogs.forEach((log) => {
      const row = `${log.nombre},${log.apellido},${log.email},${log.tipo},${log.fecha}\n`
      csvContent += row
    })

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "reporte_logs.csv")
    document.body.appendChild(link)
    link.click()
  }

  return (
    <div style={{ height: "500px" }}>
      <div className="flex justify-between items-center mb-4">
        <h2>Empleados con mas inicios de sesión</h2>
        <div className="flex gap-2">
          <button
            onClick={() => downloadCSV(logs)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Descargar CSV
          </button>
        </div>
      </div>
      <div className="h-[400px]">
        <ResponsiveBar
          data={data}
          keys={["IniciosDeSesion"]}
          indexBy="usuario"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Usuario",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Inicios de Sesión",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  )
}

export default LoginReporte
