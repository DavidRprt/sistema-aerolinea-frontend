import aeropuertosService from "../../services/aeropuertosService"
import { eliminarAeropuerto } from "../../reducers/aeropuertoReducer"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RiDeleteBin5Line } from "react-icons/ri"

const AeropuertosLista = () => {
  
  const dispatch = useDispatch()
  const aeropuertos = useSelector((state) => state.aeropuertos)

  const confirmarEliminacion =  async (idAeropuerto) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      await aeropuertosService.deleteAeropuerto(idAeropuerto)
      dispatch(eliminarAeropuerto(idAeropuerto))
    }
  }

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Código</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Ciudad</th>
            <th className="py-2 px-4 border-b">País</th>
            <th className="py-2 px-4 border-b">Latitud</th>
            <th className="py-2 px-4 border-b">Longitud</th>
            <th className="py-2 px-4 border-b">Zona Horaria</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {aeropuertos.map((objeto) => (
            <tr key={objeto.idaeropuerto}>
              <td className="py-2 px-4 border-b text-center">
                {objeto.idaeropuerto}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {objeto.nombre}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {objeto.ciudad}
              </td>
              <td className="py-2 px-4 border-b text-center">{objeto.pais}</td>
              <td className="py-2 px-4 border-b text-center">
                {objeto.latitud}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {objeto.longitud}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {objeto.timezone}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => confirmarEliminacion(objeto.idaeropuerto)}
                >
                  <RiDeleteBin5Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AeropuertosLista
