import React, { useState, useEffect } from "react"
import authService from "../../services/authService"
import { useNavigate } from "react-router-dom"

const AdminPanel = () => {
  const [empleados, setEmpleados] = useState([])
  const [empleos, setEmpleos] = useState([])
  const [empleadosModificados, setEmpleadosModificados] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const cargarEmpleados = async () => {
      try {
        const dataEmpleados = await authService.getAllEmployees()
        setEmpleados(dataEmpleados)
      } catch (error) {
        console.error("Error al cargar los empleados:", error)
      }
    }

    const cargarEmpleos = async () => {
      try {
        const dataEmpleos = await authService.getAllJobs()
        setEmpleos(dataEmpleos)
      } catch (error) {
        console.error("Error al cargar los empleos:", error)
      }
    }

    cargarEmpleados()
    cargarEmpleos()
  }, [])

  const handleEmpleoChange = (idEmpleado, nuevoIdEmpleo) => {
    setEmpleadosModificados((prev) => ({
      ...prev,
      [idEmpleado]: nuevoIdEmpleo,
    }))
  }

  const handleGuardar = async () => {
    const empleadosParaGuardar = Object.keys(empleadosModificados)
      .filter(
        (id) =>
          empleadosModificados[id] !==
          empleados.find((e) => e.idempleado === parseInt(id)).idempleo
      )
      .map((id) => ({
        idempleado: parseInt(id),
        idempleo: empleadosModificados[id],
      }))

    try {
      for (const empleado of empleadosParaGuardar) {
        await authService.updateEmployeeJob(
          empleado.idempleado,
          empleado.idempleo
        )
      }
      console.log("Todos los empleos han sido actualizados")
      navigate("/")
    } catch (error) {
      console.error("Error al actualizar empleos:", error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800 my-4 text-center">
          Lista de Empleados
        </h2>
        <button
          onClick={handleGuardar}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Guardar Cambios
        </button>
      </div>

      <ul style={{ listStyleType: "none" }}>
        {empleados.map((empleado) => (
          <li
            key={empleado.idempleado}
            style={{ padding: "10px", borderBottom: "1px solid #ccc" }}
          >
            <strong>ID:</strong> {empleado.idempleado} <br />
            <strong>Nombre:</strong> {empleado.nombre} <br />
            <strong>Apellido:</strong> {empleado.apellido} <br />
            <strong>Email:</strong> {empleado.email} <br />
            <div className="flex justify-center items-center gap-1">
              <strong>Empleo:</strong>
              <select
                defaultValue={empleado.idempleo}
                onChange={(e) =>
                  handleEmpleoChange(empleado.idempleado, e.target.value)
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {empleos.map((empleo) => (
                  <option key={empleo.idempleo} value={empleo.idempleo}>
                    {empleo.nombre}
                  </option>
                ))}
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminPanel
