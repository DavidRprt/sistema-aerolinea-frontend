import React from "react"
import countries from "countries-list"

const paisSelect = ({ name, value, onChange, className, required }) => {
  const countryList = Object.entries(countries.countries).map(
    ([code, country]) => ({
      code,
      name: country.name,
    })
  )

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      required={required}
    >
      <option value="">Seleccione un país</option>
      {countryList.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  )
}

export default paisSelect
