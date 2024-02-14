import React, { useState, useRef } from "react"
import clientesService from "../../services/clientesService"

class Memento {
  constructor(state) {
    this.state = state
  }

  getState() {
    return this.state
  }
}

class Caretaker {
  constructor() {
    this.mementos = []
  }

  addMemento(memento) {
    this.mementos.push(memento)
  }

  getMemento(index) {
    return this.mementos[index]
  }
}

const AgregarCliente = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    pasaporte: "",
    email: "",
    telefono: "",
    millas: 0,
  })

  const caretaker = useRef(new Caretaker()).current

  const handleChange = (e) => {
    // Guardar el estado actual antes de actualizar
    caretaker.addMemento(new Memento(cliente))
    setCliente({ ...cliente, [e.target.name]: e.target.value })
  }

  const handleUndo = () => {
    // Restaurar al último estado guardado
    const memento = caretaker.getMemento(caretaker.mementos.length - 1)
    if (memento) {
      setCliente(memento.getState())
      caretaker.mementos.pop()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Verificar si el campo de telefono está vacío y establecer el valor en null si es así
    const telefono = cliente.telefono.trim() === "" ? null : cliente.telefono

    // Crear un nuevo objeto de cliente con el valor actualizado del telefono
    const nuevoCliente = {
      ...cliente,
      telefono,
    }

    // Enviar el cliente al servicio
    clientesService.postCliente(nuevoCliente)

    // Limpiar el formulario borrando los datos
    setCliente({
      nombre: "",
      apellido: "",
      pasaporte: "",
      email: "",
      telefono: "",
      millas: 0,
    })
  }

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 border border-gray-300 rounded"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={cliente.nombre}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="apellido"
            >
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              value={cliente.apellido}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pasaporte"
            >
              Pasaporte
            </label>
            <input
              type="text"
              name="pasaporte"
              value={cliente.pasaporte}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={cliente.email}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="telefono"
            >
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={cliente.telefono}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button" // Tipo 'button' para no enviar el formulario
            onClick={handleUndo} // Función para deshacer cambios
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Deshacer Cambio
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Registrar Cliente
          </button>
        </div>
      </form>
    </div>
  )
}

export default AgregarCliente
