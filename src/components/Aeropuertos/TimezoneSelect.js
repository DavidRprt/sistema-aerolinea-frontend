import React from "react"
import moment from "moment-timezone"

const TimezoneSelect = ({ name, value, onChange, className, required }) => {
  const timezones = moment.tz.names()

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      required={required}
    >
      {timezones.map((timezone) => (
        <option key={timezone} value={timezone}>
          {timezone}
        </option>
      ))}
    </select>
  )
}

export default TimezoneSelect
