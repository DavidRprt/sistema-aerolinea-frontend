import avionesService from "../../services/avionesService"
import { eliminarAvion } from "../../reducers/avionReducer"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RiDeleteBin5Line } from "react-icons/ri"

const AvionesLista = () => {

    
  const dispatch = useDispatch()
  const aviones = useSelector((state) => state.aviones)

  const confirmarEliminacion =  async (idAvion) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      await avionesService.deleteAvion(idAvion)
      dispatch(eliminarAvion(idAvion))
    }
  }


  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Año</th>
            <th className="py-2 px-4 border-b">Turista</th>
            <th className="py-2 px-4 border-b">Premium</th>
            <th className="py-2 px-4 border-b">Business</th>
            <th className="py-2 px-4 border-b">Modelo</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {aviones.map((avion) => (
            <tr key={avion.idavion}>
              <td className="py-2 px-4 border-b text-center">{avion.nombre}</td>
              <td className="py-2 px-4 border-b text-center">{avion.año}</td>
              <td className="py-2 px-4 border-b text-center">
                {avion.capacidadturista}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {avion.capacidadpremium}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {avion.capacidadbusiness}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {avion.modeloavion.modelo}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => confirmarEliminacion(avion.idavion)}
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

export default AvionesLista
