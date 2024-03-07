import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import DiasSemanaSelect from "./DiaSemanaSelect"
import AvionSelect from "./AvionSelect"
import { useSelector } from "react-redux"
import rutasService from "../../services/rutasService"
import { agregarRuta } from "../../reducers/rutaReducer"
import tripulacionService from "../../services/tripulacionService"
import CodigoAeropuertoSelect from "./CodigoAeropuertoSelect"

const AgregarRuta = () => {
  const dispatch = useDispatch()
  const aviones = useSelector((state) => state.aviones)
  const [tripulaciones, setTripulaciones] = useState([])
  const [ruta, setRuta] = useState({
    idorigen: "",
    iddestino: "",
    idavion: "",
    preciobase: "",
    idtripulacion: "",
    horariosalida: "",
    duracion: "",
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false,
  })

  useEffect(() => {
    const fetchCargos = async () => {
      try {
        const data = await tripulacionService.getAllTripulaciones()
        setTripulaciones(data)
      } catch (error) {
        console.error("Error al obtener los cargos:", error)
      }
    }

    fetchCargos()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === "checkbox" ? checked : value

    setRuta({ ...ruta, [name]: newValue })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Encuentra los detalles de la tripulación seleccionada
    const tripulacionSeleccionada = tripulaciones.find(
      (t) => t.idtripulacion === parseInt(ruta.idtripulacion)
    )

    

    // Si no se encuentra la tripulación o no se ha seleccionado, mostrar advertencia y detener la operación
    if (!tripulacionSeleccionada) {
      window.alert("Por favor, seleccione una tripulación válida.")
      return
    }

    const { duracion_minima, duracion_maxima } =
      tripulacionSeleccionada.esquema_tripulacion

    if (ruta.duracion < duracion_minima || ruta.duracion > duracion_maxima) {
      window.alert(
        `La duración del vuelo debe estar entre ${duracion_minima} y ${duracion_maxima} horas para el esquema de tripulación seleccionado.`
      )
      return 
    }

    try {
      const newRuta = await rutasService.postRuta(ruta)

      const avion = aviones.find((avion) => avion.idavion === ruta.idavion)

      const rutaConAvion = {
        ...newRuta,
        avion: { nombre: avion.nombre },
      }

      dispatch(agregarRuta(rutaConAvion))
      console.log("Ruta creada exitosamente")

      setRuta({
        idorigen: "",
        iddestino: "",
        idavion: "",
        preciobase: "",
        horariosalida: "",
        duracion: "",
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
        sabado: false,
        domingo: false,
      })
    } catch (error) {
      console.error("Error al crear la ruta:", error)
      window.alert("Ocurrió un error al crear la ruta")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border border-gray-300 rounded"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4 form-control">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="idorigen"
            >
              Origen
            </label>
            <CodigoAeropuertoSelect
              name="idorigen"
              value={ruta.idorigen}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="iddestino"
            >
              Destino
            </label>
            <CodigoAeropuertoSelect
              name="iddestino"
              value={ruta.iddestino}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="idavion"
            >
              Avión
            </label>
            <AvionSelect value={ruta.idavion} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="preciobase"
            >
              Precio Base
            </label>
            <input
              type="number"
              name="preciobase"
              value={ruta.preciobase}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="horariosalida"
            >
              Horario de Salida
            </label>
            <input
              type="time"
              name="horariosalida"
              value={ruta.horariosalida}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="idtripulacion"
            >
              Tripulación
            </label>
            <select
              name="idtripulacion"
              value={ruta.idtripulacion}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Seleccione una tripulación</option>
              {tripulaciones.map((tripulacion) => (
                <option
                  key={tripulacion.idtripulacion}
                  value={tripulacion.idtripulacion}
                >
                  {tripulacion.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="duracion"
            >
              Duración (en horas)
            </label>
            <input
              type="number"
              name="duracion"
              value={ruta.duracion}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <DiasSemanaSelect diasSeleccionados={ruta} onChange={handleChange} />
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

export default AgregarRuta
