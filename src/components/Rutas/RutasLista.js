import rutasService from "../../services/rutasService"
import { RiDeleteBin5Line } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { eliminarRuta } from "../../reducers/rutaReducer"

const RutasLista = () => {

  const dispatch = useDispatch()
  const rutas = useSelector((state) => state.rutas)
 
  const confirmarEliminacion = async (idRuta) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esto?")
    if (confirmacion) {
      await rutasService.deleteRuta(idRuta)
      dispatch(eliminarRuta(idRuta))
    }
  }


  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID Ruta</th>
            <th className="py-2 px-4 border-b">Origen</th>
            <th className="py-2 px-4 border-b">Destino</th>
            <th className="py-2 px-4 border-b">Precio Base</th>
            <th className="py-2 px-4 border-b">Horario de Salida</th>
            <th className="py-2 px-4 border-b">Días de Operación</th>
            <th className="py-2 px-4 border-b">Duración</th>
            <th className="py-2 px-4 border-b">Avión</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {rutas.map((ruta) => (
            <tr key={ruta.idruta}>
              <td className="py-2 px-4 border-b text-center">{ruta.idruta}</td>
              <td className="py-2 px-4 border-b text-center">
                {ruta.idorigen}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {ruta.iddestino}
              </td>
              <td className="py-2 px-4 border-b text-center">
                ${ruta.preciobase}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {ruta.horariosalida}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {ruta.lunes && "Lunes "}
                {ruta.martes && "Martes "}
                {ruta.miercoles && "Miércoles "}
                {ruta.jueves && "Jueves "}
                {ruta.viernes && "Viernes "}
                {ruta.sabado && "Sábado "}
                {ruta.domingo && "Domingo "}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {ruta.duracion} horas
              </td>
              <td className="py-2 px-4 border-b text-center">
                {ruta.avion.nombre}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => confirmarEliminacion(ruta.idruta)}
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

export default RutasLista
