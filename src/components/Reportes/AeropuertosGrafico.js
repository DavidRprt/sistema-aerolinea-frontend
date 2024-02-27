import React, { useState, useEffect } from "react"
import aeropuertoService from "../../services/aeropuertosService"
import { ResponsiveBar } from "@nivo/bar"
import { PDFDownloadLink } from "@react-pdf/renderer"
import ReporteAeropuertosPDF from "./PDF"
const AeropuertosGrafico = () => {
  const [datosAeropuertos, setDatosAeropuertos] = useState([])
  console.log(datosAeropuertos)

  useEffect(() => {
    const fetchDatosAeropuertos = async () => {
      try {
        const data = await aeropuertoService.getAeropuertosConMasRutas()
        setDatosAeropuertos(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDatosAeropuertos()
  }, [])

  const convertToCSV = (data) => {
    const headers = "Ciudad, Código del Aeropuerto, Total de Rutas\n"
    const rows = data
      .map(
        (aeropuerto) =>
          `${aeropuerto.ciudad},${aeropuerto.idaeropuerto},${aeropuerto.totalrutas}`
      )
      .join("\n")

    return headers + rows
  }

  const downloadCSV = () => {
    const csvData = convertToCSV(datosAeropuertos)
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "aeropuertos_con_mas_rutas.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div style={{ height: "500px" }}>
      <div className="flex justify-between items-center mb-4">
        <h2>Ciudades con Mayor Número de Rutas</h2>
        <div className="flex gap-2">
          <button
            onClick={downloadCSV}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Descargar CSV
          </button>
          <PDFDownloadLink
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            document={<ReporteAeropuertosPDF datos={datosAeropuertos} />}
            fileName="reporte_aeropuertos.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Cargando documento..." : "Descargar PDF"
            }
          </PDFDownloadLink>
        </div>
      </div>

      <ResponsiveBar
        data={datosAeropuertos}
        keys={["totalrutas"]}
        indexBy="ciudad"
        margin={{ top: 50, right: 130, bottom: 120, left: 60 }}
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
          tickRotation: -30,
          legend: "Ciudad",
          legendPosition: "middle",
          legendOffset: 60,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Total de Rutas",
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
  )
}

export default AeropuertosGrafico
