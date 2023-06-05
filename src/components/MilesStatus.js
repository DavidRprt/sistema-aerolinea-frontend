import React from "react"
import { GrDiamond } from "react-icons/gr"
import { AiFillGold } from "react-icons/ai"
import { FaRegPaperPlane } from "react-icons/fa"

const MileageStatus = ({ miles }) => {
  const radius = 50
  const strokeWidth = 10
  const normalizedRadius = radius - strokeWidth * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (miles / 10000) * circumference

  let color
  if (miles < 1000) {
    color = "blue"
  } else if (miles < 3000) {
    color = "gold"
  } else {
    color = "silver"
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#ddd"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {miles < 1000 && <FaRegPaperPlane size={radius / 2} />}
        {miles >= 1000 && miles < 3000 && <AiFillGold size={radius / 2} />}
        {miles >= 3000 && <GrDiamond size={radius / 2} />}
      </div>
    </div>
  )
}

export default MileageStatus
