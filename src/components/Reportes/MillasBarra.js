import { ResponsiveBar } from "@nivo/bar"
import React from "react"

const MillasBarra = ({barData}) => {
 
  return (
    <ResponsiveBar
      data={barData}
      keys={["millas"]}
      indexBy="cliente"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      layout="vertical"
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
        legend: "Cliente",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Millas",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      label={(d) => `${barData[d.index].millasPromedioPorVuelo} avg`}
    />
  )
}

export default MillasBarra