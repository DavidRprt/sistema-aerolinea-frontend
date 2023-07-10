import React, { useState } from "react"
import Checkbox from "./Checkbox"

const RutasForm = () => {
  const [ruta, setRuta] = useState({
    idOrigen: "",
    idDestino: "",
    precioBase: "",
    horarioSalida: "",
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === "checkbox" ? checked : value

    setRuta((prevRuta) => ({
      ...prevRuta,
      [name]: newValue,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Lógica para enviar el objeto `ruta` mediante una solicitud POST
    console.log(ruta)
    // Resetear el formulario
    setRuta({
      idOrigen: "",
      idDestino: "",
      precioBase: "",
      horarioSalida: "",
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
      domingo: false,
    })
  }

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border border-gray-300 rounded"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* ...otros campos del formulario */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Días de la semana
            </label>
            <div className="grid grid-cols-7 gap-4">
              <Checkbox
                name="lunes"
                label="Lunes"
                checked={ruta.lunes}
                onChange={handleChange}
              />
              <Checkbox
                name="martes"
                label="Martes"
                checked={ruta.martes}
                onChange={handleChange}
              />
              <Checkbox
                name="miercoles"
                label="Miércoles"
                checked={ruta.miercoles}
                onChange={handleChange}
              />
              <Checkbox
                name="jueves"
                label="Jueves"
                checked={ruta.jueves}
                onChange={handleChange}
              />
              <Checkbox
                name="viernes"
                label="Viernes"
                checked={ruta.viernes}
                onChange={handleChange}
              />
              <Checkbox
                name="sabado"
                label="Sábado"
                checked={ruta.sabado}
                onChange={handleChange}
              />
              <Checkbox
                name="domingo"
                label="Domingo"
                checked={ruta.domingo}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  )
}

export default RutasForm
