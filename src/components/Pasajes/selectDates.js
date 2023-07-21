import React from "react"

const SelectDate = ({ filteredDates, setSelectedDate }) => {
  return (
    <select
      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      onChange={(e) => setSelectedDate(e.target.value)}
    >
      <option value="">Seleccionar fecha</option>
      {filteredDates.map((date) => (
        <option key={date.fecha} value={date.fecha}>
          {date.fecha} - {date.dia}
        </option>
      ))}
    </select>
  )
}

export default SelectDate

