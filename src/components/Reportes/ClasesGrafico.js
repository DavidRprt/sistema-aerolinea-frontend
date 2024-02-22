import React, { useState, useEffect } from "react"
import pasajesService from "../../services/pasajesService"
import { ResponsiveBar } from "@nivo/bar"

const ClasesGrafico = () => {
  const [datosClases, setDatosClases] = useState([])

  useEffect(() => {
    const fetchDatosClases = async () => {
      try {
        const data = await pasajesService.getFrecuenciaPorClase()
        setDatosClases(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDatosClases()
  }, [])

  const convertToCSV = (data) => {
    const headers = "Clase,Cantidad de Pasajes,Precio Promedio\n"

    const rows = data
      .map(
        (item) => `${item.clase},${item.cantidadPasajes},${item.precioPromedio}`
      )
      .join("\n")

    return headers + rows
  }

  const downloadCSV = () => {
    const csvData = convertToCSV(datosClases)
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "frecuencia_clases.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div style={{ height: "400px" }}>
      <div className="flex justify-between items-center">
        <h2>Frecuencia de Viajes por Clase</h2>
        <button
          onClick={downloadCSV}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Descargar CSV
        </button>
      </div>

      <ResponsiveBar
        data={datosClases}
        keys={["cantidadPasajes", "precioPromedio"]}
        indexBy="clase"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Clase",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Cantidad",
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

export default ClasesGrafico
