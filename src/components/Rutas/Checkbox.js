import React from "react"

const Checkbox = ({ name, label, checked, onChange }) => {
  return (
    <div>
      <label htmlFor={name} className="inline-flex items-center">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          className="form-checkbox h-5 w-5 text-blue-500"
        />
        <span className="ml-2">{label}</span>
      </label>
    </div>
  )
}

export default Checkbox
