import React, { useState } from "react"
import avionesService from "../../services/avionesService"
import { agregarAviones } from "../../reducers/avionReducer"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import ModeloAvionSelect from "./ModeloSelect"

const AvionForm = () => {

  const modelos = useSelector((state) => state.modelos)

  const dispatch = useDispatch()
  const [avion, setAvion] = useState({
    nombre: "",
    año: "",
    capacidadturista: "",
    capacidadpremium: "",
    capacidadbusiness: "",
    idmodelo: "",
  })

  const handleChange = (e) => {
    setAvion({ ...avion, [e.target.name]: e.target.value })
  }

   const handleModeloChange = (modeloId) => {
     setAvion({ ...avion, idmodelo: modeloId })
   }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const newAvion = await avionesService.postAvion(avion)
   
       const modeloAvion = modelos.find(
         (modelo) => modelo.idmodelo == avion.idmodelo
       )

      
       const avionConModelo = {
         ...newAvion,
         modeloavion: { modelo: modeloAvion.modelo },
       } 
      dispatch(agregarAviones(avionConModelo))
      console.log("Avion creado exitosamente")

      setAvion({
      nombre: "",
      año: "",
      capacidadturista: "",
      capacidadpremium: "",
      capacidadbusiness: "",
      idmodelo: "",
    })
    } catch (error) {
      console.error("Error al agregar el avion:", error)
      window.alert("Ocurrió un error al agregar el avion")
    }
  }

  

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border border-gray-300 rounded"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={avion.nombre}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="año"
            >
              Año
            </label>
            <input
              type="text"
              name="año"
              value={avion.año}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="capacidadturista"
            >
              Capacidad Turista
            </label>
            <input
              type="text"
              name="capacidadturista"
              value={avion.capacidadturista}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="capacidadpremium"
            >
              Capacidad Premium
            </label>
            <input
              type="text"
              name="capacidadpremium"
              value={avion.capacidadpremium}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="capacidadbusiness"
            >
              Capacidad Business
            </label>
            <input
              type="text"
              name="capacidadbusiness"
              value={avion.capacidadbusiness}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="idmodelo"
            >
              ID Modelo
            </label>
            <ModeloAvionSelect
              value={avion.idmodelo}
              onChange={handleModeloChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-end mt-4">
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

export default AvionForm
